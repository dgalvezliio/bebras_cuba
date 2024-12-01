<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Escuela;
use App\Models\Estudiante;

class Profesor extends Model
{
    use HasFactory;

    protected $table = 'profesores'; // Especifica el nombre correcto de la tabla

    // Define los campos que puedes llenar con asignación masiva
    protected $fillable = [
        'nro_ci',
        'nombre',
        'apellidos',
        'correo',
        'telefono',
        'es_nuevo',
        'perfil_editado',
        'esta_activo'
    ];
    // En el modelo Profesor.php
    public function escuelas()  
    {  
        return $this->belongsToMany(Escuela::class, 'profesor_escuela', 'id_profesor', 'id_escuela')  
                    ->withPivot('edicion');  
    } 

    public function estudiantes()  
    {  
        return $this->belongsToMany(Estudiante::class, 'profesor_estudiante', 'id_profesor', 'id_estudiante')  
                    ->withPivot('edicion');  
    }
}
