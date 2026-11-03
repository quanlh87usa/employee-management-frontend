export class ApiError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = "ApiError";
        this.errors = errors;
    }
}