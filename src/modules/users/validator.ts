import Joi from 'joi';
const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const stringPassswordError =
  'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length';

//Joi schema for request body validation
const userValidatorSchema = {

  signUpSchema: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 11 digits long',
      'any.required': 'Phone number is required',
    }), //specifies a pattern that matches a string with exactly 11 digits. You can
    password: Joi.string().min(8).regex(strongPasswordRegex).required().label('Password').messages({
      'string.min': 'Must have at least 8 characters',
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': stringPassswordError,
    }),
  }),

  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().label('Password').messages({
      'string.min': 'Must have at least 8 characters',
      'object.regex': 'Must have at least 8 characters',
      'string.pattern.base': stringPassswordError,
    }),
  }),
};

export default userValidatorSchema;