<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CoordinadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function activarProfesor(Request $request, $profesorId)  
    {  
        // Verificar que el usuario actual sea el coordinador nacional  
        if (auth()->user()->es_coordinador_nacional) {  
            $profesor = Profesor::findOrFail($profesorId);  
            $profesor->esta_activo = !$profesor->esta_activo;  
            $profesor->save();  

            return response()->json(['message' => 'Estado del profesor actualizado'], 200);  
        } else {  
            return response()->json(['error' => 'No tienes permiso para realizar esta acción'], 403);  
        }  
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
