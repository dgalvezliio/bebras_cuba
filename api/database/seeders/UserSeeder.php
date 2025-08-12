<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuario base tipo Profesor
        $userId = DB::table('users')->insertGetId([
            'ci' => '22101500202',
            'nombre' => 'Bebras',
            'apellidos' => 'Cuba',
            'telefono' => '+53 58492211',
            'correo' => 'bebrascuba@uclv.cu',
            'contrasenia' => Hash::make('12345678'),
            'pin' => Hash::make('2022'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Buscar rol Profesor
        $rolId = DB::table('roles')->where('rol', 'Profesor')->value('id');
        if ($rolId) {
            DB::table('role_user')->updateOrInsert(
                ['user_id' => $userId, 'rol_id' => $rolId],
                ['created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
