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
          'usu_rol' => '1',
          'usu_cliente' => '1',
          'usu_correo' => 'm.gutierrez06@ufromail.cl',
          'usu_pass' => bcrypt('1234'),
        ]);
    }
}
