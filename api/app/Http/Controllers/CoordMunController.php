<?php

namespace App\Http\Controllers;

use App\Models\CoordMunicipal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoordMunController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $coordmunicipal = CoordMunicipal::all();

        if ($coordmunicipal -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron los coordinadores municipales',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        return response() -> json($coordmunicipal, 200);
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
            'ci' => 'required',
            'nombre' => 'required',
            'apellidos' => 'required',
            'correo' => 'required',
            'contacto' => 'required',
            'contrasenia' => 'required',
            'cdgo_municipio' => 'required'
            
        ]);

        if($validator->fails()) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'errors' => $validator -> errors(),
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        $coordmun = CoordMunicipal::create([
            'ci' => $request -> ci,           
            'nombre' => $request -> nombre,
            'apellidos' => $request -> apellidos,
            'correo' => $request -> correo,
            'contacto' => $request -> contacto,
            'contrasenia' => $request -> contrasenia,
            'cdgo_municipio' => $request -> cdgo_municipio,
        ]);

        if(!$coordmun) {
            $data = [
                'message' => 'Error en la validacion de datos',
                'status' => 500
            ];
            return response() -> json($data, 500);
        }

        $data = [
            'coordmunicipal' => $coordmun,
            'status' => 500
        ];

        return response() -> json($data, 201);
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
