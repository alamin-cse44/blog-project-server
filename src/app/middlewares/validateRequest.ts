import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      res.status(500).json({ 
        message: 'Invalid request payload',
        success: false,
        error: error
      })
    }
  };
};

export default validateRequest;
