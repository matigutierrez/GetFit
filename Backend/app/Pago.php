<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'tgf_pago';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cobranza_historica_id',
        'tgf_metodo_pago_id',
        'pag_fecha'
    ];

    protected $with = ['metodo_pago'];

    const CREATED_AT = 'pag_fecha';
    const UPDATED_AT = null;

    public function cobranza_historica() {
    	return $this->belongsTo('App\CobranzaHistorica', 'tgf_cobranza_historica_id');
    }

    public function metodo_pago() {
    	return $this->belongsTo('App\MetodoPago', 'tgf_metodo_pago_id');
    }

}
