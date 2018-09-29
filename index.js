const path = require("path");
const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require("./package");

const app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

//session 中间件
app.use(session({
    name:config.session.key,
    secret:config.session.secret,
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:config.session.maxAge
    },
    store:new MongoStore({
        url:config.mongodb
    })
}));

//false中间件
app.use(flash());

routes(app);


app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
});
