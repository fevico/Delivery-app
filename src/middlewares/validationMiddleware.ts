import { Request, Response, NextFunction } from 'express';
import  { Schema } from 'joi';


// Define a type for the keys of the Request object
type RequestKeys = keyof Request;

// Middleware function to validate request body
const ValidatorMiddleware = (schema: Schema, property: RequestKeys) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = 
        details && Array.isArray(details) ? details.map((i: any) => i.message).join(',') : details;
        return res.status(400).json({ error: message });
    }
  };
};


 export default ValidatorMiddleware;