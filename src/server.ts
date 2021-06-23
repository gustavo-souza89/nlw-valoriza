import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import { router } from "./routes";
import "./database";
import { ErrorHandler } from "./classes/ErrorHandler";


const app = express();

app.use(express.json());

app.use(router);
//Middlewares - Tratando as exceções dos Services
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof ErrorHandler) {
            const { name, statusCode, message, description } = err

            return response.status(statusCode).json({ name, message, description })

        }

        return response.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
);

app.listen(3000, () => console.log('Server is started on port 3000! '));