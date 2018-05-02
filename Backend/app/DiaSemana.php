<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DiaSemana extends Model
{
    protected $table = 'tgf_dia_semana';
    protected $primarykey = 'id';

    protected $fillable = ['dia_nombre'];

    public $timestamps = false;
    
}
