import winston from 'winston';

/**
 * Configuração do sistema de logging usando Winston
 * Este logger é utilizado para registrar eventos importantes do sistema,
 * incluindo operações de cache, erros e informações gerais
 */
export const logger = winston.createLogger({
    // Define o nível mínimo de log como 'info'
    level: 'info',
    
    // Configura o formato dos logs
    format: winston.format.combine(
        // Adiciona timestamp em cada log
        winston.format.timestamp(),
        // Formata os logs em JSON para melhor processamento
        winston.format.json()
    ),
    
    // Define os destinos dos logs
    transports: [
        // Arquivo específico para logs de erro
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error' 
        }),
        // Arquivo para todos os logs
        new winston.transports.File({ 
            filename: 'combined.log' 
        })
    ]
});

// Adiciona logs no console apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        // Formato simples para melhor legibilidade no console
        format: winston.format.simple()
    }));
} 