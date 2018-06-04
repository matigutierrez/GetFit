<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $table = 'tgf_contrato';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_contrato_historico_id',
        'tgf_plan_id'
    ];

    protected $with = ['contrato_historico'];

    public $timestamps = false;

    public function contrato_historico() {
        return $this->belongsTo('App\ContratoHistorico', 'tgf_contrato_historico_id');
    }

    public function plan() {
        return $this->belongTo('App\Plan', 'tgf_plan_id');
    }

    public function cobranzas() {
        return $this->hasMany('App\Cobranza', 'tgf_contrato_id');
    }

}
