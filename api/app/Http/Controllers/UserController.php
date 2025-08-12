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
    public function login(Request $request) {
        $credentials = $request->only('correo', 'contrasenia');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();

            // Profesor
            if ($user->hasRole('Profesor')) {
                $edicionAbierta = Edicion::where('abierto', true)->first();
                $profesor = Profesor::where('correo', $user->correo)->first();

                if ($profesor && $profesor->esta_activo) {
                    if ($edicionAbierta) {
                        return response()->json(['rol' => 'profesor'], 200);
                    }
                    return response()->json(['error' => 'No hay ediciones abiertas'], 403);
                }
                return response()->json(['error' => 'El profesor no está activo'], 403);
            }

            // Administrador
            if ($user->hasRole('Administrador')) {
                return response()->json(['rol' => 'admin'], 200);
            }

            // Coordinador Nacional
            if ($user->hasRole('Coordinador Nacional')) {
                return response()->json(['rol' => 'coord_nacional'], 200);
            }

            return response()->json(['rol' => 'usuario'], 200);
        }

        return response()->json(['error' => 'Credenciales inválidas'], 401);
    }

    public function logout(Request $request) {
        auth()->logout();
        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }

    public function listarUsuarios() {
        $profesores = Profesor::where('es_nuevo', true)  
            ->select('profesores.*', 'escuelas.nombre as nombre_escuela', 'escuelas.subsistema_id as subsistema', 'escuelas.poblado', 'escuelas.telefono as telefono_escuela')  
            ->join('profesor_escuela', 'profesores.id', '=', 'profesor_escuela.id_profesor')  
            ->join('escuelas', 'profesor_escuela.id_escuela', '=', 'escuelas.id')  
            ->get();  
        return response()->json($profesores);   
    }
}
