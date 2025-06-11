// Importações necessárias para manipulação de JWT
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração das constantes para o JWT
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Classe responsável por gerenciar operações com JWT (JSON Web Tokens)
export class JwtService {
  // Instância única da classe (Singleton)
  private static instance: JwtService;

  // Construtor privado para garantir o padrão Singleton
  private constructor() {}

  // Método para obter a instância única da classe
  static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }

  // Método para assinar um token JWT com um payload
  async sign(payload: object): Promise<string> {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
  }

  // Método para verificar a validade de um token JWT
  // Retorna o payload se válido, null se inválido
  async verify(token: string): Promise<object | null> {
    try {
      return jwt.verify(token, JWT_SECRET) as object;
    } catch (error) {
      return null;
    }
  }

  // Método para decodificar um token JWT sem verificar a assinatura
  // Útil para extrair informações de tokens expirados
  async decode(token: string): Promise<object | null> {
    try {
      return jwt.decode(token) as object;
    } catch (error) {
      return null;
    }
  }
}
