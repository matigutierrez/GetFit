<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContratoHistorico extends Model
{
    protected $table = 'tgf_contrato_historico';
    protected $primarykey = 'id';

    protected $fillable = ['con_fecha_inicio', 'con_acta'];

    protected $with = ['cliente', 'grupo'];

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

    public function grupo() {
    	return $this->belongsTo('App\Grupo', 'tgf_grupo_id');
    }

    public function cobranzas_historicas() {
        return $this->hasMany('App\CobranzaHistorica', 'tgf_contrato_historico_id');
    }
}
