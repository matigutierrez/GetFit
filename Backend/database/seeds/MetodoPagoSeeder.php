<?php

use Illuminate\Database\Seeder;

class MetodoPagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_metodo_pago')->insert([
        	['mep_nombre' => 'Efectivo'],
        	['mep_nombre' => 'Webpay Normal']
        ]);
    }
}
