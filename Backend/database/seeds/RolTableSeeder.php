<?php

use Illuminate\Database\Seeder;

class RolTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_rol')->insert([
          array('rol_nombre' => 'Administrador', 'rol_descripcion' => 'Administra todo'),
          array('rol_nombre' => 'Profesor', 'rol_descripcion' => 'Imparte una clase'),
          array('rol_nombre' => 'Cliente', 'rol_descripcion' => 'Cliente')
        ]);
    }
}
