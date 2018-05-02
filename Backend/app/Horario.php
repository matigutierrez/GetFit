<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $table = 'tgf_horario';
    protected $primarykey = 'id';

    protected $fillable = ['hor_recuperativo', 'hor_inactivo'];

    public $timestamps = false;

    public function plan() {
    	return $this->belongsTo('App\Plan', 'tgf_plan_id');
    }

    public function asistencias() {
    	return $this->hasMany('App\Asistencia', 'tgf_horario_id');
    }

    public function hora() {
        return $this->belongsTo('App\HoraDia', 'tgf_hora_dia_id');
    }

    public function dia() {
        return $this->belongsTo('App\DiaSemana', 'tgf_dia_semana_id');
    }

}
