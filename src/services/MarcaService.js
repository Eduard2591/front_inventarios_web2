import { axiosConfig } from "../configuration/axiosConfig"

/**
 * Obtiene todos las Marcas
 */
const obtenerMarcas = (estado = true) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Crea una Marca
 */
const crearMarca = (data) => {
    return axiosConfig.post ('marcas', data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Actualiza Marca por ID
 */
const editarMarcaPorID = (tipoId, data) => {
    return axiosConfig.put('marcas/'+tipoId, data, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Borra Marca por ID
 */
 const borrarMarcaPorID = (tipoId) => {
    return axiosConfig.delete('marcas/'+tipoId, {}, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/**
 * Consulta Marca por ID
 */
 const obtenerMarcaPorID = (tipoId) => {
    return axiosConfig.get('marcas/'+tipoId, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export {
    obtenerMarcas,
    crearMarca,
    editarMarcaPorID,
    borrarMarcaPorID,
    obtenerMarcaPorID
}