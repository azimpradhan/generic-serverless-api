import { hello } from '../../../src/api/hello/handler';

const MockEvent = require('./MockEvent.json');

let mockEvent;
const mockContext = {};

beforeEach(() => {
  mockEvent = Object.assign({}, MockEvent);
});

test('hello hander should return 400 status code when queryStringParameters are missing', (done) => {
  const callback = (ctx, data) => {
    expect(data.statusCode).toBe(400);
    expect(JSON.parse(data.body).message).toEqual(expect.stringContaining('Validation failed'));
    done();
  };
  hello(mockEvent, mockContext, callback);
});

test('hello hander should return 403 status code when password is incorrect', (done) => {
  mockEvent.queryStringParameters.password = 'wrongpassword';
  const callback = (ctx, data) => {
    expect(data.statusCode).toBe(403);
    expect(JSON.parse(data.body).message).toEqual(expect.stringContaining('Authentication failed'));
    done();
  };
  hello(mockEvent, mockContext, callback);
});

test('hello hander should return 200 status code when password is incorrect', (done) => {
  mockEvent.queryStringParameters.password = 'test123';
  const callback = (ctx, data) => {
    expect(data.statusCode).toBe(200);
    expect(JSON.parse(data.body).message).toEqual(expect.stringContaining('Go Serverless'));
    done();
  };
  hello(mockEvent, mockContext, callback);
});

test('hello hander should return 500 status code when queryStringParameters contains error', (done) => {
  mockEvent.queryStringParameters.password = 'test123';
  mockEvent.queryStringParameters.error = 'true';
  const callback = (ctx, data) => {
    expect(data.statusCode).toBe(500);
    expect(JSON.parse(data.body).message).toEqual(expect.stringContaining('The following internal error occured'));
    done();
  };
  hello(mockEvent, mockContext, callback);
});
