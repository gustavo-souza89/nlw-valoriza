"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("./controllers/CreateUserController");
var CreateTagController_1 = require("./controllers/CreateTagController");
var ensureAdmin_1 = require("./middlewares/ensureAdmin");
var authenticateUserController_1 = require("./controllers/authenticateUserController");
var CreateComplimentController_1 = require("./controllers/CreateComplimentController");
var ensureAuthenticated_1 = require("./middlewares/ensureAuthenticated");
var ListUserSendComplimentsController_1 = require("./controllers/ListUserSendComplimentsController");
var ListUserReceiveComplimentsController_1 = require("./controllers/ListUserReceiveComplimentsController");
var ListTagsController_1 = require("./controllers/ListTagsController");
var ListUsersController_1 = require("./controllers/ListUsersController");
var router = express_1.Router();
exports.router = router;
var createUserController = new CreateUserController_1.CreateUserController();
var createTagController = new CreateTagController_1.CreateTagController();
var authenticateUserController = new authenticateUserController_1.AuthenticateUserController();
var createcompliemtnController = new CreateComplimentController_1.CreateComplimentController();
var listUserSendComp─║imentsController = new ListUserSendComplimentsController_1.ListUserSendComplimentsController();
var listUserReceiveComplimentsController = new ListUserReceiveComplimentsController_1.ListUserReceiveComplimentsController();
var listTagsConstroller = new ListTagsController_1.ListTagsController();
var listUserConstroller = new ListUsersController_1.ListUsersConstroller();
router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated_1.ensureAuthenticated, createcompliemtnController.handle);
router.get('/users/compliments/send', ensureAuthenticated_1.ensureAuthenticated, listUserSendComp─║imentsController.handle);
router.get('/users/compliments/receive', ensureAuthenticated_1.ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get('/tags', ensureAuthenticated_1.ensureAuthenticated, listTagsConstroller.handle);
router.get('/users', ensureAuthenticated_1.ensureAuthenticated, listUserConstroller.handle);
