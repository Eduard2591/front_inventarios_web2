import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todos los Usuarios
 */
const obtenerUsurios = (usuario = true) => {
    return axiosConfig.get('usuarios?estado='+usuario, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea un Usuario 
 */
const crearUsuario = (data) => {
    return axiosConfig.post('usuarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza un Usuario por ID
 */
const editarUsuarioPorID = (usuarioId, data) => {
    return axiosConfig.put('usuarios/'+usuarioId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra un Estado por ID
 */
 const borrarUsuarioPorID = (tipoId) => {
    return axiosConfig.delete('usuarios/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta un Usuario por ID
 */
 const obtenerUsuarioPorID = (tipoId) => {
    return axiosConfig.get('usuarios/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerUsurios,
    crearUsuario,
    editarUsuarioPorID,
    borrarUsuarioPorID,
    obtenerUsuarioPorID
}