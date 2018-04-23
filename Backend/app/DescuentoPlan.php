<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DescuentoPlan extends Model
{
    protected $table = 'tgf_desc_plan';
    protected $primarykey = 'id';

    protected $fillable = ['dep_inactivo'];

    public $timestamps = false;

    public function plan() {
    	return $this->belongsTo('App\Plan', 'tgf_plan_id');
    }
}
