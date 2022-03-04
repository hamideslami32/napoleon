import { ApiError } from '../utils/apiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';
import Joi from 'joi';

export const validate = (schema) => (req, res, next) => {
  console.log(req.body);
  
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
