interface IErrorHandler {
    name: string,
    statusCode: number,
    message: string,
    description: string
}

class ErrorHandler {
    message: string;
    name: string;
    statusCode: number;
    description: string;

    constructor({ name, statusCode, message, description }: IErrorHandler) {
        this.message = message,
            this.name = name,
            this.statusCode = statusCode,
            this.description = description
    }
}

export { ErrorHandler };


/**
 * Futuramente criar uma classe/metodo com todos os erros e dentro dos 
 * services chamar o metodo ErrorHandler para configurar a mensagem chamando
 *  o metodo com todos os erros possíveis para direcionar os erros. 
*/