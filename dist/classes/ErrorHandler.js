"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler(_a) {
        var name = _a.name, statusCode = _a.statusCode, message = _a.message, description = _a.description;
        this.message = message,
            this.name = name,
            this.statusCode = statusCode,
            this.description = description;
    }
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
/**
 * Futuramente criar uma classe/metodo com todos os erros e dentro dos
 * services chamar o metodo ErrorHandler para configurar a mensagem chamando
 *  o metodo com todos os erros possíveis para direcionar os erros.
*/ 
