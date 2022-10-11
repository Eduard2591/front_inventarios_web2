import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Estado from '../components/estados/Estados'
import Inventarios from '../components/inventarios/Inventarios'
import Marcas from '../components/marcas/Marcas'
import TipoEquipos from '../components/tiposequipos/TipoEquipos'
import NavBar from '../components/ui/NavBar'
import NotFound from '../components/ui/NotFound'
import Usuarios from '../components/usuarios/Usuarios'

export default function AppRouter() {
  return (
    <div>
        <NavBar title={'IUD'}/>
        <main className='container'>
            < Routes>
                <Route path='/' element={<TipoEquipos />}/>
                <Route path='/estados' element={<Estado />}/>
                <Route path='/marcas' element={<Marcas />}/>
                <Route path='/usuarios' element={<Usuarios />}/>
                <Route path='/inventarios' element={<Inventarios />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </main>
    </div>
  )
}
