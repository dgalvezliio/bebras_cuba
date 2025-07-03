import React from 'react'
import ReactDOM from 'react-dom/client'
// Configuración de rutas 
import { RouterProvider } from 'react-router-dom';
import { router } from '../src/router.tsx';
import { UserProvider } from '../src/context/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)