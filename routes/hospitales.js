/*
    Hospitales
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales,crearHospital,actualizarHospital,borrarHospital } = require('../controllers/hospitales');

const router = Router()

//GET
router.get( '/' , getHospitales );
//FIN GET


//CREAR
router.post('/', 
[
   validarJWT,
   check('nombre','El nombre del hospital es necesario').not().isEmpty(),
   validarCampos
] ,
crearHospital

);
//FIN CREAR


//ACTUALIZAR
router.put( '/:id',
[
   validarJWT,
   check('nombre','El nombre del hospital es necesario').not().isEmpty(),
   validarCampos
], 
actualizarHospital );
//FIN ACTUALIZAR

//ELIMINAR
router.delete( '/:id',
        validarJWT,
        borrarHospital
);
//FIN ELIMINAR



module.exports = router;

