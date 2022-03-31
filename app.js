// Importaciones de librerías
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Initializations
const app = express();
require('dotenv').config();
require('./database');

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configs
const port = process.env.PORT || 5000;

// Statics files
app.use(express.static(path.join(__dirname, '/public')));

// Rutas
app.use('/api/user', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/word', require('./routes/words.routes.js'));

// Servidor en escucha
app.listen(port, () => console.log(`Server running on http://127.0.0.1:${port}`));

