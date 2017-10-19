export default class NotFoundError extends Error {
  constructor(...params) {
    super(...params);
    this.constructor = NotFoundError;
    // eslint-disable-next-line no-proto
    this.__proto__ = NotFoundError.prototype;
    this.name = 'NotFoundError';
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, NotFoundError);
  }
}
