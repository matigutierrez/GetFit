<?php

use Illuminate\Database\Seeder;

class ContratoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Si se modifica algun tgf_plan_id, tambien debe modificarse en ContratoHistoricoSeeder
        DB::table('tgf_contrato')->insert([
        	['tgf_contrato_historico_id' => 1, 'tgf_plan_id' => 1],
        	['tgf_contrato_historico_id' => 2, 'tgf_plan_id' => 1],
        	['tgf_contrato_historico_id' => 3, 'tgf_plan_id' => 2]
        ]);
    }
}
