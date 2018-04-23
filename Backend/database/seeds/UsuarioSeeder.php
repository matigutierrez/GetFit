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
            'tgf_cliente_id' => null,
            'tgf_profesor_id' => null,
          	'usu_correo' => 'm.gutierrez06@ufromail.cl',
          	'password' => bcrypt('1234')
          ),
          array(
            'tgf_rol_id' => '2',
            'tgf_cliente_id' => null,
            'tgf_profesor_id' => '1',
            'usu_correo' => 'd.coronado03@ufromail.cl',
            'password' => bcrypt('12345')
          ),
          array(
            'tgf_rol_id' => '2',
            'tgf_cliente_id' => null,
            'tgf_profesor_id' => '2',
            'usu_correo' => 'f.acuña@ufromail.cl',
            'password' => bcrypt('12345')
          ),
          array(
            'tgf_rol_id' => '2',
            'tgf_cliente_id' => null,
            'tgf_profesor_id' => '3',
            'usu_correo' => 'a.herrera@ufromail.cl',
            'password' => bcrypt('12345')
          ),
          array(
            'tgf_rol_id' => '2',
            'tgf_cliente_id' => null,
            'tgf_profesor_id' => '4',
            'usu_correo' => 'c.cuevas@ufromail.cl',
            'password' => bcrypt('12345')
          ),
          array(
            'tgf_rol_id' => '3',
            'tgf_cliente_id' => '2',
            'tgf_profesor_id' => null,
            'usu_correo' => 'm.hermosilla03@ufromail.cl',
            'password' => bcrypt('12345')
          )
        ]);
    }
}
