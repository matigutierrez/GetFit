<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'tgf_usuario';
    protected $primarykey = 'id';

    protected $fillable = ['usu_fecha_registro', 'usu_correo'];
    protected $hidden = ['usu_pass'];

    public function sedes() {
    	return $this->belongsToMany('App\Sede', 'tgf_sede_usuario', 'tgf_usuario_id', 'tgf_sede_id');
    }

}
