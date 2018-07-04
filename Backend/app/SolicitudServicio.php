<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SolicitudServicio extends Model
{
    protected $table = 'tgf_solicitud_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_solicitud_servicio_historica_id',
        'tgf_disponibilidad_historica_servicio_id'
    ];

    protected $with = ['solicitud_servicio_historica'];

    public $timestamps = false;

    public function solicitud_servicio_historica() {
        return $this->belongsTo('App\SolicitudServicioHistorica', 'tgf_solicitud_servicio_historica_id');
    }

    public function disponibilidad_historica_servicio() {
        return $this->belongsTo('App\DisponibilidadServicio', 'tgf_disponibilidad_historica_servicio_id');
    }
}
