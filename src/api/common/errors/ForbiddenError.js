export default class ForbiddenError extends Error {
  constructor(...params) {
    super(...params);
    this.constructor = ForbiddenError;
    // eslint-disable-next-line no-proto
    this.__proto__ = ForbiddenError.prototype;
    this.name = 'ForbiddenError';
    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, ForbiddenError);
  }
}
