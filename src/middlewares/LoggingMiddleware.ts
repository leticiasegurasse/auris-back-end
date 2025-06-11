/**
 * Middleware que registra automaticamente as ações realizadas no sistema
 * Intercepta as requisições e respostas para criar logs de auditoria
 */
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../services/LoggerService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Middleware factory que cria um middleware de logging para uma entidade específica
 * @param entity - Nome da entidade que será monitorada
 * @returns Middleware configurado para a entidade
 */
export const LoggingMiddleware = (entity: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('LoggingMiddleware - Iniciando');
    console.log('User data:', req.user);
    
    const originalSend = res.send;
    let responseBody: any;

    // Intercepta a resposta para capturar o corpo
    res.send = function (body) {
      try {
        responseBody = typeof body === 'string' ? JSON.parse(body) : body;
        console.log('Tipo do responseBody:', typeof responseBody);
        console.log('responseBody completo:', responseBody);
      } catch (error) {
        console.error('Erro ao processar response body:', error);
        responseBody = body;
      }
      return originalSend.call(this, body);
    };

    // Registra a ação quando a resposta é finalizada
    res.on('finish', async () => {
      try {
        console.log('LoggingMiddleware - Response finished');
        
        const userId = req.user?._id || req.user?.id || req.user?.userId;
        console.log('UserId encontrado:', userId);
        
        if (!userId) {
          console.log('Nenhum userId encontrado no request');
          return;
        }

        // Determina o tipo de ação baseado no método HTTP
        const action = req.method === 'POST' ? 'CREATE' :
                      req.method === 'PUT' || req.method === 'PATCH' ? 'UPDATE' :
                      req.method === 'DELETE' ? 'DELETE' : null;

        console.log('Action:', action);
        console.log('Response body no finish:', responseBody);

        if (action && responseBody) {
          let entityId;
          
          // Obtém o ID da entidade baseado no tipo de ação
          if (action === 'CREATE') {
            console.log('Tentando obter _id do responseBody');
            console.log('Keys do responseBody:', Object.keys(responseBody));
            entityId = responseBody._id;
            console.log('EntityId encontrado no CREATE:', entityId);
          } else {
            console.log('Tentando obter id dos parâmetros');
            entityId = req.params.id;
            console.log('EntityId encontrado nos parâmetros:', entityId);
          }
          
          if (!entityId) {
            console.log('EntityId não encontrado');
            console.log('responseBody completo:', JSON.stringify(responseBody, null, 2));
            return;
          }

          // Prepara as alterações para o log
          const changes = req.method === 'DELETE' ? { deleted: true } : req.body;

          console.log('Dados do log:', {
            action,
            entity,
            entityId,
            changes,
            userId
          });

          // Registra a ação no sistema
          await LoggerService.logAction(action, entity, entityId, changes, userId);
          console.log('Log salvo com sucesso');
        } else {
          console.log('Condições não atendidas para salvar o log');
          console.log('action:', action);
          console.log('responseBody:', responseBody);
        }
      } catch (error) {
        console.error('Erro no middleware de logging:', error);
      }
    });

    next();
  };
}; 