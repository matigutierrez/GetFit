<?php

use Illuminate\Database\Seeder;

class HorarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_horario')->insert([
        	['tgf_plan_id' => 1, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 07:15-08:00'],
        	['tgf_plan_id' => 3, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 08:00-09:00'],
        	['tgf_plan_id' => 5, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 09:00-10:00'],
        	['tgf_plan_id' => 7, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 10:00-11:00'],
        	['tgf_plan_id' => 9, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 13:00-14:00'],
        	['tgf_plan_id' => 11, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 18:00-19:00'],
        	['tgf_plan_id' => 13, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 19:00-20:00'],
        	['tgf_plan_id' => 15, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 20:00-21:00'],
        	['tgf_plan_id' => 17, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Lunes 21:00-22:00'],
        	['tgf_plan_id' => 2, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 07:15-8:00'],
        	['tgf_plan_id' => 4, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 08:00-09:00'],
        	['tgf_plan_id' => 6, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 09:00-10:00'],
        	['tgf_plan_id' => 8, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 10:00-11:00'],
        	['tgf_plan_id' => 19, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 11:00-12:00'],
        	['tgf_plan_id' => 10, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 13:00-14:00'],
        	['tgf_plan_id' => 12, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 18:00-19:00'],
        	['tgf_plan_id' => 14, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 19:00-20:00'],
        	['tgf_plan_id' => 16, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 20:00-21:00'],
        	['tgf_plan_id' => 18, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Martes 21:00-22:00'],
        	['tgf_plan_id' => 1, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 07:15-08:00'],
        	['tgf_plan_id' => 3, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 08:00-09:00'],
        	['tgf_plan_id' => 5, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 09:00-10:00'],
        	['tgf_plan_id' => 7, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 10:00-11:00'],
        	['tgf_plan_id' => 20, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 11:00-12:00'],
        	['tgf_plan_id' => 9, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 13:00-14:00'],
        	['tgf_plan_id' => 11, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 18:00-19:00'],
        	['tgf_plan_id' => 13, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 19:00-20:00'],
        	['tgf_plan_id' => 15, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 20:00-21:00'],
        	['tgf_plan_id' => 17, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Miercoles 21:00-22:00'],
        	['tgf_plan_id' => 2, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 07:15-08:00'],
        	['tgf_plan_id' => 4, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 08:00-09:00'],
        	['tgf_plan_id' => 6, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 09:00-10:00'],
        	['tgf_plan_id' => 8, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 10:00-11:00'],
        	['tgf_plan_id' => 19, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 11:00-12:00'],
        	['tgf_plan_id' => 10, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 13:00-14:00'],
        	['tgf_plan_id' => 12, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 18:00-19:00'],
        	['tgf_plan_id' => 14, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 19:00-20:00'],
        	['tgf_plan_id' => 16, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 20:00-21:00'],
        	['tgf_plan_id' => 18, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Jueves 21:00-22:00'],
        	['tgf_plan_id' => 1, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 07:15-08:00'],
        	['tgf_plan_id' => 3, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 08:00-09:00'],
        	['tgf_plan_id' => 5, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 09:00-10:00'],
        	['tgf_plan_id' => 7, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 10:00-11:00'],
        	['tgf_plan_id' => 20, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 11:00-12:00'],
        	['tgf_plan_id' => 9, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 13:00-14:00'],
        	['tgf_plan_id' => 11, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 18:00-19:00'],
        	['tgf_plan_id' => 13, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 19:00-20:00'],
        	['tgf_plan_id' => 15, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 20:00-21:00'],
        	['tgf_plan_id' => 17, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Viernes 21:00-22:00'],
        	['tgf_plan_id' => 22, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Sabado 10:00-11:00'],
        	['tgf_plan_id' => 21, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Sabado 11:00-12:00'],
        	['tgf_plan_id' => 19, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Sabado 12:00-13:00'],
        	['tgf_plan_id' => 20, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Sabado 13:00-14:00'],
        	['tgf_plan_id' => 19, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Domingo 11:00-12:00'],
        	['tgf_plan_id' => 20, 'hor_recuperativo' => 0, 'hor_inactivo' => 0, 'hor_hora' => 'Domingo 12:00-13:00']
        ]);
    }
}
