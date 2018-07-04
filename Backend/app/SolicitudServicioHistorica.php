<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SolicitudServicioHistorica extends Model
{
    protected $table = 'tgf_solicitud_servicio_historica';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_disponibilidad_historica_servicio_id',
        'tgf_cliente_id',
        'sse_fecha_inicio',
        'sse_fecha_fin'
    ];

    protected $with = ['disponibilidad_historica_servicio', 'cliente'];

    public $timestamps = false;

    public function disponibilidad_historica_servicio() {
        return $this->belongsTo('App\DisponibilidadHistoricaServicio', 'tgf_disponibilidad_historica_servicio_id');
    }

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function solicitud_servicio() {
        return $this->hasOne('App\SolicitudServicio', 'tgf_solicitud_servicio_historica_id');
    }

}
