import React, { useEffect } from 'react'
import { obtenerTiposEquipos } from '../../services/TipoEquipoService';

export default function TipoEquipos() {
  const listTipoEquipos = async () => {
    const {data} = await obtenerTiposEquipos(true)
      console.log(data);
  }

  useEffect(() => {
    listTipoEquipos ()
  }, [])
  
  return (
    <div>TipoEquipos</div>
  )
}
