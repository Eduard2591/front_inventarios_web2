import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { borrarUsuarioPorID, crearUsuario, editarUsuarioPorID, obtenerUsurios } from '../../services/UsuarioService'
import HeaderTable from '../ui/HeaderTable'
import Modal from '../ui/Modal'

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [usuario, setUsuario] = useState({
    nombre: '',
    usuario: true
  })
  const [errorSend, setErrorSend] = useState({
    status: false,
    msg: ''
  })
  //const [tipoId, setTipoId] = useState('')

  const listUsuarioss= async () => {
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerUsurios(query)
      setUsuarios(data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    listUsuarioss();
  }, [query])

  const cambiarSwitche = () => {
    setQuery(!query)
  }

  const guardarUsuario  = async () => {
    setErrorSend({status: false, msg: ''})
    setLoading(true)
    try{
      const res = await crearUsuario(usuario)
      console.log(res)
      setLoading(true)
      setUsuario({nombre: ''})
      listUsuarioss()
    }catch(e){
      const {status, data} = e.response;
      setErrorSend({status: true, msg: data.msg})
      console.log(e)
      setLoading(false)
    }
    
  }

  const handleChange = e => {
    setUsuario({
      ...usuario, 
      [e.target.name]: e.target.value
    })
  }

  const borrarUsuario = async (e) => {
    setLoading(true)
    try{
      setError(false)
      const id = e.target.id
      console.log(id)
      const res = await borrarUsuarioPorID(id)
      console.log(res)
      listUsuarioss();
      setLoading(false)
    }catch(e){
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const editarUsuario = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      setError(false)
      const resp = await editarUsuarioPorID(Usuarios._id, Usuarios);
      console.log(resp)
      resetUsuario()
      listUsuarioss()
    }catch(e){
      setLoading(false)
      console.log(e)
      setError(true)
    }

  }

  const setUsuarioPorId = (e) => {
    console.log(e.target.id)
    const usuariosFilter = usuarios.filter(t => t._id == e.target.id);
    const est = usuariosFilter[0];
    console.log(est)
    setUsuario(est)
  }

  const resetUsuario =() => {
    setUsuario({
      nombre: '',
      usuario: true
    })
  }

  return (
      <div>
        <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModal2Label">Editar Usuario</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                  onClick={resetUsuario}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editarUsuario}>
                  <div className="mb-3">
                    <label for="recipient-name" className="col-form-label">Nombre:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="recipient-name"
                      onChange={handleChange}
                      value={usuario.nombre}
                      name="nombre"
                    />
                    <select 
                      class="form-select" 
                      aria-label="Default select example"
                      name="usuario"
                      value={usuario.estado}
                      onChange={handleChange}
                    >
                      <option value={false}>Inactivo</option>
                      <option value={true}>Activo</option>
                    </select>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={resetUsuario}
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={usuario.nombre.length <= 0}
                    data-bs-dismiss="modal"
                  >
                    Enviar
                  </button>
                </form>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
        <Modal 
          titulo={'usuario'}
          guardar={guardarUsuario}
          element={usuario}
          change={handleChange}
        />
        <button 
          type="button" 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal" 
        >
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
          <label className="form-check-label" hmtlFor="flexSwitchCheckChecked">( Inactivo / Activo )</label>
        </div>
        {
          loading && 
          (<div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          </div>)
        }
        {errorSend.status && (
        <div className="alert alert-danger" role="alert">
          {errorSend.msg}
          </div>)
        }
        {
        error && (
        <div className="alert alert-danger" role="alert">
          Error al cargar datos
          </div>)
        }
        <table className="table">
        <HeaderTable />
        <tbody>
          {
            usuarios.map((usuario,index) => {
              return (
              <tr key={usuario._id}>
                <th scope="row">{index + 1}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.estado ? 'Activo': 'Inactivo'}</td>
                <td>{dayjs(usuario.fechaCreacion).format('YYYY-MM-DD')}</td>
                <td>{dayjs(usuario.fechaActualizacion).format('YYYY-MM-DD')}</td>
                <td>
                  <button 
                    id={usuario._id}
                    type="button" 
                    className="btn btn-success"
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal2"
                    onClick={setUsuarioPorId}
                  >
                    Editar
                  </button>
                  <button 
                    id={usuario._id}
                    type="button" 
                    className="btn btn-danger"
                    onClick={borrarUsuario}
                  >
                    Borrar
                  </button>
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