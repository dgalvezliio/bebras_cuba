<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoordProvincial extends Model
{
    use HasFactory;

    protected $table = 'coordprovincial';

    protected $fillable = [
        'nombre',
        'apellidos',
        'correo',
        'contacto',
        'cdgo_provincia',
        'contrasenia',
        'ci'
    ];
}
