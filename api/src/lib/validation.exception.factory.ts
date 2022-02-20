import {plainToClass} from 'class-transformer';
import {ValidationError} from 'class-validator';
import {ValidationException, ValidationExceptionEntity} from 'src/core';

const parseException = (error: ValidationError, properties: string[] = []) => {
  // append property
  properties = properties.concat([error.property]);

  if (error.children.length > 0) {
    return error.children.map(c => parseException(c, properties)).flat();
  }

  // get first error constrain of an field
  const key = Object.keys(error.constraints)[0];
  const firstConstraint = error.constraints[key];

  try {
    // whether err massage is JSON object {code, payload} or raw string
    const plainBody = JSON.parse(firstConstraint);
    // err massage is {code, payload} object, transform to class object
    const result = plainToClass(ValidationExceptionEntity, plainBody);

    // return ValidationExceptionEntity with {code, payload?, fileName}
    return {...result, fieldName: properties.join('.')};
  } catch (e) {
    // err massage is raw string (throw from class-validator)
    return {value: firstConstraint, fieldName: properties.join('.')};
  }
};

export const ValidationExceptionFactory = (_errors: ValidationError[]) => {
  const errors = _errors.map(err => parseException(err)).flat();

  // return an ValidationException object
  return new ValidationException(errors);
};
