import { VercelRequest, VercelResponse } from '@vercel/node';
import app from './server'; // vamos criar esse `server.ts`

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
