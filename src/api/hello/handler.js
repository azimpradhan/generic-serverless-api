import { OkResponse, BadRequestResponse, InternalErrorResponse } from '../common/HttpResponse';
import { HttpInput } from '../common/HttpInput';

const RequestContextSchema = require('./schema/RequestContext.json');
const HelloInputSchema = require('./schema/HelloInput.json');
const QueryStringParametersSchema = require('./schema/QueryStringParameters.json');

const doAsyncTask = () => (
  new Promise((resolve) => {
    if (Math.random() > 0.5) {
      throw new Error('Randomly generated error');
    } else {
      setTimeout(resolve({ message: 'Go Serverless v1.0! Your function executed successfully!' }), 2000);
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
    doAsyncTask().then((data) => {
      const response = new OkResponse({
        body: data,
      });
      callback(null, response);
    }).catch((error) => {
      const response = new InternalErrorResponse(error);
      callback(null, response);
    });
  } else {
    const response = new BadRequestResponse(input.getValidationErrorString());
    callback(null, response);
  }
};
