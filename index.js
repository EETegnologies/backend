require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Crear el servidor de express
const app = express();

//Configurar CORS
app.use( cors() );

//Lectura y parseo del body
//Parseo la informacion
//Debe ir antes del de las rutas por que si no tomaria
//la información y despues la parsearia

app.use( express.json() );

//Base de datos
dbConnection();

//Directorio público
app.use(express.static('public') );

//console.log( process.env );


//Uso de middleware
//Cualquier peticion que pase por aqui va a ser respondida por el router que estoy exportando aqui
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));




//Levantar el puerto
app.listen( process.env.PORT, ()=> {
    console.log('Servidor en puerto ' + process.env.PORT);
})