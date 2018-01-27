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
        DB::table('tgf_cobranza')->insert([
        	['tgf_contrato_id' => 1, 'cob_monto' => 20000],
        	['tgf_contrato_id' => 2, 'cob_monto' => 15000],
        	['tgf_contrato_id' => 3, 'cob_monto' => 3000]
        ]);
    }
}
