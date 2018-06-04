<?php

namespace App;

use App\Cobranza;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'tgf_cliente';
    protected $primarykey = 'id';

    protected $fillable = [
        'cli_rut',
        'cli_nombres',
        'cli_apellidos',
        'cli_numerotelefonico',
        'cli_direccion',
        'cli_huella'
    ];

    protected $with = ['usuario'];

    public $timestamps = false;

    public function usuario() {
    	return $this->hasOne('App\Usuario', 'tgf_cliente_id');
    }

    public function evaluaciones() {
    	return $this->hasMany('App\Evaluacion', 'tgf_cliente_id');
    }

    public function fotos() {
		return $this->hasMany('App\Foto', 'tgf_cliente_id');
    }

    public function contratos_historicos() {
        return $this->hasMany('App\ContratoHistorico', 'tgf_cliente_id');
    }

    public function contratos() {
        return $this->hasManyThrough('App\Contrato', 'App\ContratoHistorico', 'tgf_cliente_id', 'tgf_contrato_historico_id', 'id', 'id');
    }

    public function cobranzas_historicas() {
        return $this->hasManyThrough('App\CobranzaHistorica', 'App\ContratoHistorico', 'tgf_cliente_id', 'tgf_contrato_historico_id', 'id', 'id');
    }

    public function cobranzas() {
        // La relación incluye 4 tablas
        return Cobranza::
              join('tgf_cobranza_historica', 'tgf_cobranza_historica.id', '=', 'tgf_cobranza.tgf_cobranza_historica_id')
            ->join('tgf_contrato_historico', 'tgf_contrato_historico.id', '=', 'tgf_cobranza_historica.tgf_contrato_historico_id')
            ->join('tgf_cliente', 'tgf_cliente.id', '=', 'tgf_contrato_historico.tgf_cliente_id');
    }

    public function planes() {
        return $this->belongsToMany('App\Plan', 'tgf_contrato', 'tgf_cliente_id', 'tgf_plan_id');
    }

    public function huella() {
        return $this->hasOne('App\Huella', 'tgf_cliente_id');
    }

    public function solicitudesPlan() {
        return $this->hasMany('App\SolicitudPlan', 'tgf_cliente_id');
    }

    public function planesSolicitados() {
        return $this->belongsToMany('App\Plan', 'tgf_cliente_solicita_plan', 'tgf_cliente_id', 'tgf_plan_id');
    }

    public function sedes() {
    	return $this->belongsToMany('App\Sede', 'tgf_sede_cliente', 'tgf_cliente_id', 'tgf_sede_id');
    }

}
