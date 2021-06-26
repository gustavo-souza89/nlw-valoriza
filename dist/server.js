"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var routes_1 = require("./routes");
require("./database");
var ErrorHandler_1 = require("./classes/ErrorHandler");
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.router);
//Middlewares - Tratando as exceções dos Services
app.use(function (err, request, response, next) {
    console.log(err);
    if (err instanceof ErrorHandler_1.ErrorHandler) {
        var name = err.name, statusCode = err.statusCode, message = err.message, description = err.description;
        return response.status(statusCode).json({ name: name, message: message, description: description });
    }
    console.log(err);
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});
dotenv_1.default.config();
app.listen(process.env.PORT || 3000, function () { return console.log('Server is started on port 3000! '); });
