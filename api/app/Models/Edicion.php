<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Edicion extends Model
{
    use HasFactory;
    
    protected $table = 'ediciones';

    protected $fillable = [
        'n_edicion',
        'a_edicion',
        'fecha_inic_inscrip',
        'fecha_fin_inscrip',
        'fecha_inic_realiz',
        'fecha_fin_realiz',
        'abierto',
    ];
}
