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
        DB::table('tgf_contrato')->insert([
        	['tgf_cliente_id' => 1, 'tgf_plan_id' => 1, 'con_acta' => null],
        	['tgf_cliente_id' => 2, 'tgf_plan_id' => 1, 'con_acta' => null],
        	['tgf_cliente_id' => 2, 'tgf_plan_id' => 2, 'con_acta' => null]
        ]);
    }
}
