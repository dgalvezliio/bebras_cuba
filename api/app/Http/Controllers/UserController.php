<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario es un profesor
            if ($user->role === 'profesor') {
                // Obtener la edición abierta
                $edicionAbierta = Edicion::where('abierto', true)->first();

                // Verificar si el profesor está activo
                $profesor = Profesor::where('correo', $user->email)->first(); // Asumiendo que el correo del profesor está en la tabla de profesores

                if ($profesor && $profesor->esta_activo) {
                    // Comprobar si hay una edición abierta
                    if ($edicionAbierta) {
                        return response()->json(['role' => 'profesor'], 200);
                    } else {
                        return response()->json(['error' => 'No hay ediciones abiertas'], 403);
                    }
                } else {
                    return response()->json(['error' => 'El profesor no está activo'], 403);
                }
            }

            // Manejo para otros roles
            if ($user->role === 'admin') {
                return response()->json(['role' => 'admin'], 200);
            } elseif ($user->role === 'coord_nacional') {
                return response()->json(['role' => 'coord_nacional'], 200);
            }

        } else {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function logout(Request $request)
    {
        auth()->logout();
        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    
}
