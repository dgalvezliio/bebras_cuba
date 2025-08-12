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
                'email' => 'dgalvez@uclv.edu.cu', // Aquí se corrige la estructura
                'password' => bcrypt('dgvezli*7.'), // Asegúrate de encriptar la contraseña
                'rol' => 'coord_nacional',
            ],
        ];
        foreach ($users as $user) {
            DB::table('users')->insert($user);
        }
    }
}
