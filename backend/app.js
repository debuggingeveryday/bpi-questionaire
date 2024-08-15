var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var questionairesRouter = require('./routes/questionaires');

var app = express();

var corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* I comment this for tauri so that frontend will display in software application */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/questionaires', questionairesRouter);

module.exports = app;
