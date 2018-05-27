<?php

use Illuminate\Database\Seeder;

class TipoPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_tipo_plan')->insert([
            ['tpl_nombre' => 'Servicio Personal Training', 'tpl_color' => '#bdbdbd'],
            ['tpl_nombre' => 'Grupo de 12 Clases Mensuales', 'tpl_color' => '#ec407a'],
            ['tpl_nombre' => 'Grupo de 8 Clases Mensuales', 'tpl_color' => '#ab47bc'],
            ['tpl_nombre' => 'Grupos de Nivel Avanzado', 'tpl_color' => '#e91e63'],
            ['tpl_nombre' => 'Clase Extra', 'tpl_color' => '#ce93d8'],
            ['tpl_nombre' => 'Clase Recuperativa', 'tpl_color' => '#64b5f6'],
            ['tpl_nombre' => 'Clase Recuperativa (Fin de Semana)', 'tpl_color' => '#81c784'],
            ['tpl_nombre' => 'Clase de Baile', 'tpl_color' => '#fff176']
        ]);
    }
}
