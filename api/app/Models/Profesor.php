<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    use HasFactory;

    protected $table = 'profesor';

    protected $fillable = [
        'ci',
        'nombre',
        'apellidos',
        'correo',
        'telefono',
        'provincia',
        'municipio',
        'escuela',
        'contrasenia'
    ];
}
