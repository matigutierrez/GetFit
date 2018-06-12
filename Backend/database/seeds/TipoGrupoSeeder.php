<?php

use Illuminate\Database\Seeder;

class TipoGrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_tipo_grupo')->insert([
            ['tgr_nombre' => 'Servicio Personal Training', 'tgr_color' => '#bdbdbd'],
            ['tgr_nombre' => 'Grupo de 12 Clases Mensuales', 'tgr_color' => '#ec407a'],
            ['tgr_nombre' => 'Grupo de 8 Clases Mensuales', 'tgr_color' => '#ab47bc'],
            ['tgr_nombre' => 'Grupos de Nivel Avanzado', 'tgr_color' => '#e91e63'],
            ['tgr_nombre' => 'Clase Extra', 'tgr_color' => '#ce93d8'],
            ['tgr_nombre' => 'Clase Recuperativa', 'tgr_color' => '#64b5f6'],
            ['tgr_nombre' => 'Clase Recuperativa (Fin de Semana)', 'tgr_color' => '#81c784'],
            ['tgr_nombre' => 'Clase de Baile', 'tgr_color' => '#fff176']
        ]);
    }
}
