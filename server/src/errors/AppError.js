class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflicto') {
    super(message, 409)
  }
}

class NotFoundError extends AppError {
  constructor(message = 'No encontrado') {
    super(message, 404)
  }
}

module.exports = { AppError, ConflictError, NotFoundError }