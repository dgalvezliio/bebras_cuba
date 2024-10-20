<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $table = 'estudiante';

    protected $fillable = [
        'nro_ci',
        'nombre',
        'grado',
        'genero',
        'puntuacion',
        'cdgo_profesor',
        'cdgo_escuela'
    ];
}
