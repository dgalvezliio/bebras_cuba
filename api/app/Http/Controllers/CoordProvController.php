<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CoordProvincial;
use Illuminate\Support\Facades\Validator;

class CoordProvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $coordprovincial = CoordProvincial::all();

        if ($coordprovincial -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron los coordinadores provinciales',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        return response() -> json($coordprovincial, 200);
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
        $validator = Validator::make($request->all(), [  
            'ci' => 'required',  
            'nombre' => 'required',  
            'apellidos' => 'required',  
            'correo' => 'required',  
            'contacto' => 'required',  
            'contrasenia' => 'required',  
            'cdgo_provincia' => 'required'
        ]);  

        if($validator->fails()) {  
            $data = [  
                'message' => 'Error en la validacion de datos',  
                'errors' => $validator->errors(),  
                'status' => 400  
            ];  
            return response()->json($data, 400);  
        }  

        $coordprov = CoordProvincial::create([  
            'ci' => $request->ci, 
            'nombre' => $request->nombre,  
            'apellidos' => $request->apellidos,  
            'correo' => $request->correo,  
            'contacto' => $request->contacto,  
            'cdgo_provincia' => $request->cdgo_provincia,  
            'contrasenia' => bcrypt($request->contrasenia) 
        ]); 

        if(!$coordprov) {  
            $data = [  
                'message' => 'Error al crear el coordinador provincial',  
                'status' => 500  
            ];  
            return response()->json($data, 500);  
        }  

        $data = [  
            'message' => 'Coordinador provincial creado exitosamente',
            'coordprovincial' => $coordprov,  
            'status' => 201  
        ];  

        return response()->json($data, 201);  
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
