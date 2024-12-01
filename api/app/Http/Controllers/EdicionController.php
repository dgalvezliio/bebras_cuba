<?php

namespace App\Http\Controllers;

use App\Models\Edicion;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Profesor;
use App\Models\Estudiante;

class EdicionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
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
     * Display a listing of the resource.
     */
    
    public function abrirEdicion()  
    {  
        // Verificar si ya hay una edición abierta  
        $edicionActual = Edicion::where('abierto', true)->first();  
        if ($edicionActual) {  
            return response()->json(['message' => 'Ya hay una edición abierta.'], 400);  
        }  
    
        // Obtener el número de la siguiente edición  
        $ultimaEdicion = Edicion::orderBy('n_edicion', 'desc')->first();  
        $n_edicion = $ultimaEdicion ? $ultimaEdicion->n_edicion + 1 : 3; // Dado que estamos en la edición 3 actualmente  
        $a_edicion = date('Y'); // Año actual  
    
        // Crear la nueva edición  
        $nuevaEdicion = new Edicion([  
            'n_edicion' => $n_edicion,  
            'a_edicion' => $a_edicion,  
            'fecha_inic_inscrip' => now(),  
            'abierto' => true,  
        ]);  
        $nuevaEdicion->save();  

        $profesoresActivos = Profesor::where('esta_activo', false)->get();  
        if ($profesoresActivos) {  
            $profesoresActivos->each(function ($profesor) {  
                $profesor->update([  
                    'esta_activo' => true,  
                ]);  
            });  
        } else {  
            return response()->json(['message' => 'No hay profesores activos para cerrar la edición.'], 200);  
        } 
    
        // Permitir que los usuarios (profesores) puedan iniciar sesión  
        // Aquí debes agregar la lógica para permitir el inicio de sesión de los profesores  
    
        return response()->json(['message' => 'Edición abierta exitosamente.'], 200);  
    }
    
    /**
     * Display a listing of the resource.
     */

    public function cerrarEdicion()  
    {  
        $edicionActual = Edicion::where('abierto', true)->first();  
    
        if (!$edicionActual) {  
            return response()->json(['message' => 'No hay edición abierta para cerrar.'], 404);  
        }  
    
        // Actualizar la edición a cerrada  
        $edicionActual->update([  
            'abierto' => false,  
        ]);  
    
        // Actualizar el estado de los profesores a inactivos  
        $profesoresActivos = Profesor::where('esta_activo', true)->get();  
        if ($profesoresActivos->count() > 0) {  
            $profesoresActivos->each(function ($profesor) {  
                $profesor->update([  
                    'esta_activo' => false,  
                ]);  
            });  
        } else {  
            return response()->json(['message' => 'No hay profesores activos para cerrar la edición.'], 200);  
        }  

        $profesoresNuevos = Profesor::where('es_nuevo', true)->get();
        if ($profesoresNuevos->count() > 0) {
            $profesoresNuevos->each(function ($prof) {
                $prof->update([
                    'es_nuevo' => false,
                ]);
            });
        } else {  
            return response()->json(['message' => 'No hay nuevos profesores registrados en esta edición.'], 200);  
        }  
    
        // Actualizar el estado de los estudiantes a no inscritos  
        $estudiantesInscritos = Estudiante::where('inscrito', true)->get();  
        if ($estudiantesInscritos->count() > 0) {  
            $estudiantesInscritos->each(function ($estudiante) {  
                $estudiante->update([  
                    'inscrito' => false,  
                ]);  
            });  
        } else {  
            return response()->json(['message' => 'No hay estudiantes inscritos para cerrar la edición.'], 200);  
        }  
    
        return response()->json(['message' => 'Edición cerrada exitosamente.'], 200);  
    }
}
