<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HoraDia extends Model
{
    protected $table = 'tgf_hora_dia';
    protected $primarykey = 'id';

    protected $fillable = ['hor_inicio', 'hor_fin'];

    public $timestamps = false;
    
}
