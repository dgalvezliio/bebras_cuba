<?php

namespace App\Http\Controllers;

use App\Models\Edicion;
use Illuminate\Http\Request;

class EdicionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $ediciones = Edicion::all();

        if ($ediciones -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron las ediciones',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }

        return response() -> json($ediciones, 200);
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
    public function show(Edicion $edicion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Edicion $edicion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Edicion $edicion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Edicion $edicion)
    {
        //
    }
}
