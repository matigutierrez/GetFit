<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MetodoPago extends Model
{
    protected $table = 'tgf_metodo_pago';
    protected $primarykey = 'id';

    protected $fillable = ['mep_nombre'];

    public $timestamps = false;

    public function pagos() {
    	return $this->hasMany('App\Pago', 'tgf_metodo_pago_id');
    }
    
}
