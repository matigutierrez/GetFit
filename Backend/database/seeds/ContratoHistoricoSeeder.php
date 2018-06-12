<?php

use Illuminate\Database\Seeder;

class ContratoHistoricoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Si se modifica algun tgf_grupo_id, tambien debe modificarse en ContratoSeeder
        DB::table('tgf_contrato_historico')->insert([
        	['tgf_cliente_id' => 1, 'tgf_grupo_id' => 1, 'con_acta' => null],
        	['tgf_cliente_id' => 2, 'tgf_grupo_id' => 1, 'con_acta' => null],
        	['tgf_cliente_id' => 2, 'tgf_grupo_id' => 2, 'con_acta' => null]
        ]);
    }
}
