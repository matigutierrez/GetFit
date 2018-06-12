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
        	[
				'tgf_grupo_id' => 1,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 1,
				'tgf_dia_semana_id' => 1
			],
			[
				'tgf_grupo_id' => 3,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 2,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 5,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 3,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 7,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 4,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 9,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 7,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 11,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 12,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 13,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 13,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 15,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 14,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 17,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 15,
				'tgf_dia_semana_id' => 1
			],
        	[
				'tgf_grupo_id' => 2,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 1,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 4,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 2,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 6,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 3,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 8,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 4,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 19,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 5,
				'tgf_dia_semana_id' => 2
			],
			[
				'tgf_grupo_id' => 10,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 7,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 12,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 12,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 14,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 13,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 16,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 14,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 18,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 15,
				'tgf_dia_semana_id' => 2
			],
        	[
				'tgf_grupo_id' => 1,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 1,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 3,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 2,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 5,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 3,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 7,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 4,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 20,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 5,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 9,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 7,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 11,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 12,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 13,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 13,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 15,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 14,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 17,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 15,
				'tgf_dia_semana_id' => 3
			],
        	[
				'tgf_grupo_id' => 2,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 1,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 4,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 2,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 6,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 3,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 8,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 4,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 19,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 5,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 10,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 7,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 12,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 12,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 14,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 13,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 16,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 14,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 18,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 15,
				'tgf_dia_semana_id' => 4
			],
        	[
				'tgf_grupo_id' => 1,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 1,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 3,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 2,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 5,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 3,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 7,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 4,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 20,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 5,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 9,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 7,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 11,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 12,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 13,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 13,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 15,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 14,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 17,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 15,
				'tgf_dia_semana_id' => 5
			],
        	[
				'tgf_grupo_id' => 22,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 4,
				'tgf_dia_semana_id' => 6
			],
        	[
				'tgf_grupo_id' => 21,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 5,
				'tgf_dia_semana_id' => 6
			],
        	[
				'tgf_grupo_id' => 19,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 6,
				'tgf_dia_semana_id' => 6
			],
        	[
				'tgf_grupo_id' => 20,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 7,
				'tgf_dia_semana_id' => 6
			],
        	[
				'tgf_grupo_id' => 19,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 5,
				'tgf_dia_semana_id' => 7
			],
        	[
				'tgf_grupo_id' => 20,
				'hor_recuperativo' => 0,
				'hor_inactivo' => 0,
				'tgf_hora_dia_id' => 6,
				'tgf_dia_semana_id' => 7
			]
		]);
    }
}
