/*
Importación de módulos
*/
const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');
const {dbConnection} = require('./dataBase/dbConnection');
const { json } = require('express');
require('dotenv').config()

dbConnection();

// Crear una aplicación de express
const app = express();
// Abrir la aplicacíon en el puerto 3000

app.use(express.json());
app.use(cors());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/grupos', require('./routes/grupos'));
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/asignaturas', require('./routes/asignaturas'));
app.use('/api/evaluacion', require('./routes/evaluacion'));
app.use('/api/rubrica', require('./routes/rubrica'));
app.use('/api/semana',require('./routes/semanas'))


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});