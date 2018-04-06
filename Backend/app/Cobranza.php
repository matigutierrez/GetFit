<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cobranza extends Model
{
    protected $table = 'tgf_cobranza';
    protected $primarykey = 'id';

    protected $fillable = ['cob_monto', 'cob_fecha'];

    const CREATED_AT = 'cob_fecha';
    const UPDATED_AT = null;

    public function contrato() {
    	return $this->belongsTo('App\Contrato', 'tgf_contrato_id');
    }

    public function descuentos() {
    	return $this->hasMany('App\DescuentoCobranza', 'tgf_cobranza_id');
    }

    public function pago() {
    	return $this->hasOne('App\Pago', 'tgf_cobranza_id');
    }
    
}
