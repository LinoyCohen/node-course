const express = require("express");
const usersRouter = express.Router();
const validator = require("../middlewares/validator");
const { symbolValidator } = require("../controllers/usersController/usersValidators")
const { addSymbol } = require("../controllers/usersController/users");

usersRouter.get("/dashboard");

usersRouter.get("/logout");

usersRouter.post("/symbol", validator(symbolValidator), addSymbol);

module.exports = usersRouter;
