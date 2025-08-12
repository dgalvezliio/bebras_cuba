<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['rol' => 'Coordinador Nacional', 'descripcion' => 'Coordinador nacional del concurso', 'estado' => true],
            ['rol' => 'Coordinador Asistente', 'descripcion' => 'Coordinador asistente del concurso', 'estado' => true],
            ['rol' => 'Representantes MINED/MES', 'descripcion' => 'Representantes del MINED o del MES', 'estado' => true],
            ['rol' => 'Representante MINED Provincial', 'descripcion' => 'Representante provincial del MINED', 'estado' => true],
            ['rol' => 'Coordinador provincial', 'descripcion' => 'Coordinador provincial del concurso', 'estado' => true],
            ['rol' => 'Coordinador Municipal', 'descripcion' => 'Coordinador municipal del concurso', 'estado' => true],
            ['rol' => 'Profesor', 'descripcion' => 'Profesor participante', 'estado' => true],
            ['rol' => 'Estudiante', 'descripcion' => 'Estudiante participante', 'estado' => false],
            ['rol' => 'Administrador', 'descripcion' => 'Administrador del sistema', 'estado' => true],
            ['rol' => 'Elaborador Tareas Bebras', 'descripcion' => 'Elaborador de tareas del concurso Bebras', 'estado' => true],
            ['rol' => 'Revisor Tareas Bebras', 'descripcion' => 'Revisor de tareas del concurso Bebras', 'estado' => true],
            ['rol' => 'Colaborador Bebras', 'descripcion' => 'Colaborador del concurso Bebras de cualquier institución (no estudiante universitario)', 'estado' => false],
            ['rol' => 'Colaborador Bebras FEU', 'descripcion' => 'Colaborador Bebras Estudiante Universitario (FEU)', 'estado' => true],
        ];

        foreach ($roles as $rol) {
            DB::table('roles')->insert([
                'rol' => $rol['rol'],
                'descripcion' => $rol['descripcion'],
                'estado' => $rol['estado'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
} 