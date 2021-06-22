/**
 * Link HTTP GIT
 * https://github.com/gustavo-souza89/nlw-valoriza.git
 */
import "reflect-metadata";
import express, { response } from 'express';
import { router } from "./routes";

import "./database";

const app = express();
app.use(express.json());

app.use(router);

app.listen(3000, () => console.log('Server is started on port 3000! '));