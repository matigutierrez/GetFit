<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContratoHistorico extends Model
{
    protected $table = 'tgf_contrato_historico';
    protected $primarykey = 'id';

    protected $fillable = ['con_fecha_inicio', 'con_acta'];

    protected $with = ['cliente', 'plan'];

    const CREATED_AT = 'con_fecha_inicio';
    const UPDATED_AT = null;

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function contrato() {
        return $this->hasOne('App\Contrato', 'tgf_contrato_historico_id');
    }

    public function asistencias() {
    	return $this->hasMany('App\Asistencia', 'tgf_contrato_id');
    }

    public function plan() {
    	return $this->belongsTo('App\Plan', 'tgf_plan_id');
    }

    public function cobranzas() {
        return $this->hasMany('App\Cobranza', 'tgf_contrato_id');
    }
}
