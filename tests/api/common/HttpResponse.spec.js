import { OkResponse, NoContentResponse, BadRequestResponse, ForbiddenResponse, NotFoundResponse, InternalErrorResponse } from '../../../src/api/common/HttpResponse';

test('OkResponse creates response with statusCode: 200', () => {
  const response = new OkResponse({});
  expect(response.statusCode).toBe(200);
});

test('NoContentResponse creates response with statusCode: 204', () => {
  const response = new NoContentResponse();
  expect(response.statusCode).toBe(204);
});

test('BadRequestResponse creates response with statusCode: 400', () => {
  const response = new BadRequestResponse(new Error('bad request error'));
  expect(response.statusCode).toBe(400);
  expect(JSON.parse(response.body).message).toBe('Validation failed with the following error: Error: bad request error');
});

test('ForbiddenResponse creates response with statusCode: 403', () => {
  const response = new ForbiddenResponse(new Error('forbidden error'));
  expect(response.statusCode).toBe(403);
  expect(JSON.parse(response.body).message).toBe('Authentication failed with the following error: Error: forbidden error');
});

test('ForbiddenResponse creates response with statusCode: 403', () => {
  const response = new NotFoundResponse();
  expect(response.statusCode).toBe(404);
  expect(JSON.parse(response.body).message).toBe('The entity you are requesting does not exist');
});

test('ForbiddenResponse creates response with statusCode: 403', () => {
  const response = new InternalErrorResponse(new Error('internal error'));
  expect(response.statusCode).toBe(500);
  expect(JSON.parse(response.body).message).toBe('The following internal error occured Error: internal error');
});