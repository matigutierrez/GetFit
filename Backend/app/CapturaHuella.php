<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CapturaHuella extends Model
{
    protected $table = 'tgf_captura_huella';
    protected $primarykey = 'id';

    protected $fillable = ['cah_fecha', 'cah_muestra'];

    public function sede() {
    	return $this->belongsTo('App\Sede', 'tgf_sede_id');
    }

}
