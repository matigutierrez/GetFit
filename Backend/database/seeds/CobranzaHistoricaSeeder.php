<?php

use Illuminate\Database\Seeder;

class CobranzaHistoricaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Si se modifica algun tgf_contrato_historico_id aquí, tambien debe modificarse en CobranzaSeeder
        DB::table('tgf_cobranza_historica')->insert([
        	['tgf_contrato_historico_id' => 1, 'cob_monto' => 20000],
        	['tgf_contrato_historico_id' => 2, 'cob_monto' => 15000],
        	['tgf_contrato_historico_id' => 3, 'cob_monto' => 3000]
        ]);
    }
}
