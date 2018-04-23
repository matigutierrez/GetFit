<?php

use Illuminate\Database\Seeder;

class ProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_profesor')->insert([
            ['pro_rut'=>'23850327-2','pro_nombres'=>'Iker','pro_apellidos'=>'Flores Montero'],
        	['pro_rut'=>'20267087-3','pro_nombres'=>'Jaime','pro_apellidos'=>'Casas Herrero'],
        	['pro_rut'=>'7032998-0','pro_nombres'=>'Carlos','pro_apellidos'=>'Calvo Santana'],
        	['pro_rut'=>'6287865-7','pro_nombres'=>'Ismael','pro_apellidos'=>'Roig Aguilar'],
        ]);
    }
}
