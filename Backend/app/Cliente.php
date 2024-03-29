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
            ->join('tgf_cliente', 'tgf_cliente.id', '=', 'tgf_contrato_historico.tgf_cliente_id')
            ->where('tgf_cliente_id', '=', $this->id);
    }

    public function cobranzas_servicios() {
        return $this->hasMany('App\CobranzaServicio', 'tgf_cliente_id');
    }

    public function cobranzas_historicas_servicios() {
        return $this->hasMany('App\CobranzaHistoricaServicio', 'tgf_cliente_id');
    }

    public function grupos() {
        return $this->belongsToMany('App\Grupo', 'tgf_contrato', 'tgf_cliente_id', 'tgf_grupo_id');
    }

    public function huella() {
        return $this->hasOne('App\Huella', 'tgf_cliente_id');
    }

    public function solicitudesGrupo() {
        return $this->hasMany('App\SolicitudGrupo', 'tgf_cliente_id');
    }

    public function sedes() {
    	return $this->belongsToMany('App\Sede', 'tgf_sede_cliente', 'tgf_cliente_id', 'tgf_sede_id');
    }

}
