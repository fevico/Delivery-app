import jwt from 'jsonwebtoken';
import  { UserDocument } from '#/modules/users/schema';
const JWT_SECRET = "thesecretfornow";

export function generateResetToken(length: number): string {
    const passwordResetToken = Math.random().toString(36).substr(2, 10);
    return passwordResetToken;
  }

  
  export const generateAuthToken = (user: UserDocument) => {

    const token = jwt.sign({
       email: user.email, 
       userId: user._id, 
       role: user.role,  
       isAdmin: user.isAdmin }, 
       JWT_SECRET, 
       { expiresIn: '1h' });
  
    return token;
  };
  