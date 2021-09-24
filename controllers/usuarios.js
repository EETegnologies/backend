const { response } = require('express');
const  bcrypt  = require('bcryptjs');

//Importar ese modelo
const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const getUsuarios = async(req , res)=>{

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    const [usuarios,total] = await Promise.all([
        Usuario
            .find({},'nombre email role google img')
            .skip(desde)
            .limit(5),

            //Usuario.count()
            Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
    
}


//----------------------------------------------------------------------------------------------------------------

//Para usar el await tenemos que estar
//Dentro de una función async

const crearUsuario = async(req , res = response)=>{

    const { email, password} = req.body;

    

    try {
        
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        
        const usuario = new Usuario( req.body );
        
        //Encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password , salt);

        //Guardar usuario
        await usuario.save();

        //Genera el token - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });
    

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

    
}


const actualizarUsuario = async(req,res = response) => {


    // TODO: Validar token y comprobar si es el usuario correcto
    
    const uid = req.params.id;
    

    try{

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Actualizaciones

        const { password, google, email , ...campos } = req.body;
        

        if( usuarioDB.email  !== email ){
            
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok_: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if(!usuarioDB.google){

            campos.email = email;

        }else if(usuarioDB.email !== email){

            return res.status(400).json({
                ok : false,
                msg: 'Usuario de google no puede cambiar su correo'
            });

        }
        

        //De estos campos yo puedo borrar los que no quiero actualizar
       

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new:true } );

        res.json({
            ok: true,
            usuario : usuarioActualizado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async( req , res = response ) => {

    const uid = req.params.id;

    try{
        
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
           return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );
        
        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
            //uid
        })


    } catch(error){
        console.log("Ha ocurrido un error");
        res.status(500).json({
            ok:false,
            msg: 'No se pudo eliminar registro, error inesperado'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}