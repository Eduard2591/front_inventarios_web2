import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { obtenerTiposEquipos } from '../../services/TipoEquipoService';
import Modal from '../ui/Modal';

export default function TipoEquipos() {

  const [tipoEquipos, setTipoEquipos] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  

  const listTipoEquipos = async () => {
    setLoading(true)
    try {
      setError(false)
      const { data } = await obtenerTiposEquipos(query)
      setTipoEquipos(data)
      setLoading(false)
    }catch (e){
      console.log(e);
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    listTipoEquipos ()
  }, [query])

  const cambiarSwitche = () =>{
    setQuery(!query)
  }
  
  return (
  <div>
    <Modal titulo={'Tipo de Equipo'}/>
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      Nuevo
    </button>

    <div className="form-check form-switch">
      <input 
      className="form-check-input" 
      type="checkbox" 
      role="switch" 
      id="flexSwitchCheckChecked" 
      checked={query}
      onChange={cambiarSwitche}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Activo / Inactivo</label>
    </div>

    {
      loading && 
      (<div className='spinner-grow' role="status">
          <span className='visually-hidden'>Loading...</span>
        </div>
      )
    }

    {
      error && 
      (<div className="alert alert-danger" role="alert">
        Error al cargar datos
      </div>)
    }

    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Creado</th>
          <th scope="col">Actualizado</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {
          tipoEquipos.map((tipoEquipos, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{tipoEquipos.nombre}</td>
                <td>{tipoEquipos.estado ? 'Activo': 'Inactivo'}</td>
                <td>{dayjs(tipoEquipos.fechaCreacion).format('YYYY-MM-DD')}</td>
                <td>{dayjs(tipoEquipos.fechaActualizacion).format('YYYY-MM-DD')}</td>
                <td>
                  <button type="button" className="btn btn-outline-success">Editar</button>
                  <button type="button" className="btn btn-outline-danger">Eliminar</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>
)
}

