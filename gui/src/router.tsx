import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import PagError from './pages/PagError';
import PagMiPerfil from './pages/PagMiPerfil';
import PagAcceso from './pages/PagAcceso';
import PagEditarCuenta from './pages/PagEditarCuenta';
import PagGeoBebras from './pages/PagGeoBebras';
import PagGestionAlumnos from './pages/PagGestionAlumnos';
import PagGestionConcurso from './pages/PagGestionConcurso';
import PagGestionEscuela from './pages/PagGestionEscuela';
import PagGestionMunic from './pages/PagGestionMunic';
import PagInicial from './pages/PagInicial';
import PagRecurso from './pages/PagRecurso';
import PagSolicCoodMunic from './pages/PagSolicCoordMunic';
import PagSolicCoordProvinc from './pages/PagSolicCoordProvinc';
import PagSolicitudes from './pages/PagSolicitudes';
import PagSolicRegist from './pages/PagSolicRegist';
import { ConfirmEmail } from './components/ConfirmEmail';


export const router = createBrowserRouter([  
    {  
        path: "/",  
        element: <App />,  
        errorElement: <PagError />,  
        children: [  
            { path: "/", element: <PagInicial /> },
            { path: "/acceso", element: <PagAcceso /> },
            { path: "/registro", element: <PagSolicRegist /> },
            { path: "/gestionar_escuela", element: <PagGestionEscuela /> },
            { path: "/gestionar_concurso", element: <PagGestionConcurso /> },
            { path: "/recurso", element: <PagRecurso /> },
            { path: "/gestionar_alumnos", element: <PagGestionAlumnos /> },
            { path: "/geobebras", element: <PagGeoBebras /> },
            { path: "/gestionar_municipios", element: <PagGestionMunic /> },
            { path: "/mi_perfil", element: <PagMiPerfil /> },
            { path: "/editar_cuenta", element: <PagEditarCuenta /> },
            { path: "/solicitudes", element: <PagSolicitudes /> },
            { path: "/solic_coord_provinc", element: <PagSolicCoordProvinc /> },
            { path: "/solic_coord_munic", element: <PagSolicCoodMunic /> },
            { path: "/mi-perfil/*", element: <PagMiPerfil /> },  
            { path: "/confirmar-email", element: <ConfirmEmail /> },  

        ],  
    },  
    
]);