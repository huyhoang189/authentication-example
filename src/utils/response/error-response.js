const { ReasonPhrases, StatusCodes } = require("../http-status-code");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

class MethodNotAllowedError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.METHOD_NOT_ALLOWED,
    statusCode = StatusCodes.METHOD_NOT_ALLOWED
  ) {
    super(message, statusCode);
  }
}

class TooManyEequestsError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.TOO_MANY_REQUESTS,
    statusCode = StatusCodes.TOO_MANY_REQUESTS
  ) {
    super(message, statusCode);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

class ServiceUnavaiableError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.SERVICE_UNAVAILABLE,
    statusCode = StatusCodes.SERVICE_UNAVAILABLE
  ) {
    super(message, statusCode);
  }
}
class ConflictError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.CONFLICT,
    statusCode = StatusCodes.CONFLICT
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ServiceUnavaiableError,
  InternalServerError,
  TooManyEequestsError,
  MethodNotAllowedError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadRequestError,
  ConflictError,
};
