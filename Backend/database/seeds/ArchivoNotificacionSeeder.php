<?php

use Illuminate\Database\Seeder;

class ArchivoNotificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_archivo_notificacion')->insert([
            ['tgf_notificacion_id' => 1, 'arn_nombre' => 'Archivo 1.pdf', 'arn_archivo' => null],
            ['tgf_notificacion_id' => 1, 'arn_nombre' => 'Archivo 2.pdf', 'arn_archivo' => null],
        ]);
    }
}
