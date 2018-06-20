<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CobranzaHistoricaServicio extends Model
{
    protected $table = 'tgf_cobranza_historica_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_disponibilidad_servicio_id',
        'tgf_cliente_id',
        'chs_monto',
        'chs_fecha'
    ];

    protected $with = ['disponibilidad_servicio', 'pago_servicio'];

    const CREATED_AT = 'chs_fecha';
    const UPDATED_AT = null;

    public function disponibilidad_servicio() {
        return $this->belongsTo('App\DisponibilidadServicio', 'tgf_disponibilidad_servicio_id');
    }

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function pago_servicio() {
        return $this->hasOne('App\PagoServicio', 'tgf_cobranza_historica_servicio_id');
    }

    public function cobranza_servicio() {
        return $this->hasOne('App\CobranzaServicio', 'tgf_cobranza_historica_servicio_id');
    }

}
