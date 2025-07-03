<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Profesor;

class Coordinador extends Model
{
    use HasFactory;

    protected $table = 'coordinadores';

    protected $fillable = [
        'edicion',
        'ci',
    ];

}
