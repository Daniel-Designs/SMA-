//Conexion a base de datos
require('dotenv').config()
const mongoose = require('mongoose')
const uri = `mongodb+srv://daniel:${process.env.PASSWORD}@cluster0.ton32.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority` 

const dbConnection = ()=>{
  //console.log(uri)
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))
}



module.exports = {dbConnection}; 