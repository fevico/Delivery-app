import express from 'express';
import Joi from 'joi';
import validatorMiddleware from '#/middlewares/validationMiddleware';
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length';

//Joi schema for request body validation
const userValidatorSchema = Joi.object({


  signUp: Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{11}$/).required(), //specifies a pattern that matches a string with exactly 11 digits. You can
    password: Joi.string().min(8).regex(strongPasswordRegex).required().label('Password').messages({
      'string.min': 'Must have at least 8 characters',
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': stringPassswordError,
    }),
  }),

  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(strongPasswordRegex).required().label('Password').messages({
      'string.min': 'Must have at least 8 characters',
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': stringPassswordError,
    }),
  }),
});

export default userValidatorSchema;