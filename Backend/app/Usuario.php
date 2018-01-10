<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'tgf_usuario';
    protected $primarykey = 'id';

    protected $fillable = ['usu_fecha_registro', 'usu_correo'];
    protected $hidden = ['usu_pass'];

    const CREATED_AT = 'usu_fecha_registro';

    public function rol() {
        return $this->belongsTo('App\Rol', 'tgf_rol_id');
    }

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function sedes() {
    	return $this->belongsToMany('App\Sede', 'tgf_sede_usuario', 'tgf_usuario_id', 'tgf_sede_id');
    }

    public function notificaciones() {
        return $this->hasMany('App\Notificacion', 'tgf_notificacion_usuario', 'tgf_usu_id', 'tgf_not_id');
    }

}
