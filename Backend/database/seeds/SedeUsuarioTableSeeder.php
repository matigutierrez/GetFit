<?php

use Illuminate\Database\Seeder;

class SedeUsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	DB::table('tgf_sede_usuario')->insert([
          array('tgf_sede_id' => '1', 'tgf_usuario_id' => '1'),
          array('tgf_sede_id' => '1', 'tgf_usuario_id' => '2'),
          array('tgf_sede_id' => '2', 'tgf_usuario_id' => '1')
        ]);
    }
}
