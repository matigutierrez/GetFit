<?php

use Illuminate\Database\Seeder;

class FotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_foto')->insert([
        	['tgf_cliente_id' => 1, 'fot_archivo' => null],
        ]);
    }
}
