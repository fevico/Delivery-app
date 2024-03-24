import express from 'express';
import { forgotPassword, getAllUsers, login, resetPassword, signUp } from '#/controller/authController';
import ValidatorMiddleware from '#/middlewares/validationMiddleware';
import userValidatorSchema from '#/modules/users/validator';

const router = express.Router();
router.get('/login', (req, res)=>{
    res.send("Login page")
});
router.get('/all-users', getAllUsers)

router.post('/signUp', ValidatorMiddleware(userValidatorSchema.signUpSchema, 'body'),  signUp);
router.post('/login', ValidatorMiddleware(userValidatorSchema.loginSchema, 'body'), login);
router.post('/forgot-password', ValidatorMiddleware(userValidatorSchema.ForgotpasswordSchema, 'body'), forgotPassword )
router.post('/reset-password/:token', ValidatorMiddleware(userValidatorSchema.resetPasswordSchema, 'body'), resetPassword )

export default router;
