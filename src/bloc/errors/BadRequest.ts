export class BadRequest extends Error {
    statusCode = 400;
    message: string;


    constructor(message: string) {
        super(message);
        this.message = message;
    }
}
