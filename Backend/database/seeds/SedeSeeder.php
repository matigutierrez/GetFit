<?php

use Illuminate\Database\Seeder;

class SedeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_sede')->insert([
        	['sed_nombre'=>'Gimnasio Trinidad Zúñiga', 'sed_direccion'=>'Al lado del Unimarc'],
        	['sed_nombre'=>'Gimnasio para Hombres', 'sed_direccion'=>'Todavia no existe'],
        ]);
    }
}
