<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    protected $table = 'tgf_foto';
    protected $primarykey = 'id';

    protected $fillable = ['fot_fecha', 'fot_archivo'];

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

}
