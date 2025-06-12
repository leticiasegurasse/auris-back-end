import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../services/cache.service';
import { logger } from '../config/logger';

/**
 * Middleware para gerenciar o cache das requisições GET
 * @param duration Tempo de expiração do cache em segundos (padrão: 300 segundos)
 * @returns Middleware Express
 */
export const cacheMiddleware = (duration: number = 300) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Apenas cache para requisições GET
        if (req.method !== 'GET') {
            return next();
        }

        const cacheService = CacheService.getInstance();
        // Cria uma chave única baseada na URL da requisição
        const key = `__express__${req.originalUrl || req.url}`;

        try {
            // Tenta obter a resposta do cache
            const cachedResponse = await cacheService.get(key);
            
            // Se encontrou no cache, retorna a resposta cacheadada
            if (cachedResponse) {
                logger.info(`Cache HIT para a chave: ${key}`);
                return res.json(cachedResponse);
            }

            logger.info(`Cache MISS para a chave: ${key}`);

            // Se não encontrou no cache, intercepta a resposta original
            // para armazená-la no cache
            const originalJson = res.json;
            res.json = function(body: any) {
                // Armazena a resposta no cache com o tempo de expiração definido
                cacheService.set(key, body, duration);
                logger.info(`Cache SET para a chave: ${key} com duração de ${duration} segundos`);
                return originalJson.call(this, body);
            };

            next();
        } catch (error) {
            logger.error(`Erro no middleware de cache: ${error}`);
            next(error);
        }
    };
}; 