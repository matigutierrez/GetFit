<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'tgf_rol';
    protected $primarykey = 'id';

    protected $fillable = ['rol_nombre', 'rol_descripcion'];

    public function usuarios() {
    	return $this->hasMany('App\Usuario', 'tgf_rol_id');
    }
    
}
