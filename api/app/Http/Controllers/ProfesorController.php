<?php

namespace App\Http\Controllers;

use App\Models\Profesor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfesorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $profesores = Profesor::all();

        if ($profesores -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron los profesores',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        return response() -> json($profesores, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)  
    {   
        $validator = Validator::make($request->all(), [  
            'ci' => 'required',  
            'nombre' => 'required',  
            'apellidos' => 'required',  
            'correo' => 'required|email',  
            'telefono' => 'required',  
            'provincia' => 'required',  
            'municipio' => 'required',  
            'escuela' => 'required',  
            'contrasenia' => 'required',  
        ]);  

        if($validator->fails()) {  
            $data = [  
                'message' => 'Error en la validacion de datos',  
                'errors' => $validator->errors(),  
                'status' => 400  
            ];  
            return response()->json($data, 400);  
        }  

        $profesor = Profesor::create([  
            'ci' => $request->input('ci'),  
            'nombre' => $request->input('nombre'),  
            'apellidos' => $request->input('apellidos'),  
            'correo' => $request->input('correo'),  
            'telefono' => $request->input('telefono'),  
            'provincia' => $request->input('provincia'),  
            'municipio' => $request->input('municipio'),  
            'escuela' => $request->input('escuela'),  
            'contrasenia' => bcrypt($request->contrasenia),  
        ]); 

        if(!$profesor) {  
            $data = [  
                'message' => 'Error al crear el profesor',  
                'status' => 500  
            ];  
            return response()->json($data, 500);  
        }  

        $data = [  
            'profesor' => $profesor,  
            'status' => 201  
        ];  

        return response()->json($data, 201);  
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profesor $profesor)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profesor $profesor)
    {
        //

    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Profesor $profesor)
    {
        //
    }
}
