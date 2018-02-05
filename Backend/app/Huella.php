<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Huella extends Model
{
    protected $table = "huella";
    protected $primarykey = 'id';

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }
}
