<?php

namespace App\Http\Controllers;

use App\Models\Profesor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ProfesorController;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\MunicipioController;

use App\Models\ProfesorEscuela;
use App\Models\Edicion;
use App\Models\User;

class ProfesorController extends Controller
{
    /**
     * Listar profesores ya registrado.
     */
    public function index() {
        //
        $profesor = Profesor::all();

        if ($profesor -> isEmpty()) {
            $data = [
                'message' => 'No se encontraron los profesores',
                'status' => 404
            ];
            return response() -> json($data, 404);
        }
        return response() -> json($profesor, 200);
    }

    /**
     * Registrar nuevo profesor en la base de datos.
     */
    // public function registrarProfesor(Request $request)  {    
        
    //     $validator = Validator::make($request->all(), [  
    //         'nro_ci' => 'required|unique:profesores,nro_ci',  
    //         'nombre' => 'required',  
    //         'apellidos' => 'required',  
    //         'correo' => 'required|email|unique:profesores,correo',  
    //         'telefono' => 'required|unique:profesores,telefono',  
    //     ], [
    //         'nro_ci.unique' => 'Ya existe una persona con este número de CI',
    //         'correo.unique' => 'Este correo ya está registrado',
    //         'telefono.unique' => 'Este número de teléfono ya está registrado',
    //     ]);
    
    //     if ($validator->fails()) {  
    //         $data = [  
    //             'message' => 'Error en la validación de datos',  
    //             'errors' => $validator->errors(),  
    //             'status' => 400  
    //         ];  
    //         return response()->json($data, 400);  
    //     }  
        
    //     $profesores = Profesor::create([  
    //         'nro_ci' => $request->input('nro_ci'),  
    //         'nombre' => $request->input('nombre'),  
    //         'apellidos' => $request->input('apellidos'),  
    //         'correo' => $request->input('correo'),  
    //         'telefono' => $request->input('telefono'),   
    //         'es_nuevo' => true,       // Valor inicial para nuevo profesor
    //         'perfil_editado' => false, // Valor inicial perfil nuevo profesor
    //         'esta_activo' => false     // Valor inicial de estado del profesor
    //     ]); 
    
    //     if (!$profesores) {  
    //         $data = [  
    //             'message' => 'Error al crear el profesor',  
    //             'status' => 500  
    //         ];  
    //         return response()->json($data, 500);  
    //     }  
    
    //     $data = [  
    //         'profesor' => $profesores,  
    //         'status' => 201,
    //         'message' => 'Profesor registrado con éxito'
    //     ];  
    
    //     return response()->json($data, 201);   
    // }

    public function registrarProfesor(Request $request)  
    {  
        // Validar que haya una edición abierta  
        $edicionActual = Edicion::where('abierto', true)->first();  
        if (!$edicionActual) {  
            return response()->json(['message' => 'No hay una edición abierta, por lo que no se puede registrar un nuevo profesor.'], 400);  
        }  

        // Validar los datos del profesor  
        $validatedData = $request->validate([  
            'nro_ci' => 'required|string|max:11|unique:profesores',  
            'nombre' => 'required|string|max:30',  
            'apellidos' => 'required|string|max:50',  
            'correo' => 'required|email|max:50|unique:profesores,correo|unique:users,email',  
            'telefono' => 'required|string|max:15',  
            'escuela_id' => 'required|exists:escuelas,id',  
            'password' => 'required|string|min:8',  
        ]);  

        // Crear el usuario  
        $user = User::create([  
            'name' => $validatedData['nombre'] . ' ' . $validatedData['apellidos'],  
            'email' => $validatedData['correo'],  
            'password' => bcrypt($validatedData['password']),  
        ]);  

        // Crear el profesor  
        $profesor = Profesor::create([  
            'nro_ci' => $validatedData['nro_ci'],  
            'nombre' => $validatedData['nombre'],  
            'apellidos' => $validatedData['apellidos'],  
            'correo' => $validatedData['correo'],  
            'telefono' => $validatedData['telefono'],  
            'es_nuevo' => true,  
            'perfil_editado' => false,  
            'esta_activo' => false, // El profesor no estará activo hasta que el coordinador lo active  
            'user_id' => $user->id, // Asociar el profesor al usuario  
        ]);  

        // Crear la relación entre el profesor y la escuela  
        $profesorEscuela = ProfesorEscuela::create([  
            'edicion' => $edicionActual->n_edicion,  
            'id_escuela' => $validatedData['escuela_id'],  
            'id_profesor' => $profesor->id,  
        ]);  

        return response()->json(['message' => 'Profesor registrado exitosamente.'], 201);  
    }
    /**
     * Actualizar un profesor en especifico ya registrado.
     */
    public function actualizar(Request $request, $id)  {
        // Validar campos permitidos
        $validator = Validator::make($request->all(), [  
            'correo' => 'email|unique:profesors,correo,' . $id,  
            'telefono' => 'unique:profesors,telefono,' . $id,  
            'provincia' => 'nullable|string',  
            'municipio' => 'nullable|string',  
            'escuela' => 'nullable|string',  
            'esta_activo' => 'boolean',  
        ], [
            'correo.unique' => 'Este correo ya está registrado por otro profesor',
            'telefono.unique' => 'Este número de teléfono ya está registrado por otro profesor',
        ]);

        if ($validator->fails()) {  
            $data = [  
                'message' => 'Error en la validación de datos',  
                'errors' => $validator->errors(),  
                'status' => 400  
            ];  
            return response()->json($data, 400);  
        }  

        $profesor = Profesor::find($id);
        
        if (!$profesor) {
            return response()->json(['message' => 'Profesor no encontrado', 'status' => 404], 404);
        }

        // Actualizar solo los campos permitidos
        $profesor->update([
            'correo' => $request->input('correo', $profesor->correo),
            'telefono' => $request->input('telefono', $profesor->telefono),
            'provincia' => $request->input('provincia', $profesor->provincia),
            'municipio' => $request->input('municipio', $profesor->municipio),
            'escuela' => $request->input('escuela', $profesor->escuela),
            'esta_activo' => $request->input('esta_activo', $profesor->esta_activo),
        ]);

        $data = [
            'profesor' => $profesor,
            'message' => 'Datos del profesor actualizados con éxito',
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
