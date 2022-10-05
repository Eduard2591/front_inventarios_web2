import { axiosConfig } from "../configuration/axiosConfig"

//obtener tipos de equipos 
const obtenerTiposEquipos = ( estado = true ) => {
    return axiosConfig.get('tipoequipos?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

// crear un tipo de equipo 
const crearTipoEquipo = ( data ) => {
    return axiosConfig.get('tipoequipos', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

//editar tipo equipo por ID
const editarTipoEquipoporID = (tipoId, data ) => {
    return axiosConfig.put('tipoequipos/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}


//Borra un tipo de equipo por ID
const borrarTipoEquipoPorID = (tipoId) => {
    return axiosConfig.delete('tipoequipos/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}
 
//Consulta un tipo de equipo por ID
const obtenerTipoEquipoPorID = (tipoId) => {
    return axiosConfig.get('tipoequipos/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

 
export {
    obtenerTiposEquipos,
    crearTipoEquipo,
    editarTipoEquipoporID,
    borrarTipoEquipoPorID,
    obtenerTipoEquipoPorID
}