<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = 'tgf_plan';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_sede_id',
        'tgf_tipo_plan_id',
        'pla_nombre',
        'pla_descripcion',
        'pla_costo',
        'pla_capacidad',
        'pla_solicitable'
    ];

    protected $with = ['tipo_plan'];

    public $timestamps = false;

    public function sede() {
    	return $this->belongsTo('App\Sede', 'tgf_sede_id');
    }

    public function tipo_plan() {
        return $this->belongsTo('App\TipoPlan', 'tgf_tipo_plan_id');
    }

    public function horarios() {
    	return $this->hasMany('App\Horario', 'tgf_plan_id');
    }

    public function contratos() {
    	return $this->hasMany('App\Contrato', 'tgf_plan_id');
    }

    public function contratos_historicos() {
        return $this->hasMany('App\ContratoHistorico', 'tgf_plan_id');
    }

    public function descuentos() {
        return $this->hasMany('App\Descuento', 'tgf_plan_id');
    }

    public function profesores() {
        return $this->belongsToMany('App\Profesor', 'profesor_imparte_plan', 'tgf_plan_id', 'tgf_profesor_id');
    }

    public function clientes() {
        return $this->belongsToMany('App\Cliente', 'tgf_contrato', 'tgf_plan_id', 'tgf_cliente_id');
    }

    public function solicitudesPlan() {
        return $this->hasMany('App\SolicitudPlan', 'tgf_plan_id');
    }

    public function clientesSolicitando() {
        return $this->belongsToMany('App\Cliente', 'tgf_cliente_solicita_plan', 'tgf_plan_id', 'tgf_cliente_id');
    }

}
