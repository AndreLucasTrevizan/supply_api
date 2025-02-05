import {
  Request,
  Response,
  NextFunction
} from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  id: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const has_token = req.headers['authorization'];

  if (!has_token) {
    res.status(401).json({
      status: 'token-not-found',
      message: 'Você não está autenticado'
    });
  } else {
    const token = has_token.split(' ')[1];

    verify(token, String(process.env.API_PASSWORD), (err, decoded) => {
      if (err) {
        res.status(400).json({
          status: 'not-authorized',
          message: 'Você não tem autorização'
        });
      }

      req.user = decoded as Payload;

      next();
    });
  }
}
