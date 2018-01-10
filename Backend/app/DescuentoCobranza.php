<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DescuentoCobranza extends Model
{
    protected $table = 'tgf_cda';
    protected $primarykey = 'id';

    protected $fillable = ['cda_descripcion', 'cda_monto'];

    public function cobranza() {
    	return $this->belongsTo('App\Cobranza', 'tgf_cobranza_id');
    }

}
