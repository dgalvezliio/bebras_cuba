<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'nro_ci' => '22101500202',
                'nombre' => 'Bebras',
                'apellidos' => 'Cuba',
                'telefono' => '+53 58492211',
                'email' => 'bebrascuba@uclv.cu', // Aquí se corrige la estructura
                'rol' => 'admin',
                'esta_activo' => true,
                'pin' => '2022',
            ],
        ];
        foreach ($users as $user) {
            DB::table('users')->insert($user);
        }
    }
}
