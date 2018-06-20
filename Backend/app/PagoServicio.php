<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PagoServicio extends Model
{
    protected $table = 'tgf_pago_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cobranza_historica_servicio_id',
        'tgf_metodo_pago_id',
        'pag_fecha'
    ];

    protected $with = ['metodo_pago'];

    const CREATED_AT = 'pag_fecha';
    const UPDATED_AT = null;

    public function cobranza_historica_servicio() {
        return $this->belongsTo('App\CobranzaHistoricaServicio', 'tgf_cobranza_historica_servicio_id');
    }

    public function metodo_pago() {
        return $this->belongsTo('App\MetodoPago', 'tgf_metodo_pago_id');
    }

}
