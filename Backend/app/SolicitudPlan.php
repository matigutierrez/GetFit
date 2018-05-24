<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SolicitudPlan extends Model
{
    protected $table = 'tgf_cliente_solicita_plan';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cliente_id',
        'tgf_plan_id'
    ];

    public $timestamps = false;

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function plan() {
        return $this->belongsTo('App\Plan', 'tgf_plan_id');
    }
}
