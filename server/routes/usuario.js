const express = require('express');
const app = express();
const bcrypt = require('bcrypt');//encriptaciones de las password(falta esconder)
const _ = require('underscore');//devuelve un objeto devolviendo ciertos valores para que no se pueda hacer un PUT;
const Usuario = require('../models/usuarios');//importa el Model Usuario
const { query } = require('express');//soluciona el problema de put en email;
const { Model } = require('mongoose');


app.get('/usuario', function (req, res) {
    //DEFINIMOS 2 VARIABLES PARA QUE SE PUEDA CARGAR EN EL PAYLOAD
    desde = req.query.desde || 0;
    desde = Number(desde);

    limite = req.query.limite || 5;
    limite=Number(limite);

    Usuario.find({/* estado:false */},'nombre estado email google password')//Schema Usuario, find para encontrar registros y mostrarlos, PAGINACIONES QUE RETORNA EL GET
        //se pueden mandar otros campos para que muestre determinados campos 
        .limit(limite)
        .skip(desde)
        //metodo exec para ejecutar un callback
        .exec((err,users)=>{
            if (err) {
                return res.status(400).json({
                    ok:false,
                    mensaje:err
                })
            }else{
                //para contar debe pasarse el mismo parametro en el count que en el find
                Usuario.countDocuments({ /* estado:false , otros parametros */}, function (err, count) {
                    if (err){
                        res.status(400).json({
                            ok:false,
                            err
                        })
                    }else{
                        res.json({
                            ok:true,
                            users:users,
                            countRegistros:count
                        })
                    }
                });}
                
        });


});  

//crear o insertar nuevos registros en la DB  
app.post('/usuario',(req, res) => {
  
      //let id = req.params.id;
      let body = req.body;

      let usuario = new Usuario({
          //asigno los campos que se toman del body;
          nombre:body.nombre,
          email: body.email,
          password:bcrypt.hashSync(body.password,10),
          role: body.role,
          estado: body.estado,
          google: body.google
      })


      //guardamos el modelo de usuario creado

      usuario.save((err,usuarioDB) =>{
          if (err) {
              return res.status(400).json({
                  ok:false,
                  mensaje:err
              })
          }else{
              return res.json({
                  ok:true,
                  usuario: usuarioDB
              })
          }
      })
      
  })
  
 
  
app.put('/usuario/:id', function (req, res) {
    
    let body = _.pick(req.body, ['nombre','email','img','role','estado']);//pick: devuelve un objeto con determinados campos, importar libreria
    let id = req.params.id;//id del payload ;
    
    Usuario.findByIdAndUpdate(id, body,{new: true, runValidators:true, context:'query'}, (err, usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error 400 '
            })
        }else{
        return res.json({
            ok:true,
            usuario:usuarioDB
        })
    }
    })
})
  
    app.delete('/usuario/:id', function (req, res) {
        let id = req.params.id;
    
        Usuario.findByIdAndRemove(id, (err, userDelete) => {
          if (err || (!userDelete)){
            res.status(400).json({
                ok:false,
                mensaje:'Error usuario no encontrado'
          })
            }else{
                res.json({
                    borrado: true,
                    usuarioBorrado: userDelete
                })
            }
      });
    });

module.exports  = app ;