<?php

namespace App\Http\Controllers;

use App\Models\Convocatoria;
use Illuminate\Http\Request;

class ConvocatoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $convocatorias = Convocatoria::all();

        if ($convocatorias -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron las convocatorias',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        return response() -> json($convocatorias, 200);
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
    public function show(Convocatoria $convocatoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Convocatoria $convocatoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Convocatoria $convocatoria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Convocatoria $convocatoria)
    {
        //
    }
}
