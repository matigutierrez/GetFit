<?php

use Illuminate\Database\Seeder;

class DiaSemanaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_dia_semana')->insert([
            ['dia_nombre' => 'Lunes'],      // 1
            ['dia_nombre' => 'Martes'],     // 2
            ['dia_nombre' => 'Miercoles'],  // 3
            ['dia_nombre' => 'Jueves'],     // 4
            ['dia_nombre' => 'Viernes'],    // 5
            ['dia_nombre' => 'Sabado'],     // 6
            ['dia_nombre' => 'Domingo']     // 7
        ]);
    }
}
