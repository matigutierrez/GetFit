<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoPlan extends Model
{
    protected $table = 'tgf_tipo_plan';
    protected $primarykey = 'id';

    protected $fillable = ['tpl_nombre', 'tpl_color'];

    public $timestamps = false;

    public function planes() {
        return $this->hasMany('App\Plan', 'tgf_tipo_plan_id');
    }

}
