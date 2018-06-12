<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $table = 'tgf_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'ser_nombre',
        'ser_descripcion',
        'ser_costo'
    ];

    public $timestamps = false;

}
