import express from 'express';
import { getAllUsers, login, signUp } from '#/controller/authController';
import ValidatorMiddleware from '#/middlewares/validationMiddleware';
import userValidatorSchema from '#/modules/users/validator';

const router = express.Router();
router.get('/login', (req, res)=>{
    res.send("Login page")
});
router.get('/all-users', getAllUsers)

router.post('/signUp', ValidatorMiddleware(userValidatorSchema.signUpSchema, 'body'),  signUp);
router.post('/login', ValidatorMiddleware(userValidatorSchema.loginSchema, 'body'), login);

export default router;
