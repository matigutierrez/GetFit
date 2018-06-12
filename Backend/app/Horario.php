<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\HoraDia;
use App\DiaSemana;

class Horario extends Model
{
    protected $table = 'tgf_horario';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_hora_dia_id',
        'tgf_dia_semana_id',
        'hor_recuperativo',
        'hor_inactivo'
    ];

    protected $appends = ['hora', 'dia'];

    public $timestamps = false;

    public function grupo() {
    	return $this->belongsTo('App\Grupo', 'tgf_grupo_id');
    }

    public function asistencias() {
    	return $this->hasMany('App\Asistencia', 'tgf_horario_id');
    }

    /**
     * Este campo siempre va con el horario
     */
    public function getHoraAttribute() {
        return HoraDia::find($this->tgf_hora_dia_id);
    }

    /**
     * Este campo siempre va con el horario
     */
    public function getDiaAttribute() {
        return DiaSemana::find($this->tgf_dia_semana_id);
    }

}
