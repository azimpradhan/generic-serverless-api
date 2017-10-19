import { OkResponse, BadRequestResponse, InternalErrorResponse, ForbiddenResponse } from '../common/HttpResponse';
import { HttpInput } from '../common/HttpInput';
import ForbiddenError from '../common/errors/ForbiddenError';

const RequestContextSchema = require('./schema/RequestContext.json');
const HelloInputSchema = require('./schema/HelloInput.json');
const QueryStringParametersSchema = require('./schema/QueryStringParameters.json');

const doAsyncTask = (event) => (
  new Promise((resolve) => {
    if (event.queryStringParameters.error) {
      throw new Error('Internal Service error');
    } else if (event.queryStringParameters.password === 'test123') {
      setTimeout(resolve({ message: 'Go Serverless v1.0! Your function executed successfully!' }), 2000);
    } else {
      throw new ForbiddenError('Invalid password!');
    }
  })
);

export const hello = (event, context, callback) => {
  // For a full list of jsonschema validation rules see:
  // https://github.com/tdegrunt/jsonschema/blob/HEAD/examples/all.js
  const input = new HttpInput(
    event,
    [RequestContextSchema, QueryStringParametersSchema], // array of referenced schema definitions
    HelloInputSchema, // the final schema to validate against
  );

  if (input.isValid()) {
    doAsyncTask(event).then((data) => {
      const response = new OkResponse({
        body: data,
      });
      callback(null, response);
    }).catch((error) => {
      let response;
      if (error instanceof ForbiddenError) {
        response = new ForbiddenResponse(error);
      } else {
        response = new InternalErrorResponse(error);
      }
      callback(null, response);
    });
  } else {
    const response = new BadRequestResponse(input.getValidationErrorString());
    callback(null, response);
  }
};
