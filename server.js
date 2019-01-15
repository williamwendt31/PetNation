const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const API_PORT = process.env.API_PORT || 8000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect('mongodb://localhost/petPound', { useNewUrlParser: true });
require('./server/config/mongoose');

require('./server/controllers/sockets')(io, app);

server.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
