<?php

use Illuminate\Database\Seeder;

class CobranzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Si se modifica algun tgf_contrato_id, tambien debe modificarse en CobranzaHistoricaSeeder
        DB::table('tgf_cobranza')->insert([
        	['tgf_cobranza_historica_id' => 1, 'tgf_contrato_id' => 1],
        	['tgf_cobranza_historica_id' => 2, 'tgf_contrato_id' => 2],
        	['tgf_cobranza_historica_id' => 3, 'tgf_contrato_id' => 3]
        ]);
    }
}
