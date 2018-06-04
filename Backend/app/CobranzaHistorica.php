<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CobranzaHistorica extends Model
{
    protected $table = 'tgf_cobranza_historica';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_contrato_historico_id',
        'cob_monto',
        'cob_fecha'
    ];

    protected $with = ['pago'];

    const CREATED_AT = 'cob_fecha';
    const UPDATED_AT = null;

    public function contrato_historico() {
    	return $this->belongsTo('App\ContratoHistorico', 'tgf_contrato_historico_id');
    }

    public function cobranza() {
        return $this->hasOne('App\Cobranza', 'tgf_cobranza_historica_id');
    }

    public function pago() {
    	return $this->hasOne('App\Pago', 'tgf_cobranza_historica_id');
    }
}
