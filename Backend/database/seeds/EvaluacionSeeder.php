<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EvaluacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_evaluacion')->insert([
        	['tgf_cliente_id' => 1, 'eva_archivo' => null],
        	['tgf_cliente_id' => 2, 'eva_archivo' => null],
        	['tgf_cliente_id' => 2, 'eva_archivo' => Carbon::tomorrow()]
        ])
    }
}
