import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export class JwtService {
  private static instance: JwtService;

  private constructor() {}

  static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }

  async sign(payload: object): Promise<string> {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
  }

  async verify(token: string): Promise<object | null> {
    try {
      return jwt.verify(token, JWT_SECRET) as object;
    } catch (error) {
      return null;
    }
  }

  async decode(token: string): Promise<object | null> {
    try {
      return jwt.decode(token) as object;
    } catch (error) {
      return null;
    }
  }
}
