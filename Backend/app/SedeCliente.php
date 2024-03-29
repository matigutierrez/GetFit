<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SedeCliente extends Model
{
    protected $table = 'tgf_sede_cliente';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cliente_id',
        'tgf_sede_id'
    ];

    public $timestamps = false;

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function sede() {
        return $this->belongsTo('App\Sede', 'tgf_sede_id');
    }
    
}
