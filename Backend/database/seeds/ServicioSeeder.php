<?php

use Illuminate\Database\Seeder;

class ServicioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_servicio')->insert([
        	[
                'ser_nombre' => 'Evaluación',
                'ser_descripcion' => 'Servicio de evaluacion',
                'ser_costo' => 3000
            ],
        	[
                'ser_nombre' => 'Clase Extra',
                'ser_descripcion' => 'Servicio de clase extra',
                'ser_costo' => 500
            ]
        ]);
    }
}
