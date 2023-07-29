import * as util from "util";

function HttpError(message, statusCode) {
  this.message = message;
  this.statusCode = statusCode;
  this.stack = new Error().stack;
}
util.inherits(Error, HttpError);

export { HttpError };
