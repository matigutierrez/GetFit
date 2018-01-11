<?php

use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_usuario')->insert([
          array(
          	'tgf_rol_id' => '1',
          	'tgf_cliente_id' => '1',
          	'usu_correo' => 'm.gutierrez06@ufromail.cl',
          	'password' => bcrypt('1234')
          ),
          array(
          	'tgf_rol_id' => '2',
          	'tgf_cliente_id' => '1',
          	'usu_correo' => 'm.gutierrez08@ufromail.cl',
          	'password' => bcrypt('12345')
          )
        ]);
    }
}
