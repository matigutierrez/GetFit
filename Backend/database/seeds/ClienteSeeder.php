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
        	['cli_rut'=>'23850327-2','cli_nombres'=>'Iker','cli_apellidos'=>'Flores Montero'],
        	['cli_rut'=>'20267087-3','cli_nombres'=>'Jaime','cli_apellidos'=>'Casas Herrero'],
        	['cli_rut'=>'7032998-0','cli_nombres'=>'Carlos','cli_apellidos'=>'Calvo Santana'],
        	['cli_rut'=>'6287865-7','cli_nombres'=>'Ismael','cli_apellidos'=>'Roig Aguilar'],
        	['cli_rut'=>'21359821-k','cli_nombres'=>'José Manuel','cli_apellidos'=>'Grau Lopez'],
        ]);
    }
}
