<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    protected $table = 'tgf_profesor';
    protected $primarykey = 'id';

    protected $fillable = [
        'pro_rut',
        'pro_nombres',
        'pro_apellidos',
        'pro_numerotelefonico',
        'pro_direccion'
    ];

    public $timestamps = false;

    public function usuario() {
        return $this->hasOne('App\Usuario', 'tgf_profesor_id');
    }

    public function planes() {
        return $this->belongsToMany('App\Plan', 'profesor_imparte_plan', 'tgf_profesor_id', 'tgf_plan_id');
    }

}