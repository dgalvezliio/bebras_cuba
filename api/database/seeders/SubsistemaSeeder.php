<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubsistemaSeeder extends Seeder
{
    private $subsistemas = [
        'ESBEC',
        'ESBEC-ETP',
        'ESBEC-IPUEC',
        'ESBEC-IPUEC-ETP',
        'ESBU',
        'ESBU-ETP',
        'ESBU-IPU',
        'ESBU-IPUEC',
        'Esc. Oficios',
        'Especial',
        'ETP',
        'IPU',
        'IPU-ETP',
        'IPVCE',
        'Pedagógica',
        'Primaria Rural',
        'Primaria Rural-ESBU',
        'Primaria Urbana',
        'Primaria Urbana-ESBU'
    ];

    public function run()
    {
        $subsistemasData = [];
        foreach ($this->subsistemas as $subsistema) {
            $subsistemasData[] = [
                'name' => $subsistema,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        DB::table('subsistema_esc')->insert($subsistemasData);
    }
}
