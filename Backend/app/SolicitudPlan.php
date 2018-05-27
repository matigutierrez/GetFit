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

    const CREATED_AT = 'fecha_solicitud';
    const UPDATED_AT = null;

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function plan() {
        return $this->belongsTo('App\Plan', 'tgf_plan_id');
    }
}
