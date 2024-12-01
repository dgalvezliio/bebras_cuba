<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\EstudianteController;

use App\Models\Edicion;
use App\Models\Profesor;
use App\Models\Escuela;
use App\Models\EstudianteEscuela;
use App\Models\ProfesorEstudiante;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
     * Store a newly created resource in storage.
     */
    public function inscribir(Request $request)
    {
        $edicionActual = Edicion::where('abierto', true)->first();  
        if (!$edicionActual) {  
            return response()->json(['message' => 'No hay una edición abierta, por lo que no se puede registrar un nuevo profesor.'], 400);  
        } 
        // Validar los datos de entrada
        $$validatedData = $request->validate([
            'nro_ci' => 'required|string|size:11|unique:estudiantes,nro_ci',
            'nombre' => 'required|string|max:80',
            'sexo' => 'required|in:Masculino,Femenino',
            'id_profesor' => 'required|exists:profesores,id',
            'id_escuela' => 'required|exists:escuelas,id',
            'edicion' => 'required|exists:ediciones,n_edicion',
            'grado' => 'required|integer|min:1|max:12',
        ]);

        try {
            // Crear el estudiante en la tabla 'estudiantes'
            $estudiante = Estudiante::create([
                'nro_ci' => $validatedData['nro_ci'],
                'nombre' => $validatedData['nombre'],
                'sexo' => $validatedData['sexo'],
                'editado' => false,
                'inscrito' => true,
            ]);

            // Registrar la relación en 'profesor_estudiante'
            ProfesorEstudiante::create([
                'id_profesor' => $validatedData['id_profesor'],
                'id_estudiante' => $estudiante->id,
                'edicion' => $edicionActual->n_edicion,
            ]);

            // Registrar la relación en 'estudiante_escuela'
            EstudianteEscuela::create([
                'id_estudiante' => $estudiante->id,
                'id_escuela' => $validatedData['id_escuela'],
                'edicion' => $edicionActual->n_edicion,
                'grado' => $validatedData['grado'],
                'puntuacion' => null,
                'medalla' => null,
            ]);

            return response()->json([
                'message' => 'Estudiante inscrito correctamente',
                'estudiante' => $estudiante,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al inscribir al estudiante',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
//     public function inscribir(Request $request)  
// {  
//     // Validar los datos de entrada  
//     $validatedData = $request->validate([  
//         'nro_ci' => 'required|string|size:11|unique:estudiantes,nro_ci',  
//         'nombre' => 'required|string|max:80',  
//         'sexo' => 'required|in:Masculino,Femenino',  
//         // 'id_escuela' => 'required|exists:escuelas,id',  
//         // 'grado' => 'required|integer|min:1|max:12',  
//     ]);  

//     try {  
//         // // Obtener la edición actual abierta  
//         // $edicionActual = Edicion::where('abierto', true)->first();  
//         // if (!$edicionActual) {  
//         //     return response()->json(['message' => 'No hay una edición abierta, por lo que no se puede inscribir un estudiante.'], 400);  
//         // }  

//         // Crear el estudiante en la tabla 'estudiantes'  
//         $estudiante = Estudiante::create([  
//             'nro_ci' => $validatedData['nro_ci'],  
//             'nombre' => $validatedData['nombre'],  
//             'sexo' => $validatedData['sexo'],  
//             'editado' => false,  
//             'inscrito' => true,  
//             // 'edicion' => $edicionActual->n_edicion,  
//         ]);  

//         // Registrar la relación en 'estudiante_escuela'  
//         // EstudianteEscuela::create([  
//         //     'id_estudiante' => $estudiante->id,  
//         //     'id_escuela' => $validatedData['id_escuela'],  
//         //     'edicion' => $edicionActual->n_edicion,  
//         //     'grado' => $validatedData['grado'],  
//         //     'puntuacion' => null,  
//         //     'medalla' => null,  
//         // ]);  

//         return response()->json([  
//             'message' => 'Estudiante inscrito correctamente',  
//             'estudiante' => $estudiante,  
//         ], 201);  
//     } catch (\Exception $e) {  
//         return response()->json([  
//             'message' => 'Error al inscribir al estudiante',  
//             'error' => $e->getMessage(),  
//         ], 500);  
//     }  
// }
}
