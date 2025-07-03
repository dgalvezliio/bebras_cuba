<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash; // Asegúrate de que esta línea esté incluida
use Illuminate\Support\Facades\DB;
use App\Models\Profesor;
use App\Models\ProfesorEscuela;
use App\Models\Edicion;
use App\Models\Escuela;
use App\Models\User;
use App\Models\Estudiante;
use App\Models\ProfesorEstudiante;
use Illuminate\Support\Facades\Mail;  

class ProfesorController extends Controller
{
    // función para registrar un profesor
    public function registrarProfesor(Request $request) {
        
        $edicionActual = Edicion::where('abierto', true)->first(); 
        if (!$edicionActual) { 
            return response()->json(['message' => 'No hay una edición abierta, no se puede registrar un nuevo profesor.'], 400); 
        }

        $validator = Validator::make($request->all(), [  
            'nro_ci' => 'required|unique:profesores,nro_ci',  
            'nombre' => 'required',  
            'apellidos' => 'required',  
            'correo' => 'required|email|unique:profesores,correo',  
            'telefono' => 'required|unique:profesores,telefono',  
            'contrasenia' => 'required',
            'pin' => 'required',
            'id_escuela' => 'required|exists:escuelas,id',
        ], [
            'nro_ci.unique' => 'Ya existe una persona con este número de CI',
            'correo.unique' => 'Este correo ya está registrado',
            'telefono.unique' => 'Este número de teléfono ya está registrado',
            'id_escuela.required' => 'El campo id_escuela es obligatorio',  
            'id_escuela.exists' => 'El id_escuela proporcionado no existe en la base de datos',  
        ]);
    
        if ($validator->fails()) {  
            $data = [  
                'message' => 'Error en la validación de datos',  
                'errors' => $validator->errors(),  
                'status' => 400  
            ];  
            return response()->json($data, 400);
        }  
        
        $profesor = Profesor::create([  
            'nro_ci' => $request->input('nro_ci'),  
            'nombre' => $request->input('nombre'),  
            'apellidos' => $request->input('apellidos'),  
            'correo' => $request->input('correo'),  
            'telefono' => $request->input('telefono'),   
            'es_nuevo' => true,       // Valor inicial para nuevo profesor
            'perfil_editado' => false, // Valor inicial perfil nuevo profesor
            'esta_activo' => false     // Valor inicial de estado del profesor
        ]); 

        $user = User::create([
            'ci' => $request->input('nro_ci'),
            'correo' => $request->input('correo'),
            'contrasenia' => bcrypt($request->input('contrasenia')),
            'rol' => 'profesor',
            'pin' => bcrypt($request->input('pin')),
        ]);

        $profesorEscuela = ProfesorEscuela::create([
            'edicion' => $edicionActual->n_edicion,
            'id_escuela' => $request->input('id_escuela'),
            'id_profesor' => $profesor->id,
        ]);
        

        $data = [  
            'profesor' => $profesor,  
            'usuario' => $user,  
            'profesor_escuela' => $profesorEscuela,
            'status' => 201,  
            'message' => 'Profesor y usuario registrados con éxito'  
        ];  

        return response()->json($data, 201);   
    }
    // función para actualizar dato del profesor
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
    //función para listar estudiantes que pertenecen a un profesor
    public function listarEstudiantes($id_profesor) {
        $estudiantes = DB::table('profesores')
            ->where('profesores.id', $id_profesor)
            ->join('profesor_estudiante', 'profesores.id', '=', 'profesor_estudiante.id_profesor')
            ->join('estudiantes', 'profesor_estudiante.id_estudiante', '=', 'estudiantes.id')
            ->join('estudiante_escuela', 'estudiantes.id', '=', 'estudiante_escuela.id_estudiante')
            ->join('escuelas', 'estudiante_escuela.id_escuela', '=', 'escuelas.id')
            ->join('categorias', function ($join) {
                $join->on('estudiante_escuela.grado', '>=', 'categorias.grado_inferior')
                    ->on('estudiante_escuela.grado', '<=', 'categorias.grado_superior');
            })
            ->select(
                'estudiantes.id',
                'estudiantes.nombre as nombre_estudiante',
                'escuelas.nombre as nombre_escuela',
                'estudiantes.sexo',
                'estudiante_escuela.grado',
                'categorias.nombre_cuba as categoria'
            )
            ->get();
        return $estudiantes;
    }
    // función para cambiar la contraseña del profesor
    public function cambiarContrasenia(Request $request, $userId) {
        // 
        $request->validate([
            'contrasenia' => 'required|string',
        ]);

        $user = User::findOrFail($userId);
        $profesor = Profesor::findOrFail($userId);

        $user->update([
            'contrasenia' => $request->contrasenia,
        ]);

        $profesor->update([
            'perfil_editado' => true,
        ]);
    }
    // función para cambiar el pin del profesor
    public function cambiarPin(Request $request, $userId) {
        // 
        $request->validate([
            'pin' => 'required|string',
        ]);

        $user = User::findOrFail($userId); 
        $profesor = Profesor::findOrFail($userId); 

        $user->update([
            'pin' => $request->pin,
        ]);

        $profesor->update([
            'perfil_editado' => true,
        ]);
    }
    // función para cambiar el correo del profesor
    public function cambiarCorreo(Request $request, $profesorId) {
        // 
        $request->validate([
            'correo' => 'required|string',
        ]);

        $profesor = Profesor::findOrFail($profesorId);

        $profesor->update([
            'correo' => $request->correo,
            'perfil_editado' => true,
        ]);
    }
    // función para cambiar el número del telefono
    public function cambiarNroTelefono(Request $request, $profesorId) {
        // 
        $request->validate([
            'telefono' => 'required|string',
        ]);

        $profesor = Profesor::findOrFail($profesorId);

        $profesor->update([
            'telefono' => $request->telefono,
            'perfil_editado' => true,
        ]);
    }
    // función para verificar el carnet 
    public function verificarCI($nro_ci){

        $user = User::where('ci', $nro_ci)->first();

        if (!$user) {
            return response()->json(['message' => 'Numero de carnet no fue encontrado', 'status' => 404], 404);
        }

        $data = [
            'message' => 'Numero de carnet encontrado',
            'user' => $user,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
    // función para verificar el pin
    public function verificarPin(Request $request) {  
        $request->validate([
            'ci' => 'required|string',
            'pin' => 'required|string',
        ]);

        $user = User::where('ci', $request->ci)->first();
        
        if (!$user || !Hash::check($request->pin, $user->pin)) {
            return response()->json(['message' => 'El pin del usuario no coencide'], 401);
        }
    
        // Si el PIN es correcto  
        $data = [  
            'message' => 'Pin del usuario coencide',  
            'user' => $user,  
            'status' => 200  
        ];  
            
        return response()->json($data, 200);  
    }
    // función para enviar el link de registro
    public function enviarLinkRegistro(Request $request) {  
        // Validar el correo electrónico  
        $validated = $request->validate([  
            'email' => 'required|email',  
        ]);  

        // URL de registro  
        $registrationUrl = 'http://localhost:5173/registro';  
        $email = $validated['email'];  

        try {  
            // Enviar el correo electrónico  
            Mail::send([], [], function ($message) use ($email, $registrationUrl) {  
                $message->to($email)  
                        ->from('bebrascuba@uclv.cu', env('APP_NAME'))  
                        ->subject('Registro en el sistema')  
                        ->text("Hola, utiliza este enlace para registrarte: $registrationUrl");  
            });  

            return response()->json(['message' => 'Correo enviado con éxito'], 200);  
        } catch (\Exception $e) {  
            // Manejar errores al enviar el correo  
            return response()->json(['message' => 'Error al enviar el correo: ' . $e->getMessage()], 500);  
        }  
    }  
    // función para actualizar la imagen
    public function uploadPhoto(Request $request, $id) {
        $request->validate([
            'foto_perfil' => 'required|image|mimes:jpeg,png|max:2048',
        ]);

        $profesor = Profesor::findOrFail($id);

        // Eliminar foto anterior si existe (excepto la por defecto)
        if ($profesor->foto_perfil && !str_contains($profesor->foto_perfil, 'github.com')) {
            Storage::delete($profesor->foto_perfil);
        }

        $path = $request->file('foto_perfil')->store('profesores/fotos', 'public');
        $profesor->foto_perfil = $path;
        $profesor->save();

        return response()->json([
            'success' => true,
            'path' => asset("storage/$path")
        ]);
    }
    // funcion para eliminar la foto
    public function deletePhoto($id) {
        $profesor = Profesor::findOrFail($id);

        if ($profesor->foto_perfil && !str_contains($profesor->foto_perfil, 'github.com')) {
            Storage::delete($profesor->foto_perfil);
        }

        $profesor->foto_perfil = null;
        $profesor->save();

        return response()->json([
            'success' => true,
            'path' => 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
        ]);
    }

}
