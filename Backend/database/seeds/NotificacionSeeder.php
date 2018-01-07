<?php

use Illuminate\Database\Seeder;

class NotificacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_notificacion')->insert([
          'not_titulo' => 'Aviso Importante',
          'not_contenido' => 'Se avisa que el aviso que se iba a avisar no se avisara hasta nuevo aviso'
        ]);
    }
}
