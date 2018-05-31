<?php

use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tgf_plan')->insert([
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 1', 'pla_descripcion' => 'Plan 1', 'pla_costo' => 0, 'pla_capacidad' => 15, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 2', 'pla_descripcion' => 'Plan 2', 'pla_costo' => 0, 'pla_capacidad' => 20, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 3', 'pla_descripcion' => 'Plan 3', 'pla_costo' => 0, 'pla_capacidad' => 25, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 4', 'pla_descripcion' => 'Plan 4', 'pla_costo' => 0, 'pla_capacidad' => 30, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 4,'pla_nombre' => 'Grupo 5', 'pla_descripcion' => 'Plan 5', 'pla_costo' => 0, 'pla_capacidad' => 35, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 6', 'pla_descripcion' => 'Plan 6', 'pla_costo' => 0, 'pla_capacidad' => 40, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 7', 'pla_descripcion' => 'Plan 7', 'pla_costo' => 0, 'pla_capacidad' => 45, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 8', 'pla_descripcion' => 'Plan 8', 'pla_costo' => 0, 'pla_capacidad' => 50, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 9', 'pla_descripcion' => 'Plan 9', 'pla_costo' => 0, 'pla_capacidad' => 55, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 10', 'pla_descripcion' => 'Plan 10', 'pla_costo' => 0, 'pla_capacidad' => 60, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 11', 'pla_descripcion' => 'Plan 11', 'pla_costo' => 0, 'pla_capacidad' => 65, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 12', 'pla_descripcion' => 'Plan 12', 'pla_costo' => 0, 'pla_capacidad' => 70, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 13', 'pla_descripcion' => 'Plan 13', 'pla_costo' => 0, 'pla_capacidad' => 75, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 14', 'pla_descripcion' => 'Plan 14', 'pla_costo' => 0, 'pla_capacidad' => 80, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 4,'pla_nombre' => 'Grupo 15', 'pla_descripcion' => 'Plan 15', 'pla_costo' => 0, 'pla_capacidad' => 85, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 16', 'pla_descripcion' => 'Plan 16', 'pla_costo' => 0, 'pla_capacidad' => 90, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 2,'pla_nombre' => 'Grupo 17', 'pla_descripcion' => 'Plan 17', 'pla_costo' => 0, 'pla_capacidad' => 95, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 3,'pla_nombre' => 'Grupo 18', 'pla_descripcion' => 'Plan 18', 'pla_costo' => 0, 'pla_capacidad' => 100, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 8,'pla_nombre' => 'Zumba', 'pla_descripcion' => 'Plan de Zumba', 'pla_costo' => 0, 'pla_capacidad' => 105, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 6,'pla_nombre' => 'Regenerativo', 'pla_descripcion' => 'Plan Regenerativo', 'pla_costo' => 0, 'pla_capacidad' => 110, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 5,'pla_nombre' => 'Clase Extra', 'pla_descripcion' => 'Plan de Clase Extra', 'pla_costo' => 0, 'pla_capacidad' => 115, 'pla_solicitable' => true],
        	['tgf_sede_id' => 1, 'tgf_tipo_plan_id' => 7,'pla_nombre' => 'Recuperativa', 'pla_descripcion' => 'Plan de Clase Recuperativa', 'pla_costo' => 0, 'pla_capacidad' => 120, 'pla_solicitable' => true]
        ]);
    }
}
