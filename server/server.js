require('./CONFIG/config')

const express = require('express')
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

 


app.get('/usuario', function (req, res) {
  res.json('Hello World')
})

app.post('/usuario/:id', function (req, res) {

    //let id = req.params.id;
    
   let body = req.body;
    res.json({
      persona: body
    })


  })

  app.put('/', function (req, res) {
    res.json('Hello put')
  })

  app.delete('/', function (req, res) {
    res.json('Hello Delete')
  })
 
app.listen(process.env.PORT, () => {
console.log('Escuchando en el puerto:', process.env.PORT)})