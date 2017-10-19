const defaultHeaders = {
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};

const createExpectedResponse = (response, statusCode) => ({
  statusCode,
  headers: defaultHeaders,
  body: JSON.stringify(response.body),
});

const createErrorResponse = (errorMessage, statusCode) => ({
  statusCode,
  headers: defaultHeaders,
  body: JSON.stringify({
    message: errorMessage,
  }),
});

export const OkResponse = body => createExpectedResponse(body, 200);

export const NoContentResponse = () => createExpectedResponse({}, 204);

export const BadRequestResponse = (error) => {
  const errorMessage = `Validation failed with the following error: ${error}`;

  return createErrorResponse(errorMessage, 400);
};

export const ForbiddenResponse = (error) => {
  const errorMessage = `Authentication failed with the following error: ${error}`;

  return createErrorResponse(errorMessage, 403);
};

export const NotFoundResponse = () => {
  const errorMessage = 'The entity you are requesting does not exist';

  return createErrorResponse(errorMessage, 404);
};

export const InternalErrorResponse = (error) => {
  const errorMessage = `The following internal error occured ${error}`;

  return createErrorResponse(errorMessage, 500);
};
