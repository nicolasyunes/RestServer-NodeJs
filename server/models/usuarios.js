const mongoose = require('mongoose');


const uniqueValidator = require('mongoose-unique-validator');//validamos que un campo sea unico o para tener un enum(varios campos posibles)


//roles validos 
let rolesValidos = {
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


let Usuario = mongoose.Schema;//definimos el model 
let usuarioSchema = new Usuario ({  
    //campos del model con los campos obligatorios y unicos(unique)
    nombre:{
        type:String,
        required:[true, 'Requiere un nombre']
    },
    email:{
        type: 'String',
        unique:true,
        required:[true, 'Requiere correo']
    },
    password:{
        type: String,
        required:[true,'la contraseña es obligatoria']
    },
    img:{
        required:false
    },
    role:{
        type:String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }
});

//error de mongo arreglado con esto:
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true);

//plugin para enum e unique
usuarioSchema.plugin(uniqueValidator,{message: '{PATH} debe de ser unico'});
module.exports = mongoose.model('Usuario', usuarioSchema);