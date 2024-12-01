<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recurso;

class RecursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $recursos = Recurso::all();

        if ($recursos->isEmpty()) {
            $data = [
                'message' => 'No se encontraron los recursos',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }
        return response() ->json($recursos, 200);
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
        // Validación de los datos  
        $request->validate([  
            'nombre' => 'required|string|max:100',  
            'descripcion' => 'nullable|string|max:255',  
            'archivo' => 'required|file|mimes:pdf|max:2048', // Asegúrate de que sea un archivo PDF  
        ]);  

        // Almacenar el archivo  
        $path = $request->file('archivo')->store('recursos', 'public'); // Almacena el archivo en el disco 'public'  

        // Crear un nuevo recurso en la base de datos  
        $recurso = Recurso::create([  
            'nombre' => $request->nombre,  
            'descripcion' => $request->descripcion,  
            'archivo_path' => $path,  
        ]);  

        return response()->json($recurso, 201);  
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
