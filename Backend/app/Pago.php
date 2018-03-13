<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'tgf_pago';
    protected $primarykey = 'id';

    protected $fillable = ['pag_fecha', 'tgf_cobranza_id', 'tgf_metodo_pago_id'];

    const CREATED_AT = 'pag_fecha';
    const UPDATED_AT = null;

    public function cobranza() {
    	return $this->belongsTo('App\Cobranza', 'tgf_cobranza_id');
    }

    public function metodoPago() {
    	return $this->belongsTo('App\MetodoPago', 'tgf_metodo_pago_id');
    }

}
