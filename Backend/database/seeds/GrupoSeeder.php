<?php

use Illuminate\Database\Seeder;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_grupo')->insert([
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 1', 'gru_descripcion' => 'Grupo 1', 'gru_costo' => 0, 'gru_capacidad' => 15, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 2', 'gru_descripcion' => 'Grupo 2', 'gru_costo' => 0, 'gru_capacidad' => 20, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 3', 'gru_descripcion' => 'Grupo 3', 'gru_costo' => 0, 'gru_capacidad' => 25, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 4', 'gru_descripcion' => 'Grupo 4', 'gru_costo' => 0, 'gru_capacidad' => 30, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 4,'gru_nombre' => 'Grupo 5', 'gru_descripcion' => 'Grupo 5', 'gru_costo' => 0, 'gru_capacidad' => 35, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 6', 'gru_descripcion' => 'Grupo 6', 'gru_costo' => 0, 'gru_capacidad' => 40, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 7', 'gru_descripcion' => 'Grupo 7', 'gru_costo' => 0, 'gru_capacidad' => 45, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 8', 'gru_descripcion' => 'Grupo 8', 'gru_costo' => 0, 'gru_capacidad' => 50, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 9', 'gru_descripcion' => 'Grupo 9', 'gru_costo' => 0, 'gru_capacidad' => 55, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 10', 'gru_descripcion' => 'Grupo 10', 'gru_costo' => 0, 'gru_capacidad' => 60, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 11', 'gru_descripcion' => 'Grupo 11', 'gru_costo' => 0, 'gru_capacidad' => 65, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 12', 'gru_descripcion' => 'Grupo 12', 'gru_costo' => 0, 'gru_capacidad' => 70, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 13', 'gru_descripcion' => 'Grupo 13', 'gru_costo' => 0, 'gru_capacidad' => 75, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 14', 'gru_descripcion' => 'Grupo 14', 'gru_costo' => 0, 'gru_capacidad' => 80, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 4,'gru_nombre' => 'Grupo 15', 'gru_descripcion' => 'Grupo 15', 'gru_costo' => 0, 'gru_capacidad' => 85, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 16', 'gru_descripcion' => 'Grupo 16', 'gru_costo' => 0, 'gru_capacidad' => 90, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 2,'gru_nombre' => 'Grupo 17', 'gru_descripcion' => 'Grupo 17', 'gru_costo' => 0, 'gru_capacidad' => 95, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 3,'gru_nombre' => 'Grupo 18', 'gru_descripcion' => 'Grupo 18', 'gru_costo' => 0, 'gru_capacidad' => 100, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 8,'gru_nombre' => 'Zumba', 'gru_descripcion' => 'Grupo de Zumba', 'gru_costo' => 0, 'gru_capacidad' => 105, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 6,'gru_nombre' => 'Regenerativo', 'gru_descripcion' => 'Grupo Regenerativo', 'gru_costo' => 0, 'gru_capacidad' => 110, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 5,'gru_nombre' => 'Clase Extra', 'gru_descripcion' => 'Grupo de Clase Extra', 'gru_costo' => 0, 'gru_capacidad' => 115, 'gru_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_grupo_id' => 7,'gru_nombre' => 'Recuperativa', 'gru_descripcion' => 'Grupo de Clase Recuperativa', 'gru_costo' => 0, 'gru_capacidad' => 120, 'gru_solicitable' => true]
        ]);
    }
}
