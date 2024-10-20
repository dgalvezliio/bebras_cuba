<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $estudiantes = Estudiante::all();

        if ($estudiantes -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron los estudiantes',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        return response() -> json($estudiantes, 200);
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
        $validator = Validator::make($request->all(), [
        'nombre'=> 'required',
        'nro_ci'=> 'required',
        'grado'=> 'required',
        'genero'=> 'required',
        'puntuacion'=> 'required',
        'cdgo_profesor' => 'required',
        'cdgo_escuela' => 'required'
        ]);

        if($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'errors' => $validator -> errors(),
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        $estudiante = Estudiante::create([
            'nombre'=> $request -> nombre,
            'nro_ci'=> $request -> nro_ci,
            'grado'=> $request -> grado,
            'genero'=> $request -> genero,
            'puntuacion'=> $request -> puntuacion,
            'cdgo_profesor'=> $request -> cdgo_profesor,
            'cdgo_escuela'=> $request -> cdgo_escuela,
        ]);

        if(!$estudiante) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'status' => 500
            ];
            return response() -> json($data, 500);
        }

        $data = [
            'estudiantes' => $estudiante,
            'status' => 500
        ];

        return response() -> json($data, 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Estudiante $estudiante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Estudiante $estudiante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Estudiante $estudiante)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Estudiante $estudiante)
    {
        //
    }
}
