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

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


/**
 * @arg: Rutas para Provincia, Municipio y Escuelas
 * @auth: Rui Sergio Mané
 */

// Ruta para listar provincias
Route::get('/provincias', [ProvinciaController::class, 'index'])->name('provincias.index');  

// Ruta para listar municipios de una provincia en especifico
Route::get('/municipios/{cdgo_provincia}', [MunicipioController::class, 'index'])->name('municipios.index');

// Ruta para lista escuelas de un municipio en especifico 
Route::get('/escuelas/{cdgo_municipio}', [EscuelaController::class, 'index'])->name('escuelas.index');

/**
 * @arg: Rutas para [Profesor]
 * @auth: Rui Sergio Mané
 */

// Ruta para listar profesores (GET)
Route::get('/profesores', [ProfesorController::class, 'index'])->name('profesores.index');

// Ruta para registrar un profesor (POST)
Route::post('/profesores', [ProfesorController::class, 'registrarProfesor']);

// Ruta para actualizar un profesor (PUT)
Route::put('/profesores/{id}', [ProfesorController::class, 'actualizar'])->name('profesores.actualizar');    

/**
 * @arg: Rutas para [Estudiante]
 * @auth: Rui Sergio Mané
 */
// Ruta para listar estudiantes (GET)
Route::get('/estudiantes', [EstudianteController::class, 'index'])->name('estudiantes.index');

// Ruta para registrar un estudiante (POST)
Route::post('/estudiantes/inscribir', [EstudianteController::class, 'inscribir'])->name('estudiantes.inscribir');

// Ruta para inscribir un estudiante por un profesor
// Route::post('/estudiantes/inscribir', [EstudianteController::class, 'inscribir'])->middleware('auth:sanctum');

// Ruta para actualizar un estudiante (PUT)
Route::put('/estudiantes/{id}', [EstudianteController::class, 'update'])->name('estudiantes.update'); 

/**
 * @arg: Rutas para Recurso
 * @auth: Rui Sergio Mané
 */

// Ruta para guardar archivo 
Route::post('/recursos', [RecursoController::class, 'store']); 

/**
 * @arg: Rutas para Edición
 * @auth: Rui Sergio Mané
 */

// Ruta para abrir edición
Route::post('/ediciones/abrir', [EdicionController::class, 'abrirEdicion'])->name('ediciones.abrir');

// Ruta para cerrar edición
Route::post('/ediciones/cerrar', [EdicionController::class, 'cerrarEdicion'])->name('ediciones.cerrar');
