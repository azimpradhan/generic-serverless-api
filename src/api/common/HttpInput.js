import { Validator } from 'jsonschema';

const toLowerCase = (obj) => {
  const lowerCaseKeyObj = {};
  Object.keys(obj).forEach((key) => {
    lowerCaseKeyObj[key.toLowerCase()] = obj[key];
  });

  return lowerCaseKeyObj;
};

export class HttpInput {
  constructor(event, lowerLevelSchemas, validationSchema) {
    if (event && event.headers) {
      // eslint-disable-next-line no-param-reassign
      event.headers = toLowerCase(event.headers);
    }
    this.event = event;
    this.lowerLevelSchemas = lowerLevelSchemas;
    this.validationSchema = validationSchema;
  }

  validate() {
    const validator = new Validator();
    const { validationSchema, lowerLevelSchemas } = this;
    lowerLevelSchemas.forEach((lowerLevelSchema) => {
      validator.addSchema(lowerLevelSchema);
    });

    return validator.validate(this.event, validationSchema);
  }

  isValid() {
    if (!this.validationSchema) {
      return true;
    }

    return this.getValidationErrors().length === 0;
  }

  getValidationErrors() {
    const validationErrors = this.validate().errors;

    return validationErrors.map(error => ({
      property: error.property.replace(/instance\.?/, '') || null,
      error: error.message,
      value: error.instance,
    }));
  }

  getValidationErrorString() {
    const validationErrors = this.getValidationErrors();

    return `Validation failed with the following errors: ${validationErrors.map(e => ['Property', `'${e.property}'`, 'failed validation with error', `'${e.error}'`].join(' ')).join(',')}`;
  }
}
