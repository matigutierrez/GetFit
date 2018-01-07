<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    protected $table = 'tgf_sede';
    protected $primarykey = 'id';

    protected $fillable = ['sed_nombre', 'sed_direccion'];

    public function usuarios() {
    	return $this->belongsToMany('App\Usuario', 'tgf_sede_usuario', 'tgf_sede_id', 'tgf_usuario_id');
    }

}
