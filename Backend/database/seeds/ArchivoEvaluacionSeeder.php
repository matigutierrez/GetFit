<?php

use Illuminate\Database\Seeder;

class ArchivoEvaluacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_evaluacion_archivo')->insert([
        	['tgf_evaluacion_id' => 1, 'ear_nombre' => 'Archivo 1.pdf', 'ear_archivo' => null],
        	['tgf_evaluacion_id' => 2, 'ear_nombre' => 'Archivo 2.pdf', 'ear_archivo' => null],
        	['tgf_evaluacion_id' => 3, 'ear_nombre' => 'Archivo 3.pdf', 'ear_archivo' => null],
        	['tgf_evaluacion_id' => 3, 'ear_nombre' => 'Archivo 4.pdf', 'ear_archivo' => null]
        ]);
    }
}
