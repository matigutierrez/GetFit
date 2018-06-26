<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DisponibilidadServicio extends Model
{
    protected $table = 'tgf_disponibilidad_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_servicio_id',
        'dse_fecha_inicio',
        'dse_fecha_fin'
    ];

    protected $with = ['servicio'];

    public $timestamps = false;

    public function servicio() {
        return $this->belongsTo('App\Servicio', 'tgf_servicio_id');
    }

    public function solicitudes_historicas() {
        return $this->hasMany('App\SolicitudServicioHistorica', 'tgf_disponibilidad_servicio_id');
    }

    public function solicitudes() {
        return $this->hasMany('App\SolicitudServicio', 'tgf_disponibilidad_servicio_id');
    }
}
