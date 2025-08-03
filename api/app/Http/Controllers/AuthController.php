<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\Edicion;
use App\Models\Profesor;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'correo' => 'required|email',
            'contrasenia' => 'required|string|min:6',
        ]);

        // Verificar el usuario
        $user = User::where('correo', $request->correo)->first();

        if (!$user || !Hash::check($request->contrasenia, $user->contrasenia)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Crear el token de acceso
        $token = $user->createToken('auth_token')->plainTextToken;
        
        // Verificar si el usuario es un profesor
        if ($user->rol === 'profesor') {
            // Obtener la edición abierta
            $edicionAbierta = Edicion::where('abierto', true)->first();
            // Verificar si el profesor está activo
            $profesor = Profesor::where('correo', $user->correo)->first(); // Asumiendo que el correo del profesor está en la tabla de profesores
            if ($edicionAbierta) {
                // Comprobar si hay una edición abierta
                if ($profesor && $profesor->esta_activo) {
                    return response()->json([
                        'message' => 'Bienvenido Profesor',
                        'user' => [
                            'id' => $user->id,
                            'nombre' => $profesor->nombre,
                            'apellidos' =>$profesor->apellidos,
                            'correo' => $user->correo,
                            'rol' => $user->rol,
                        ],
                        'token' => $token,
                    ]);
                } else {
                    return response()->json(['error' => 'El profesor no está activo'], 403);
                }
            } else { 
                return response()->json(['error' => 'No hay edición abierta'], 403);
            }
        }
        // Manejo para otros roles
        if ($user->rol === 'admin') {
            $profesor = Profesor::where('correo', $user->correo)->first();
            return response()->json([
                'message' => 'Bienvenido Administrador',
                'user' => [
                    'id' => $user->id,
                    'nombre' => $profesor->nombre,
                    'apellidos' =>$profesor->apellidos,
                    'correo' => $user->correo,
                    'rol' => $user->rol,
                ],
                'token' => $token
            ], 200);
        } elseif ($user->rol === 'coord_nacional') {
            $profesor = Profesor::where('correo', $user->correo)->first();
            return response()->json([
                'message' => 'Bienvenido Coordinador Nacional',
                'user' => [
                    'id' => $user->id,
                    'nombre' => $profesor->nombre,
                    'apellidos' =>$profesor->apellidos,
                    'correo' => $user->correo,
                    'rol' => $user->rol,
                ],
                'token' => $token,    
            ], 200);
        }

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }
}
