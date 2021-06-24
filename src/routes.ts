import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/authenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createcompliemtnController = new CreateComplimentController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin ,createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", createcompliemtnController.handle);

export { router }