<?php

use Illuminate\Database\Seeder;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_cliente')->insert([
        	['cli_rut'=>'5344793-7','cli_nombres'=>'José Manuel','cli_apellidos'=>'Cabrera Castro'],
        	['cli_rut'=>'16277575-8','cli_nombres'=>'Rodrigo','cli_apellidos'=>'Cruz Nuñez'],
        	['cli_rut'=>'21359821-k','cli_nombres'=>'José Manuel','cli_apellidos'=>'Grau Lopez'],
        ]);
    }
}
