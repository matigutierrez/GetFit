<?php

use Illuminate\Database\Seeder;

class ClienteSolicitaPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_cliente_solicita_plan')->insert([
            ['tgf_cliente_id' => 3, 'tgf_plan_id' => 1],
            ['tgf_cliente_id' => 1, 'tgf_plan_id' => 2],
            ['tgf_cliente_id' => 3, 'tgf_plan_id' => 2],
            ['tgf_cliente_id' => 2, 'tgf_plan_id' => 3]
        ]);
    }
}
