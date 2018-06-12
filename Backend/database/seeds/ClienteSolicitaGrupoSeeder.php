<?php

use Illuminate\Database\Seeder;

class ClienteSolicitaGrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_cliente_solicita_grupo')->insert([
            ['tgf_cliente_id' => 3, 'tgf_grupo_id' => 1],
            ['tgf_cliente_id' => 1, 'tgf_grupo_id' => 2],
            ['tgf_cliente_id' => 3, 'tgf_grupo_id' => 2],
            ['tgf_cliente_id' => 2, 'tgf_grupo_id' => 3]
        ]);
    }
}
