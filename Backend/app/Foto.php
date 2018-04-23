<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    protected $table = 'tgf_foto';
    protected $primarykey = 'id';

    protected $fillable = ['fot_fecha', 'fot_archivo'];

    const CREATED_AT = 'fot_fecha';
    const UPDATED_AT = null;

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

}
