import Redis from 'ioredis';
import { logger } from '../config/logger';

/**
 * Serviço de Cache utilizando Redis
 * Implementa o padrão Singleton para garantir uma única instância do Redis
 * e fornece métodos para gerenciar o cache da aplicação
 */
export class CacheService {
    private redis: Redis;
    private static instance: CacheService;
    private isConnected: boolean = false;
    private connectionPromise: Promise<void> | null = null;

    /**
     * Construtor privado para implementar o padrão Singleton
     * Inicializa a conexão com o Redis e configura os listeners de eventos
     */
    private constructor() {
        const redisConfig = {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD,
            tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
            retryStrategy: (times: number) => {
                if (times > 3) {
                    logger.error('Máximo de tentativas de reconexão atingido');
                    return null;
                }
                const delay = Math.min(times * 1000, 3000);
                return delay;
            },
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            connectTimeout: 10000,
            disconnectTimeout: 2000,
            commandTimeout: 5000,
            keepAlive: 10000,
            reconnectOnError: (err: Error) => {
                const targetError = 'READONLY';
                if (err.message.includes(targetError)) {
                    return true;
                }
                return false;
            }
        };

        logger.info('Iniciando conexão com Redis:', {
            host: redisConfig.host,
            port: redisConfig.port,
            tls: !!redisConfig.tls
        });

        this.redis = new Redis(redisConfig);

        // Listener para erros de conexão
        this.redis.on('error', (error) => {
            this.isConnected = false;
            logger.error('Erro na conexão com Redis:', error);
        });

        // Listener para conexão bem-sucedida
        this.redis.on('connect', () => {
            this.isConnected = true;
            logger.info('Conectado ao Redis com sucesso');
        });

        // Listener para desconexão
        this.redis.on('close', () => {
            this.isConnected = false;
            logger.warn('Conexão com Redis fechada');
        });

        // Listener para reconexão
        this.redis.on('reconnecting', () => {
            logger.info('Tentando reconectar ao Redis...');
        });

        // Inicializa a conexão
        this.connectionPromise = this.initializeConnection();
    }

    /**
     * Inicializa a conexão com o Redis
     */
    private async initializeConnection(): Promise<void> {
        try {
            await this.redis.ping();
            this.isConnected = true;
            logger.info('Conexão com Redis inicializada com sucesso');
        } catch (error) {
            this.isConnected = false;
            logger.error('Erro ao inicializar conexão com Redis:', error);
            throw error;
        }
    }

    /**
     * Aguarda a conexão estar pronta
     */
    private async waitForConnection(): Promise<void> {
        if (!this.connectionPromise) {
            this.connectionPromise = this.initializeConnection();
        }
        await this.connectionPromise;
    }

    /**
     * Método para obter a instância única do CacheService
     * @returns Instância do CacheService
     */
    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    /**
     * Armazena um valor no cache
     * @param key Chave para armazenar o valor
     * @param value Valor a ser armazenado
     * @param expirationTimeInSeconds Tempo de expiração em segundos (opcional)
     */
    async set(key: string, value: any, expirationTimeInSeconds?: number): Promise<void> {
        try {
            await this.waitForConnection();

            const stringValue = JSON.stringify(value);
            if (expirationTimeInSeconds) {
                await this.redis.setex(key, expirationTimeInSeconds, stringValue);
            } else {
                await this.redis.set(key, stringValue);
            }
        } catch (error) {
            logger.error(`Erro ao definir cache para chave ${key}:`, error);
            throw error;
        }
    }

    /**
     * Recupera um valor do cache
     * @param key Chave do valor a ser recuperado
     * @returns Valor armazenado ou null se não encontrado
     */
    async get<T>(key: string): Promise<T | null> {
        try {
            await this.waitForConnection();

            const value = await this.redis.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            logger.error(`Erro ao obter cache para chave ${key}:`, error);
            return null;
        }
    }

    /**
     * Remove um valor do cache
     * @param key Chave do valor a ser removido
     */
    async delete(key: string): Promise<void> {
        try {
            await this.waitForConnection();

            await this.redis.del(key);
        } catch (error) {
            logger.error(`Erro ao deletar cache para chave ${key}:`, error);
            throw error;
        }
    }

    /**
     * Limpa todo o cache
     */
    async clear(): Promise<void> {
        try {
            await this.waitForConnection();

            await this.redis.flushall();
        } catch (error) {
            logger.error('Erro ao limpar cache:', error);
            throw error;
        }
    }
} 