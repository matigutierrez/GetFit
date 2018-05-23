<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    protected $table = 'tgf_sede';
    protected $primarykey = 'id';

    protected $fillable = ['sed_nombre', 'sed_direccion'];

    public $timestamps = false;
    
    public function clientes() {
    	return $this->belongsToMany('App\Cliente', 'tgf_sede_cliente', 'tgf_sede_id', 'tgf_cliente_id');
    }

    public function planes() {
    	return $this->hasMany('App\Plan', 'tgf_sede_id');
    }

    public function capturasHuellas() {
    	return $this->hasMany('App\CapturaHuella', 'tgf_sede_id');
    }

}
