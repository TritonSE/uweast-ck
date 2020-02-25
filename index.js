const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = require('./app');

const mongoose = require('mongoose');
const url = "mongodb+srv://virenabhyankar:uweastdb@cluster0-ro3dc.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

const log = app.logger;
const server = express();

// database
db.once('open', _ => {
  console.log('Database connected:', url);
});

db.on('error', err => {
  console.error('connection error:', err);
});

// view engine setup
server.set('views', path.join(__dirname, 'app/views'));
server.set('view engine', 'ejs');

// middleware
server.use(morgan('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'app/public')));

// routing
server.use('/', app.routes);

server.listen(app.config.port, () => {
  log.info(`Started server on port ${app.config.port}`);
});
