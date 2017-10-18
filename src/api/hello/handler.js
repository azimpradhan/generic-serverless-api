import { OkResponse, InternalErrorResponse } from '../common/HttpResponse';

// const doAsyncTask = () => (new Promise(resolve => (setTimeout(resolve, 1000))));

const doAsyncTask = () => (
  new Promise((resolve) => {
    if (Math.random() > 0.5) {
      throw new Error('Some error');
    } else {
      setTimeout(resolve({ hello: 'world' }), 2000);
    }
  })
);

export const hello = (event, context, callback) => {
  // const input = new HelloInput(event);
  // if (!helloInput.isValid()) {
  //  response = new BadRequestResponse(input.getValidationErrors())
  // } else {
  // }
  // const response = new OkResponse({
  //   message: 'Go Serverless v1.0! Your function executed successfully!',
  //   input: event,
  // });
  doAsyncTask().then((asyncResponseData) => {
    const response = new OkResponse({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
      body: asyncResponseData,
    });
    callback(null, response);
  }).catch((error) => {
    const response = new InternalErrorResponse(error);
    callback(null, response);
  });
};
