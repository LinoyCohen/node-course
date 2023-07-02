const express = require("express");
const app = express();
const port = 3000;
const host = "localhost";
const path = require('path');
const usersRouter = require("./routes/users");
const guestsRouter = require("./routes/guests");
const githubRouter = require("./routes/github");
const auth = require('./middlewares/auth');
const session = require('express-session');
const config = require("config");
const mongoose = require("mongoose");

const notFound = require("./middlewares/notFound");
const error = require("./middlewares/error");
const {middleware: sqlConnection} = require("./middlewares/sqlConnection");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(sqlConnection);

const uri = "mongodb://127.0.0.1:27017/mymongo?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({
    // store: sessionStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  }));

app.use(auth.initialize());
app.use(auth.session());

app.use("/", usersRouter);
app.use("/", guestsRouter);
app.use("/github", githubRouter);

app.use(notFound);
app.use(error);


app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});
