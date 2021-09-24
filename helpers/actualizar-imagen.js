const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) =>{
                 
     if(fs.existsSync(path)){
         //Con esto borramos la imagen anterior
         fs.unlinkSync(path);
     }
}


const actualizarImagen = async(tipo,id,nombreArchivo)=>{
    
    
    let pathViejo = '';

    switch( tipo ){
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No existe un médico por ese id');
                return false;
            }

            //Con esto tengo el path viejo
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);
            
            medico.img = nombreArchivo;
            await medico.save();

            return true;

        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No existe un hospital por ese id');
                return false;
            }

            //Con esto tengo el path viejo
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);
            
            hospital.img = nombreArchivo;
            await hospital.save();

            return true;

        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No existe usuario con id');
                return false;
            }

            //Con esto tengo el path viejo
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);
            
            usuario.img = nombreArchivo;
            await usuario.save();

            return true;


        break;
    }


}


module.exports = {
    actualizarImagen
}