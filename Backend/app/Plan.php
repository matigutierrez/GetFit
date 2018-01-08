<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = 'tgf_plan';
    protected $primarykey = 'id';

    protected $fillable = ['pla_nombre', 'pla_descripcion', 'pla_costo'];

    public function sede() {
    	return $this->belongsTo('App\Sede');
    }

}
