// Importaciones de librerías
const express = require('express');
const http = require('http');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const socketio = require("socket.io");
const Sockets = require("./models/sockets");

// Configs

// Initializations
const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('dotenv').config();
require('./database');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

new Sockets(io)
const port = process.env.PORT || 6000;



// Statics files
app.use(express.static(path.join(__dirname, '/public')));

// Rutas
app.use('/api/user', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/word', require('./routes/words.routes'));
app.use('/api/category', require('./routes/categories.routes'));

// Servidor en escucha
server.listen(port, () => console.log(`Server running on http://127.0.0.1:${port}`));

