import winston from 'winston';
import { Log } from '../models/Log';

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