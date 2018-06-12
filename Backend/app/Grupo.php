<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = 'tgf_grupo';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_sede_id',
        'tgf_tipo_grupo_id',
        'gru_nombre',
        'gru_descripcion',
        'gru_costo',
        'gru_capacidad',
        'gru_solicitable'
    ];

    protected $with = ['tipo_grupo', 'sede'];

    public $timestamps = false;

    public function sede() {
    	return $this->belongsTo('App\Sede', 'tgf_sede_id');
    }

    public function tipo_grupo() {
        return $this->belongsTo('App\TipoGrupo', 'tgf_tipo_grupo_id');
    }

    public function horarios() {
    	return $this->hasMany('App\Horario', 'tgf_grupo_id');
    }

    public function contratos() {
    	return $this->hasMany('App\Contrato', 'tgf_grupo_id');
    }

    public function contratos_historicos() {
        return $this->hasMany('App\ContratoHistorico', 'tgf_grupo_id');
    }

    public function descuentos() {
        return $this->hasMany('App\Descuento', 'tgf_grupo_id');
    }

    public function profesores() {
        return $this->belongsToMany('App\Profesor', 'profesor_imparte_grupo', 'tgf_grupo_id', 'tgf_profesor_id');
    }

    public function clientes() {
        return $this->belongsToMany('App\Cliente', 'tgf_contrato', 'tgf_grupo_id', 'tgf_cliente_id');
    }

    public function solicitudesGrupo() {
        return $this->hasMany('App\SolicitudGrupo', 'tgf_grupo_id');
    }

}
