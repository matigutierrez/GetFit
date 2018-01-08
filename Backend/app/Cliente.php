<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'tgf_cliente';
    protected $primarykey = 'id';

    protected $fillable = ['cli_rut', 'cli_nombres', 'cli_apellidos', 'cli_numerotelefonico', 'cli_direccion', 'cli_huella'];

    public function usuario() {
    	return $this->hasOne('App\Usuario');
    }

    public function evaluaciones() {
    	return $this->hasMany('App\Evaluacion');
    }

}
