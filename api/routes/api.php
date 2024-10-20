<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\ProfesorController;
use App\Http\Controllers\EscuelaController;
use App\Http\Controllers\RecursoController;
use App\Http\Controllers\ResultadoController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\EdicionController;
use App\Http\Controllers\CoordMunController;
use App\Http\Controllers\CoordProvController;

// Obtener lista de provincias
Route::get('/provincias', [ProvinciaController::class, 'index']);

// Obtener lista de municipios
Route::get('/municipios', [MunicipioController::class, 'index']);

/**
 * Metodos para gestionar escuela
 */

//  Obtener lista de escuelas 
Route::get('/escuelas', [EscuelaController::class, 'index']);

/** 
 *  Metodos para gestionar profesor 
 * */

// Obtener lista de profesores 
Route::get('/profesores', [ProfesorController::class, 'index']);

// Registrar profesor 
Route::post('/profesores', [ProfesorController::class, 'store']);

// Actualizar datos de un profesor 
Route::put('/profesores/{id}', function() {
    return 'Actualizando profesor';
});

/**
 *  Metodos para gestionar alumnos
 *  */

// Obtener lista de estudiantes
Route::get('/estudiantes', [EstudianteController::class, 'index']);

// Inscribir un estudiante 
Route::post('/estudiantes', [EstudianteController::class, 'store']);

//Obtener lista de recursos
Route::get('/recursos', [RecursoController::class, 'index']);

//Obtener lista de resultados
Route::get('/resultados', [ResultadoController::class, 'index']);

//Obtener lista de convocatorias
Route::get('/convocatorias', [ConvocatoriaController::class, 'index']);

//Obtener lista de historiales
Route::get('/historiales', [HistorialController::class, 'index']);

//Obtener lista de ediciones
Route::get('/ediciones', [EdicionController::class, 'index']);

//Obtener lista de coordinadores municipales
Route::get('/coordmunicipal', [CoordMunController::class, 'index']);
// 
Route::post('/coordmunicipal', [CoordMunController::class, 'store']);

//Obtener lista de coordinadores provinciales
Route::get('/coordprovincial', [CoordProvController::class, 'index']);

//
Route::post('/coordprovincial', [CoordProvController::class, 'store']);
