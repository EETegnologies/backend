/*
    Busqueda
    ruta: '/api/todo/:busqueda'
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getTodo,getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();


//GET 
router.get( '/:busqueda' , validarJWT ,getTodo );
//FIN GET

router.get( '/coleccion/:tabla/:busqueda' , validarJWT ,getDocumentosColeccion );



module.exports = router;

