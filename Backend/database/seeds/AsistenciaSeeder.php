<?php

use Illuminate\Database\Seeder;

class AsistenciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_asistencia')->insert([
        	['tgf_contrato_id' => 1, 'tgf_horario_id' => 1, 'asi_presente' => true],
        	['tgf_contrato_id' => 1, 'tgf_horario_id' => 20, 'asi_presente' => false],
        	['tgf_contrato_id' => 2, 'tgf_horario_id' => 10, 'asi_presente' => true],
        	['tgf_contrato_id' => 3, 'tgf_horario_id' => 2, 'asi_presente' => true],
        ]);
    }
}
