<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Profesor;
use App\Models\User;
use App\Models\Edicion;
use App\Models\Coordinador;

class UserController extends Controller
{
    // 
    public function login(Request $request) {
        $credentials = $request->only('correo', 'contrasenia');

        if (auth()->attempt($credentials)) {
            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario es un profesor
            if ($user->rol === 'profesor') {
                // Obtener la edición abierta
                $edicionAbierta = Edicion::where('abierto', true)->first();

                // Verificar si el profesor está activo
                $profesor = Profesor::where('correo', $user->correo)->first(); // Asumiendo que el correo del profesor está en la tabla de profesores

                if ($profesor && $profesor->esta_activo) {
                    // Comprobar si hay una edición abierta
                    if ($edicionAbierta) {
                        return response()->json(['rol' => 'profesor'], 200);
                    } else {
                        return response()->json(['error' => 'No hay ediciones abiertas'], 403);
                    }
                } else {
                    return response()->json(['error' => 'El profesor no está activo'], 403);
                }
            }
            // Manejo para otros roles
            if ($user->rol === 'admin') {
                return response()->json(['rol' => 'admin'], 200);
            } elseif ($user->rol === 'coord_nacional') {
                return response()->json(['rol' => 'coord_nacional'], 200);
            }

        } else {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }
    }

    // 
    public function logout(Request $request) {
        auth()->logout();
        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }

    // 
    public function listarUsuarios() {
        $profesores = Profesor::where('es_nuevo', true)  
            ->select('profesores.*', 'escuelas.nombre as nombre_escuela', 'escuelas.subsistema', 'escuelas.poblado', 'escuelas.telefono as telefono_escuela')  
            ->join('profesor_escuela', 'profesores.id', '=', 'profesor_escuela.id_profesor')  
            ->join('escuelas', 'profesor_escuela.id_escuela', '=', 'escuelas.id')  
            ->get();  
        return response()->json($profesores);   
    }

    // 
    public function listarNoProfesores() {
        // Asumiendo que tienes una tabla 'users' con un campo 'rol'
        $usuarios = User::where('rol', '!=', 'profesor')
            ->select('profesores.*','users.rol') // Opcional: excluye usuarios sin rol definido
            ->join('profesores', 'users.ci', '=', 'profesores.nro_ci')
            ->get();
        return response()->json($usuarios);
    }
    public function listarRoles() {
        // Asumiendo que tienes una tabla 'users' con un campo 'rol'
        $usuarios = User::where('rol', '!=', 'profesor')
            ->select('users.rol') // Opcional: excluye usuarios sin rol definido
            
            ->get();
        return response()->json($usuarios);
    }
    // 
    public function registrarUsuario(Request $request) {
        // Validar los datos del usuario
        $edicionActual = Edicion::where('abierto', true)->first(); 
        if (!$edicionActual) { 
            return response()->json(['message' => 'No hay una edición abierta, no se puede registrar.'], 400); 
        }

        $validator = Validator::make($request->all(), [  
            'nro_ci' => 'required|unique:profesores,nro_ci',  
            'nombre' => 'required',  
            'apellidos' => 'required',  
            'correo' => 'required|email|unique:profesores,correo',  
            'telefono' => 'required|unique:profesores,telefono',  
            'contrasenia' => 'required',
            'rol' => 'required',
            'pin' => 'required',
        ], [
            'nro_ci.unique' => 'Ya existe una persona con este número de CI',
            'correo.unique' => 'Este correo ya está registrado',
            'telefono.unique' => 'Este número de teléfono ya está registrado',
        ]);
    
        if ($validator->fails()) {  
            $data = [  
                'message' => 'Error en la validación de datos',  
                'errors' => $validator->errors(),  
                'status' => 400  
            ];  
            return response()->json($data, 400);  
        }  
        
        $profesor = Profesor::create([  
            'nro_ci' => $request->input('nro_ci'),  
            'nombre' => $request->input('nombre'),  
            'apellidos' => $request->input('apellidos'),  
            'correo' => $request->input('correo'),  
            'telefono' => $request->input('telefono'),   
            'es_nuevo' => true,       // Valor inicial para nuevo profesor
            'perfil_editado' => false, // Valor inicial perfil nuevo profesor
            'esta_activo' => false     // Valor inicial de estado del profesor
        ]); 

        $user = User::create([
            'ci' => $request->input('nro_ci'),
            'correo' => $request->input('correo'),
            'contrasenia' => bcrypt($request->input('contrasenia')),
            'pin' => bcrypt($request->input('pin')),
            'rol' => $request->input('rol'),
        ]);

        $coordinador = Coordinador::create([
            'edicion' => $edicionActual->n_edicion,
            'ci' => $request->input('nro_ci'),
        ]);

        $data = [  
            'profesor' => $profesor,  
            'usuario' => $user, 
            'coordinador' => $coordinador,
            'status' => 201,  
            'message' => 'Profesor y usuario registrados con éxito'  
        ];  

        return response()->json($data, 201);
    }
}
