<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cobranza extends Model
{
    protected $table = 'tgf_cobranza';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cobranza_historica_id',
        'tgf_contrato_id'
    ];

    protected $with = ['cobranza_historica'];

    public $timestamps = false;

    public function cobranza_historica() {
        return $this->belongsTo('App\CobranzaHistorica', 'tgf_cobranza_historica_id');
    }

    public function contrato() {
        return $this->belongsTo('App\Contrato', 'tgf_contrato_id');
    }
    
}
