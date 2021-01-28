const express = require('express');
const app = express();

const mongoose = require('mongoose');//conectar con mongodb

require('./config/config.js');

//bodyparser nos sirve para manejar el payload de la url-encoded
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'))
 
mongoose.connect('mongodb://localhost:27017/cafe', (err, res)=>{
  if (err) throw err;
  console.log('Base de datos activa');
})

app.listen(process.env.PORT, () => {
console.log('Escuchando en el puerto:', process.env.PORT)})