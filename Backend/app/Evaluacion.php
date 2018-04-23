<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    protected $table = 'tgf_evaluacion';
    protected $primarykey = 'id';

    protected $fillable = ['eva_archivo', 'eva_fecha'];

    const CREATED_AT = 'eva_fecha';
    const UPDATED_AT = null;

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function archivos() {
    	return $this->hasMany('App\ArchivoEvaluacion', 'tgf_evaluacion_id');
    }

}
