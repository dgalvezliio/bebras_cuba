<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recurso extends Model
{
    use HasFactory;

    protected $table = 'recurso';

    protected $fillable = [
        'fecha',
        'codigo',
        'nro_llamado',
        'cdgo_convoc'
    ];
}
