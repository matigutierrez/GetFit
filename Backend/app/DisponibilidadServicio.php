<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DisponibilidadServicio extends Model
{
    protected $table = 'tgf_disponibilidad_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_disponibilidad_historica_servicio_id'
    ];

    protected $with = ['disponibilidad_historica_servicio'];

    public $timestamps = false;

    public function disponibilidad_historica_servicio() {
        return $this->belongsTo('App\DisponibilidadHistoricaServicio', 'tgf_disponibilidad_historica_servicio_id');
    }
}
