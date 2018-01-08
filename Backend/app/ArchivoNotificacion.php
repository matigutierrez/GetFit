<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArchivoNotificacion extends Model
{
    protected $table = 'tgf_archivo_notificacion';
    protected $primarykey = 'id';

    protected $fillable = ['arn_nombre', 'arn_archivo']

    public function notificacion() {
    	return $this->belongsTo('App\Notificacion');
    }

}
