<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;


class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function listarCategorias()  
{  
    try {  
        $categorias = Categoria::where('edad_inferior', '>=', 0)  
                     ->where('edad_superior', '>', 0)  
                     ->get(['id', 'nombre_cuba']);  

        if ($categorias->isEmpty()) {  
            throw new Exception('No se encontraron las categorías');  
        }  

        return response()->json($categorias, 200);  
    } catch (Exception $e) {  
        $data = [  
            'message' => $e->getMessage(),  
            'status' => 404  
        ];  
        return response()->json($data, 404);  
    }  
}

    /**
     * Show the form for creating a new resource.
     */
    

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
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categoria)
    {
        //
    }
}
