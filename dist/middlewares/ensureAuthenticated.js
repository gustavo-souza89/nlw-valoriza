"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    //Receber o token
    var Authtoken = request.headers.authorization;
    //Validar se o token está preenchido        
    if (!Authtoken) {
        response.status(401).end();
    }
    var token = Authtoken.split(' ')[1];
    try {
        //Validar se o token é valido
        var sub = jsonwebtoken_1.verify(token, "d616c887875d53a599532d8e59b3c921").sub;
        //Recuperar informações do usuário
        request.user_id = sub;
        return next();
    }
    catch (err) {
        response.status(401).end();
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
