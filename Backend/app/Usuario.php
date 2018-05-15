<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Rol;

class Usuario extends Authenticatable
{
    use Notifiable;

    protected $table = 'tgf_usuario';
    protected $primarykey = 'id';

    protected $fillable = [
        'usu_fecha_registro',
        'usu_correo',
        'password',

        'tgf_cliente_id',
        'tgf_profesor_id',
        'tgf_rol_id'
    ];

    protected $hidden = ['password', 'remember_token',];

    protected $appends = ['rol'];

    const CREATED_AT = 'usu_fecha_registro';
    const UPDATED_AT = null;

    public function getRolAttribute() {
        //return $this->belongsTo('App\Rol', 'tgf_rol_id');
        return Rol::find($this->tgf_rol_id);
    }

    public function cliente() {
    	return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function profesor() {
        return $this->belongsTo('App\Profesor', 'tgf_profesor_id');
    }

    public function sedes() {
    	return $this->belongsToMany('App\Sede', 'tgf_sede_usuario', 'tgf_usuario_id', 'tgf_sede_id');
    }

    public function notificaciones() {
        return $this->belongsToMany('App\Notificacion', 'tgf_notificacion_usuario', 'tgf_usu_id', 'tgf_not_id');
    }
    
}
