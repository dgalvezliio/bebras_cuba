import React from 'react'
import ReactDOM from 'react-dom/client'
// Configuración de rutas 
import { RouterProvider } from 'react-router-dom';
import { router } from '../src/router.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
