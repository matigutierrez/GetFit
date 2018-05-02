<?php

use Illuminate\Database\Seeder;

class HoraDiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_hora_dia')->insert([
            ['hor_inicio' => '07:15', 'hor_fin' => '08:00'], // 1
            ['hor_inicio' => '08:00', 'hor_fin' => '09:00'], // 2
            ['hor_inicio' => '09:00', 'hor_fin' => '10:00'], // 3
            ['hor_inicio' => '10:00', 'hor_fin' => '11:00'], // 4
            ['hor_inicio' => '11:00', 'hor_fin' => '12:00'], // 5
            ['hor_inicio' => '12:00', 'hor_fin' => '13:00'], // 6
            ['hor_inicio' => '13:00', 'hor_fin' => '14:00'], // 7
            ['hor_inicio' => '14:00', 'hor_fin' => '15:00'], // 8
            ['hor_inicio' => '15:00', 'hor_fin' => '16:00'], // 9
            ['hor_inicio' => '16:00', 'hor_fin' => '17:00'], // 10
            ['hor_inicio' => '17:00', 'hor_fin' => '18:00'], // 11
            ['hor_inicio' => '18:00', 'hor_fin' => '19:00'], // 12
            ['hor_inicio' => '19:00', 'hor_fin' => '20:00'], // 13
            ['hor_inicio' => '20:00', 'hor_fin' => '21:00'], // 14
            ['hor_inicio' => '21:00', 'hor_fin' => '22:00']  // 15
        ]);
    }
}
