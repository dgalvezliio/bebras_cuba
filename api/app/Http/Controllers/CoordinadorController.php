<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profesor;
use App\Models\Edicion;
use App\Models\User;

class CoordinadorController extends Controller
{
    // Función para aceptar la solicitud el profesor
    public function aceptarSolicitud(Request $request, $profesorId) {  
        // Verificar que el profesor exista  
        $profesor = Profesor::findOrFail($profesorId);  

        // Cambiar el estado a activo  
        $profesor->esta_activo = true;  
        $profesor->es_nuevo = false;  

        $profesor->save();  

        // Preparar la respuesta  
        $data = [  
            'message' => 'Profesor activado con éxito',  
            'status' => 200  
        ];   

        return response()->json($data, 200);  
    }
    // Función para listar profesores nuevos y no activos
    public function listarProfesoresInactivos() {  
        $profesores = Profesor::where('esta_activo', false)  
            ->select('profesores.*', 'escuelas.nombre as nombre_escuela', 'escuelas.subsistema', 'escuelas.poblado', 'escuelas.telefono as telefono_escuela')  
            ->join('profesor_escuela', 'profesores.id', '=', 'profesor_escuela.id_profesor')  
            ->join('escuelas', 'profesor_escuela.id_escuela', '=', 'escuelas.id')  
            ->get();  
        return response()->json($profesores);  
    }  
    
    // General tabla de estudiante
    public function generateTable(Request $request) {  
        // Obtener los datos de la solicitud  
        $columns = $request->input('columns', []);  
        $groupByCategory = $request->input('groupByCategory', false);  
        $groupBySex = $request->input('groupBySex', false);  

        // Consulta base  
        $query = Estudiante::query();  

        // Seleccionar columnas  
        if (!empty($columns)) {  
            $query->select($columns);  
        }  

        // Agrupar por categoría  
        if ($groupByCategory) {  
            $query->orderBy('categoria');  
        }  

        // Agrupar por sexo  
        if ($groupBySex) {  
            $query->orderBy('sexo');  
        }  

        // Obtener los datos  
        $estudiantes = $query->get();  

        // Agrupar los datos según las opciones seleccionadas  
        $groupedData = [];  
        if ($groupByCategory && $groupBySex) {  
            $groupedData = $estudiantes->groupBy(['categoria', 'sexo']);  
        } elseif ($groupByCategory) {  
            $groupedData = $estudiantes->groupBy('categoria');  
        } elseif ($groupBySex) {  
            $groupedData = $estudiantes->groupBy('sexo');  
        } else {  
            $groupedData = $estudiantes;  
        }  

        return response()->json([  
            'data' => $groupedData,  
            'columns' => $columns,  
        ]);  
    }  
}