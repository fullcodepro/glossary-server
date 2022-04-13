const bcryptjs = require('bcryptjs');
const { generar_jwt } = require("../helpers/generar_jwt");
const Users = require("../models/Users");

const ctrlAuth = {};

ctrlAuth.signin = async (req, res) => {

    const { username, password, ...otherData } = req.body

    try {
        // Validar si existe el usuario
    const user = await Users.findOne({ username });
    
    if(!user){
        return res.status(401).json({
            msg:'Datos incorrectos, vuelva a intentarlo - username'
        });
    }
    
    // En caso de existir el user, comparar las contraseñas
    if(!user.active){
        return res.status(401).json({
            msg:'Datos incorrectos, vuelva a intentarlo - inactivo'
        });
    }

    // Comparar contraseñas
    const comparacion = bcryptjs.compareSync(password, user.password)
    
    if(!comparacion){
        return res.status(401).json({
            msg:'Datos incorrectos, vuelva a intentarlo - password'
        })
    }

    // console.log(user)
    const uid = user._id
    // Generar el token
    const token = await generar_jwt(uid)
    
    // Responder al user
    res.json({
       user,
       token
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Consulte al Administrador del sitio'
        })
    }

};

module.exports = ctrlAuth;