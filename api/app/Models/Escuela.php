<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Escuela extends Model
{
    use HasFactory;

    protected $table = 'escuela';

    protected $fillable = [
        'codigo',
        'nombre_escuela',
        'telefono',
        'subsistema',
        'municipio',
        'poblado',
        'cdgo_municipio'
    ];
}
