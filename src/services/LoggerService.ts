/**
 * Serviço que gerencia os logs do sistema
 * Responsável por registrar ações no MongoDB e no Winston Logger
 */
import winston from 'winston';
import { Log } from '../models/Log';

/**
 * Configuração do Winston Logger para registro de logs
 * Inclui formatação de timestamp e saída em console e arquivos
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

export class LoggerService {
  /**
   * Registra uma ação no sistema
   * @param action - Tipo da ação (CREATE, UPDATE, DELETE)
   * @param entity - Nome da entidade afetada
   * @param entityId - ID da entidade afetada
   * @param changes - Alterações realizadas
   * @param userId - ID do usuário que realizou a ação
   */
  static async logAction(action: 'CREATE' | 'UPDATE' | 'DELETE', entity: string, entityId: string, changes: any, userId: string) {
    try {
      // Criar log no MongoDB
      await Log.create({
        action,
        entity,
        entityId,
        changes,
        user: userId
      });

      // Registrar no Winston
      logger.info('Ação registrada', {
        action,
        entity,
        entityId,
        changes,
        userId
      });
    } catch (error) {
      logger.error('Erro ao registrar log', { error });
    }
  }

  /**
   * Busca logs do sistema com filtros opcionais
   * @param entity - Nome da entidade para filtrar (opcional)
   * @param action - Tipo da ação para filtrar (opcional)
   * @returns Lista de logs filtrados, ordenados por timestamp decrescente
   */
  static async getLogs(entity?: string, action?: 'CREATE' | 'UPDATE' | 'DELETE') {
    const query: any = {};
    
    if (entity) {
      query.entity = entity;
    }
    
    if (action) {
      query.action = action;
    }

    return Log.find(query)
      .sort({ timestamp: -1 })
      .populate('user', 'name email');
  }
} 