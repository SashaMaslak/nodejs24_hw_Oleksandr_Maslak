import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string; // Ідентифікатор користувача
        refreshToken: string; // Refresh token
        // Додайте інші властивості, які вам потрібні
      };
    }
  }
}
