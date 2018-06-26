<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CobranzaServicio extends Model
{
    protected $table = 'tgf_cobranza_servicio';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cobranza_historica_servicio_id'
    ];

    protected $with = ['cobranza_historica_servicio'];

    public $timestamps = false;

    public function cobranza_historica_servicio() {
        return $this->belongsTo('App\CobranzaHistoricaServicio', 'tgf_cobranza_historica_servicio_id');
    }

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

}
