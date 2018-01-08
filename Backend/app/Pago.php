<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'tgf_pago';
    protected $primarykey = 'id';

    protected $fillable = ['pag_fecha'];

    public function cobranza() {
    	return $this->belongsTo('App\Cobranza', 'tgf_cobranza_id');
    }

    public function metodoPago() {
    	return $this->belongsTo('App\MetodoPago', 'tgf_metodo_pago_id');
    }

}
