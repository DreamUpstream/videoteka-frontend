/**
 * Some methods can rise this error to export some server side validation fails to UI
 */
export class ServerValidationError extends Error {
  #errors;

  constructor(errors) {
    super("Server validation error");

    this.#errors = errors;
  }

  get errors() {
    return this.#errors;
  }
}
