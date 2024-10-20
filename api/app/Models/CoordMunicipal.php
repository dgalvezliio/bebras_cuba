<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoordMunicipal extends Model
{
    use HasFactory;

    protected $table = 'coordmunicipal';

    protected $fillable = [
        'ci',
        'nombre',
        'apellidos',
        'correo',
        'contacto',
        'contrasenia',
        'cdgo_municipio'
    ];
}
