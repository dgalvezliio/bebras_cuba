<?php

namespace App\Http\Controllers;

use App\Models\Escuela;
use App\Models\Municipio;
use Illuminate\Http\Request;
use App\Http\Controllers\EscuelaController;

class EscuelaController extends Controller
{
    /**
     * Función para listar escuela dado el codigo del municipio
     */
    public function index($cdgo_municipio)
    {
        $escuelas = Escuela::where('cdgo_municipio', $cdgo_municipio)
            ->whereNotNull('poblado')  // Asegura que solo escuelas con 'poblado' se incluyan
            ->get(['id', 'nombre', 'subsistema', 'poblado']);
    
        if ($escuelas->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron las escuelas',
                'status' => 404
            ], 404);
        }
    
        $escuelasFormatted = $escuelas->map(function ($escuela) {
            return [
                'label' => "{$escuela->nombre} / {$escuela->subsistema} / {$escuela->poblado}",
                'value' => (string) $escuela->id  // Usamos 'id' como identificador único
            ];
        });
    
        return response()->json($escuelasFormatted, 200);
    }
    

    /**
     * Función guardar nueva escuela en la base de datos
     */
    public function store(Request $request)
    {
        //
    }

    
}
