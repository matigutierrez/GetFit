<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'tgf_notificacion';
    protected $primarykey = 'id';

    protected $fillable = ['not_titulo', 'not_contenido'];

    public function usuarios() {
    	return $this->hasMany('App\Usuario', 'tgf_notificacion_usuario', 'tgf_not_id', 'tgf_usu_id');
    }

    public function archivos() {
    	return $this->hasMany('App\Archivo');
    }
}
