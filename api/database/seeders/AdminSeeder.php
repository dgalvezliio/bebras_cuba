<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User; // Ajusta según tu modelo
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'nro_ci' => '87081500101',
            'nombre' => 'Bebras',
            'apellidos' => 'Cuba',
            'correo' => 'bebrascuba@uclv.cu',
            'telefono' => '+5358492211',
            'contrasenia' => Hash::make('Bebras2022*'),
            'pin' => '2022',
            'rol' => 'admin',
            'esta_activo' => true
        ]);
        // Otros seeders que necesites
    }
}