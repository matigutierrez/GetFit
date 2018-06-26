<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CobranzaHistoricaServicio extends Model
{
    protected $table = 'tgf_cobranza_historica_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_solicitud_servicio_historica_id',
        'chs_monto',
        'chs_fecha'
    ];

    protected $with = ['solicitud_servicio_historica', 'pago_servicio'];

    const CREATED_AT = 'chs_fecha';
    const UPDATED_AT = null;

    public function solicitud_servicio_historica() {
        return $this->belongsTo('App\SolicitudServicioHistorica', 'tgf_solicitud_servicio_historica_id');
    }

    public function pago_servicio() {
        return $this->hasOne('App\PagoServicio', 'tgf_cobranza_historica_servicio_id');
    }

    public function cobranza_servicio() {
        return $this->hasOne('App\CobranzaServicio', 'tgf_cobranza_historica_servicio_id');
    }

}
