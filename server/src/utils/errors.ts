/* eslint-disable max-classes-per-file */
export class APIError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export class BadRequestError extends APIError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class AccessDeniedError extends APIError {
  constructor(message = 'Access denied') {
    super(401, message);
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = 'Unauthorized') {
    super(403, message);
  }
}

export class ForbiddenError extends APIError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class MethodNotAllowedError extends APIError {
  constructor(message = 'Method Not Allowed') {
    super(405, message);
  }
}

export class ConflictError extends APIError {
  constructor(message = 'Conflict') {
    super(408, message);
  }
}

export class UnSupportedMediaTypeError extends APIError {
  constructor(message = 'Unsupported Media Type') {
    super(415, message);
  }
}

export class UnProcessableEntityError extends APIError {
  constructor(message = 'Unprocessable Entity') {
    super(422, message);
  }
}

export class InternalServerError extends APIError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}
