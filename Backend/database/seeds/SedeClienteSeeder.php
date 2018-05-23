<?php

use Illuminate\Database\Seeder;

class SedeClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	DB::table('tgf_sede_cliente')->insert([
          array('tgf_sede_id' => '1', 'tgf_cliente_id' => '1'),
          array('tgf_sede_id' => '1', 'tgf_cliente_id' => '2'),
          array('tgf_sede_id' => '2', 'tgf_cliente_id' => '1')
        ]);
    }
}
