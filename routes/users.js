const express = require("express");
const usersRouter = express.Router();
const validator = require("../middlewares/validator");
const { symbolValidator } = require("../controllers/usersController/usersValidators")
const controller = require("../controllers/usersController/users");

usersRouter.get("/dashboard", controller.dashboard);
usersRouter.get("/logout");

usersRouter.post("/symbol", validator(symbolValidator), controller.addSymbol);

module.exports = usersRouter;
