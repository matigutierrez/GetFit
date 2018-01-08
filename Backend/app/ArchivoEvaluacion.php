<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArchivoEvaluacion extends Model
{
    protected $table = 'tgf_evaluacion_archivo';
    protected $primarykey = 'id';

    protected $fillable = ['ear_nombre', 'ear_archivo'];

    public function evaluacion() {
    	return $this->belongsTo('App\Evaluacion');
    }

}
