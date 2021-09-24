/*
    Medicos
    ruta: '/api/medicos'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos,crearMedico,actualizarMedico,borrarMedico,getMedicoById } = require('../controllers/medicos');

const router = Router()

//GET 
router.get( '/', validarJWT , getMedicos );
//FIN GET

//CREAR
router.post('/', 
[
   validarJWT,
   check('nombre','El nombre del médico es necesario').not().isEmpty(),
   check('hospital','El hospital ID debe ser valido').isMongoId(),
   validarCampos
] ,
crearMedico

);
//FIN CREAR


//EDITAR
router.put( '/:id',
[
   validarJWT,
   check('nombre','El nombre del medico es necesario').not().isEmpty(),
   check('hospital','El hospital ID debe ser valido').isMongoId(),
   validarCampos
], 
actualizarMedico );

//FIN EDITAR

//BORRAR MEDICO
router.delete( '/:id',
        validarJWT,
        borrarMedico
);
//FIN BORRAR


//Get medico por id
router.get( '/:id',
        validarJWT,
        getMedicoById
);

//Fin get Medico Por Id


module.exports = router;

