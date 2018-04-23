<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $table = 'tgf_asistencia';
    protected $primarykey = 'id';

    protected $fillable = ['asi_presente'];

    public $timestamps = false;

    public function contrato() {
    	return $this->belongsTo('App\Contrato', 'tgf_contrato_id');
    }

    public function horario() {
    	return $this->belongsTo('App\Horario', 'tgf_horario_id');
    }

}
