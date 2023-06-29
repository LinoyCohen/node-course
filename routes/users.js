const express = require("express");
const usersRouter = express.Router();
const validator = require("../middlewares/validator");
const { symbolValidator } = require("../controllers/usersController/usersValidators")
const { addSymbol, 
    welcome, 
    dashboard, 
    logout, } = require("../controllers/usersController/users");
const enforeAuth = require('../middlewares/enforce-auth');
const enforceGuest = require('../middlewares/enforce-guest');

usersRouter.get("/dashboard", dashboard);
usersRouter.get("/logout");

usersRouter.post("/symbol", validator(symbolValidator), addSymbol);

module.exports = usersRouter;
