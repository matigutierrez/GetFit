<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = 'tgf_plan';
    protected $primarykey = 'id';

    protected $fillable = ['pla_nombre', 'pla_descripcion', 'pla_costo'];

    public function sede() {
    	return $this->belongsTo('App\Sede', 'tgf_sede_id');
    }

    public function horarios() {
    	return $this->hasMany('App\Horario', 'tgf_plan_id');
    }

    public function contratos() {
    	return $this->hasMany('App\Contrato', 'tgf_plan_id');
    }

    public function descuentos() {
        return $this-hasMany('App\Descuento', 'tgf_plan_id');
    }

}
