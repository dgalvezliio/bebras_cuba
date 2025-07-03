<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResultadoProvinciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $resultados = [
// Datos para la edición número 1
//prov P del R
            ['id_edicion' => 1, 'id_provincia' => 1, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 1, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 1, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 1, 'id_categoria' => 6, 'cantidad' => 3], // Senior
//prov I de la J
            ['id_edicion' => 1, 'id_provincia' => 16, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 16, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 16, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 16, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov Artemisa
            ['id_edicion' => 1, 'id_provincia' => 2, 'id_categoria' => 3, 'cantidad' => 8], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 2, 'id_categoria' => 4, 'cantidad' => 8], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 2, 'id_categoria' => 5, 'cantidad' => 6], // Junior
            ['id_edicion' => 1, 'id_provincia' => 2, 'id_categoria' => 6, 'cantidad' => 12], // Senior
//prov La H
            ['id_edicion' => 1, 'id_provincia' => 3, 'id_categoria' => 3, 'cantidad' => 9], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 3, 'id_categoria' => 4, 'cantidad' => 2], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 3, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 3, 'id_categoria' => 6, 'cantidad' => 17], // Senior
//prov Mayabeque
            ['id_edicion' => 1, 'id_provincia' => 4, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 4, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 4, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 4, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov Mtzas
            ['id_edicion' => 1, 'id_provincia' => 5, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 5, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 5, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 5, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov VC
            ['id_edicion' => 1, 'id_provincia' => 6, 'id_categoria' => 3, 'cantidad' => 33], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 6, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 6, 'id_categoria' => 5, 'cantidad' => 21], // Junior
            ['id_edicion' => 1, 'id_provincia' => 6, 'id_categoria' => 6, 'cantidad' => 25], // Senior
//prov Cfgos
            ['id_edicion' => 1, 'id_provincia' => 7, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 7, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 7, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 7, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov SS
            ['id_edicion' => 1, 'id_provincia' => 8, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 8, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 8, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 8, 'id_categoria' => 6, 'cantidad' => 1], // Senior
//prov CA
            ['id_edicion' => 1, 'id_provincia' => 9, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 9, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 9, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 9, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov Cam
            ['id_edicion' => 1, 'id_provincia' => 10, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 10, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 10, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 1, 'id_provincia' => 10, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov LT
            ['id_edicion' => 1, 'id_provincia' => 11, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 11, 'id_categoria' => 4, 'cantidad' => 2], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 11, 'id_categoria' => 5, 'cantidad' => 30], // Junior
            ['id_edicion' => 1, 'id_provincia' => 11, 'id_categoria' => 6, 'cantidad' => 43], // Senior
//prov Hol
            ['id_edicion' => 1, 'id_provincia' => 12, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 12, 'id_categoria' => 4, 'cantidad' => 3], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 12, 'id_categoria' => 5, 'cantidad' => 5], // Junior
            ['id_edicion' => 1, 'id_provincia' => 12, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov Granma
            ['id_edicion' => 1, 'id_provincia' => 13, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 13, 'id_categoria' => 4, 'cantidad' => 4], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 13, 'id_categoria' => 5, 'cantidad' => 5], // Junior
            ['id_edicion' => 1, 'id_provincia' => 13, 'id_categoria' => 6, 'cantidad' => 9], // Senior
//prov SCuba
            ['id_edicion' => 1, 'id_provincia' => 14, 'id_categoria' => 3, 'cantidad' => 1], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 14, 'id_categoria' => 4, 'cantidad' => 3], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 14, 'id_categoria' => 5, 'cantidad' => 1], // Junior
            ['id_edicion' => 1, 'id_provincia' => 14, 'id_categoria' => 6, 'cantidad' => 0], // Senior
//prov Gtmo
            ['id_edicion' => 1, 'id_provincia' => 15, 'id_categoria' => 3, 'cantidad' => 22], // Benjam�n
            ['id_edicion' => 1, 'id_provincia' => 15, 'id_categoria' => 4, 'cantidad' => 11], // Cadete
            ['id_edicion' => 1, 'id_provincia' => 15, 'id_categoria' => 5, 'cantidad' => 24], // Junior
            ['id_edicion' => 1, 'id_provincia' => 15, 'id_categoria' => 6, 'cantidad' => 18], // Senior


// Datos para la edición número 2
//prov P del R
            ['id_edicion' => 2, 'id_provincia' => 1, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 1, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 1, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 1, 'id_categoria' => 5, 'cantidad' => 7], // Junior
            ['id_edicion' => 2, 'id_provincia' => 1, 'id_categoria' => 6, 'cantidad' => 17], // Senior
            ['id_edicion' => 2, 'id_provincia' => 1, 'id_categoria' => 7, 'cantidad' => 4], // NOCategoria
//prov I de la J
            ['id_edicion' => 2, 'id_provincia' => 16, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 16, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 16, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 16, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 2, 'id_provincia' => 16, 'id_categoria' => 6, 'cantidad' => 0], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 16, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov Artemisa
            ['id_edicion' => 2, 'id_provincia' => 2, 'id_categoria' => 2, 'cantidad' => 1], // Peque
            ['id_edicion' => 2, 'id_provincia' => 2, 'id_categoria' => 3, 'cantidad' => 11], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 2, 'id_categoria' => 4, 'cantidad' => 4], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 2, 'id_categoria' => 5, 'cantidad' => 7], // Junior
            ['id_edicion' => 2, 'id_provincia' => 2, 'id_categoria' => 6, 'cantidad' => 4], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 2, 'id_categoria' => 7, 'cantidad' => 5], // NOCategoria
//prov La Habana
            ['id_edicion' => 2, 'id_provincia' => 3, 'id_categoria' => 2, 'cantidad' => 3], // Peque
            ['id_edicion' => 2, 'id_provincia' => 3, 'id_categoria' => 3, 'cantidad' => 8], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 3, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 3, 'id_categoria' => 5, 'cantidad' => 3], // Junior
            ['id_edicion' => 2, 'id_provincia' => 3, 'id_categoria' => 6, 'cantidad' => 8], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 3, 'id_categoria' => 7, 'cantidad' => 6], // NOCategoria
//prov Mayabeque
            ['id_edicion' => 2, 'id_provincia' => 4, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 4, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 4, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 4, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 2, 'id_provincia' => 4, 'id_categoria' => 6, 'cantidad' => 0], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 4, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov Mtzas
            ['id_edicion' => 2, 'id_provincia' => 5, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 5, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 5, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 5, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 2, 'id_provincia' => 5, 'id_categoria' => 6, 'cantidad' => 0], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 5, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov VC
            ['id_edicion' => 2, 'id_provincia' => 6, 'id_categoria' => 2, 'cantidad' => 16], // Peque
            ['id_edicion' => 2, 'id_provincia' => 6, 'id_categoria' => 3, 'cantidad' => 30], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 6, 'id_categoria' => 4, 'cantidad' => 39], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 6, 'id_categoria' => 5, 'cantidad' => 58], // Junior
            ['id_edicion' => 2, 'id_provincia' => 6, 'id_categoria' => 6, 'cantidad' => 38], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 6, 'id_categoria' => 7, 'cantidad' => 152], // NOCategoria
//prov Cfgos
            ['id_edicion' => 2, 'id_provincia' => 7, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 7, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 7, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 7, 'id_categoria' => 5, 'cantidad' => 21], // Junior
            ['id_edicion' => 2, 'id_provincia' => 7, 'id_categoria' => 6, 'cantidad' => 17], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 7, 'id_categoria' => 7, 'cantidad' => 8], // NOCategoria

//prov SS
            ['id_edicion' => 2, 'id_provincia' => 8, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 8, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 8, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 8, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 2, 'id_provincia' => 8, 'id_categoria' => 6, 'cantidad' => 0], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 8, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov CA
            ['id_edicion' => 2, 'id_provincia' => 9, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 9, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 9, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 9, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 2, 'id_provincia' => 9, 'id_categoria' => 6, 'cantidad' => 0], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 9, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov Camaguey
            ['id_edicion' => 2, 'id_provincia' => 10, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 10, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 10, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 10, 'id_categoria' => 5, 'cantidad' => 0], // Junior
            ['id_edicion' => 2, 'id_provincia' => 10, 'id_categoria' => 6, 'cantidad' => 0], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 10, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov LT
            ['id_edicion' => 2, 'id_provincia' => 11, 'id_categoria' => 2, 'cantidad' => 1], // Peque
            ['id_edicion' => 2, 'id_provincia' => 11, 'id_categoria' => 3, 'cantidad' => 2], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 11, 'id_categoria' => 4, 'cantidad' => 51], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 11, 'id_categoria' => 5, 'cantidad' => 27], // Junior
            ['id_edicion' => 2, 'id_provincia' => 11, 'id_categoria' => 6, 'cantidad' => 3], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 11, 'id_categoria' => 7, 'cantidad' => 84], // NOCategoria
//prov Holguin
            ['id_edicion' => 2, 'id_provincia' => 12, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 12, 'id_categoria' => 3, 'cantidad' => 3], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 12, 'id_categoria' => 4, 'cantidad' => 11], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 12, 'id_categoria' => 5, 'cantidad' => 1], // Junior
            ['id_edicion' => 2, 'id_provincia' => 12, 'id_categoria' => 6, 'cantidad' => 3], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 12, 'id_categoria' => 7, 'cantidad' => 2], // NOCategoria
//prov Granma
            ['id_edicion' => 2, 'id_provincia' => 13, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 13, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 13, 'id_categoria' => 4, 'cantidad' => 2], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 13, 'id_categoria' => 5, 'cantidad' => 9], // Junior
            ['id_edicion' => 2, 'id_provincia' => 13, 'id_categoria' => 6, 'cantidad' => 8], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 13, 'id_categoria' => 7, 'cantidad' => 9], // NOCategoria
//prov SCuba
            ['id_edicion' => 2, 'id_provincia' => 14, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 14, 'id_categoria' => 3, 'cantidad' => 0], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 14, 'id_categoria' => 4, 'cantidad' => 0], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 14, 'id_categoria' => 5, 'cantidad' => 4], // Junior
            ['id_edicion' => 2, 'id_provincia' => 14, 'id_categoria' => 6, 'cantidad' => 2], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 14, 'id_categoria' => 7, 'cantidad' => 0], // NOCategoria
//prov Guantanamo
            ['id_edicion' => 2, 'id_provincia' => 15, 'id_categoria' => 2, 'cantidad' => 0], // Peque
            ['id_edicion' => 2, 'id_provincia' => 15, 'id_categoria' => 3, 'cantidad' => 2], // Benjam�n
            ['id_edicion' => 2, 'id_provincia' => 15, 'id_categoria' => 4, 'cantidad' => 1], // Cadete
            ['id_edicion' => 2, 'id_provincia' => 15, 'id_categoria' => 5, 'cantidad' => 8], // Junior
            ['id_edicion' => 2, 'id_provincia' => 15, 'id_categoria' => 6, 'cantidad' => 9], // Senior
		 ['id_edicion' => 2, 'id_provincia' => 15, 'id_categoria' => 7, 'cantidad' => 2] // NOCategoria
        ]; 
        foreach ($resultados as $resultado) {
            DB::table('resultados_provincias')->insert($resultado);
        }
    }
}



