<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\EscuelaController;
use App\Http\Controllers\ProfesorController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\RecursoController;
use App\Http\Controllers\EdicionController; 
use App\Http\Controllers\UserController; 
use App\Http\Controllers\CoordinadorController; 
use App\Http\Controllers\CategoriaController; 
use App\Http\Controllers\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
});
// Route::get('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Route::post('/login', [UserController::class, 'login']);

// Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// Route::post('/registrar-usuario', [AuthController::class, 'registrarUsuario']);

/**
 * @arg: Solicituds para Provincia, Municipio y Escuelas
 * @auth: Rui Sérgio Mané
 */

// Solicitud para listar provincias
Route::get('/provincias', [ProvinciaController::class, 'index'])->name('provincias.index');  

// Solicitud para listar municipios de una provincia en especifico
Route::get('/municipios/{cdgo_provincia}', [MunicipioController::class, 'index'])->name('municipios.index');

Route::get('/categorias', [CategoriaController::class, 'listarCategorias']);

// Solicitud para lista escuelas de un municipio en especifico 
Route::get('/escuelas/{cdgo_municipio}', [EscuelaController::class, 'index'])->name('escuelas.index');

/**
 * @arg: Solicitudes para [Profesor]
 * @auth: Rui Sérgio Mané
 */

// Solicitud para listar profesores (GET)
Route::get('/profesores', [ProfesorController::class, 'index'])->name('profesores.index');

// Solicitud para registrar un profesor (POST)
Route::post('/registrar-profesor', [ProfesorController::class, 'registrarProfesor']);

// Solicitud para actualizar un profesor (PUT)
Route::put('/profesores/{id}', [ProfesorController::class, 'actualizar'])->name('profesores.actualizar');  

// Solicitud para registrar usuario (POST)
Route::post('/registrar-usuario', [ProfesorController::class, 'registrarUsuario']);

// Solicitud para listar estudiantes de un profesor (GET)
Route::get('/listar-estudiantes/{id_profesor}', [ProfesorController::class, 'listarEstudiantes']);

// Solicitud para cambiar la contrasenia (PUT)
Route::put('/cambiar-contrasenia/{id_profesor}', [ProfesorController::class, 'cambiarContrasenia']);

// Solicitud para cambiar el pin (PUT) 
Route::put('/cambiar-pin/{id_profesor}', [ProfesorController::class, 'cambiarPin']);

// Solicitud para cambiar el pin (PUT) 
Route::put('/cambiar-correo/{id_profesor}', [ProfesorController::class, 'cambiarCorreo']);

// Solicitud para cambiar el numero de telefono (PUT) 
Route::put('/cambiar-telefono/{id_profesor}', [ProfesorController::class, 'cambiarNroTelefono']);

// 
Route::get('/comprobar-ci/{nro_ci}', [ProfesorController::class, 'verificarCI']);

// 
Route::post('/comprobar-pin', [ProfesorController::class, 'verificarPin']);

Route::post('/enviar-link-registro', [ProfesorController::class, 'enviarLinkRegistro']);
/**
 * @arg: Solicituds para [Estudiante]
 * @auth: Rui Sérgio Mané
 */

// Solicitud para registrar un estudiante (POST)
Route::post('/estudiantes/inscribir', [EstudianteController::class, 'inscribir'])->name('estudiantes.inscribir');

/**
 * @arg: Solicituds para [Recurso]
 * @auth: Rui Sérgio Mané
 */

// Solicitud para guardar archivo 
Route::post('/recursos', [RecursoController::class, 'guardarArchivo']); 

// Solicitud para listar recursos 
Route::get('/listar-recursos', [RecursoController::class, 'listarRecursos']); 

// Solicitud para descargar recurso
Route::get('/descargar-recurso/{archivo}', [RecursoController::class, 'descargarRecurso']);

// Solicitud para eliminar recurso
Route::delete('/eliminar-recurso/{id_recurso}', [RecursoController::class, 'eliminarRecurso']);

/**
 * @arg: Solicitudes para [Edición]
 * @auth: Rui Sérgio Mané
 */

// Solicitud para abrir edición
Route::post('/ediciones/abrir', [EdicionController::class, 'abrirEdicion'])->name('ediciones.abrir');

// Solicitud para cerrar edición
Route::post('/ediciones/cerrar', [EdicionController::class, 'cerrarEdicion'])->name('ediciones.cerrar');

// Solicitud para saber si una edición esta abierta o no 
Route::get('/edicion/esta-abierta', [EdicionController::class, 'isEditionOpen']);

// Solicitud para actualizar fecha de edición
Route::put('/actualizar-fecha', [EdicionController::class, 'marcarFechasEdicion']);

// Solicitud para actualizar fecha de edición
Route::put('/actualizar-fecha-import', [EdicionController::class, 'marcarFechasImportantes']);

// Solicitud para listar los resultados 
Route::get('/resultados', [EdicionController::class, 'listarResultadosProvincias']);

// Solicitud para mostrar total por provincia
Route::get('/total-provincias', [EdicionController::class, 'totalCantidadPorProvincia']);

// Solicitud para mostrar total por categoria 
Route::get('/total-categorias', [EdicionController::class, 'totalCantidadPorCategoria']);

// Solicitud para mostrar total de totales de todas las provincia
Route::get('/total-totalprovincia', [EdicionController::class, 'totalTotalPorProvincia']);

// Solicitud para 
Route::get('/listar-edicion-actual', [EdicionController::class, 'listarEdicionActual']);

// 
Route::get('/is-open', [EdicionController::class, 'isEditionOpen']);

// 
Route::get('/nro_edicion', [EdicionController::class, 'nroEdicion']);

/**
 * @arg: Solicituds para [Coordinador]
 * @auth: Rui Sérgio Mané
 */

// Solicitud para aceptar solicitud de profesor 
Route::put('/aceptar-solicitud/{profesorId}', [CoordinadorController::class, 'aceptarSolicitud']);

// Solicitud para listar solicitudes 
Route::get('/solicitudes', [CoordinadorController::class, 'listarSolicitud']);

// Solicitud para ver profesores inactivos 
Route::get('/profesores-inactivos', [CoordinadorController::class, 'listarProfesoresInactivos']);

// Solicitud para listar profesores 
Route::get('/listar-profesores', [CoordinadorController::class, 'listarProfesores']);

/**
 * @arg: Solicituds para [Administrador]
 * @auth: Rui Sérgio Mané
 */

// Solicitud para listar solicitudes 
Route::get('/listar-usuarios', [UserController::class, 'listarUsuarios']);

// Solicitud para registrar usuario como coordinador 
Route::post('/registrar-usuario', [UserController::class, 'registrarUsuario']);

// 
Route::get('/listar-coordinadores', [UserController::class, 'listarNoProfesores']);

// 
Route::get('/listar-roles', [UserController::class, 'listarRoles']);
