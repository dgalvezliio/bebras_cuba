<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EdicionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ediciones = [
            [
                'n_edicion' => 1,
                'a_edicion' => 2022,
                'fecha_convocatoria' => '12-11-2022',
                'fecha_inic_preinscrip' => '25-11-2022',
                'fecha_fin_preinscrip' => '05-12-2022',
                'fecha_inic_inscripVille' => '12-12-2022',
                'fecha_inic_realiz' => '13-12-2022',
                'fecha_fin_realiz' => '23-12-2022',
                'fecha_resultados' => '06-01-2023',
                'abierto' => false,
            ],
            [
                'n_edicion' => 2,
                'a_edicion' => 2023,
                'fecha_convocatoria' => '07-11-2023',
                'fecha_inic_preinscrip' => '07-11-2023',
                'fecha_fin_preinscrip' => '29-11-2023',
                'fecha_inic_inscripVille' => '01-12-2023',
                'fecha_inic_realiz' => '04-12-2023',
                'fecha_fin_realiz' => '05-12-2023',
                'fecha_resultados' => '22-01-2024',
                'abierto' => false,
            ],
        ];

        foreach ($ediciones as $edicion) {
            DB::table('ediciones')->insert($edicion);
        }
    }
}