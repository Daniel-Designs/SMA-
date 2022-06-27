/*
Importación de módulos
*/
const express = require('express');
const cors = require('cors');
const req = require('express/lib/request');
const {dbConnection} = require('./dataBase/dbConnection')
require('dotenv').config()

dbConnection();

// Crear una aplicación de express
const app = express();
// Abrir la aplicacíon en el puerto 3000

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});