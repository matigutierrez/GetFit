<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'tgf_cliente';
    protected $primarykey = 'id';

    protected $fillable = ['cli_rut', 'cli_nombres', 'cli_apellidos', 'cli_numerotelefonico', 'cli_direccion', 'cli_huella'];

    protected $appends = ['cobranzas', 'planes', 'noPlanes'];

    public $timestamps = false;

    public function usuario() {
    	return $this->hasOne('App\Usuario', 'tgf_cliente_id');
    }

    public function evaluaciones() {
    	return $this->hasMany('App\Evaluacion', 'tgf_cliente_id');
    }

    public function fotos() {
		return $this->hasMany('App\Foto', 'tgf_cliente_id');
    }

    public function contratos() {
        return $this->hasMany('App\Contrato', 'tgf_cliente_id');
    }

    public function huella() {
        return $this->hasOne('App\Huella', 'tgf_cliente_id');
    }

    public function planesSolicitados() {
        return $this->belongsToMany('App\Plan', 'cliente_solicita_plan', 'tgf_cliente_id', 'tgf_plan_id');
    }

    public function getPlanesAttribute() {

        return $this->contratos->pluck('plan');

    }

    public function getNoPlanesAttribute() {
        
        return Plan::whereNotIn('tgf_plan.id',
            function ($query) {
                $query
                    ->select('tgf_contrato.tgf_plan_id')
                    ->from('tgf_contrato')
                    ->where('tgf_contrato.tgf_cliente_id', $this->id);
            }
        )->get();

    }

    // $cliente->cobranzas;
    public function getCobranzasAttribute() {
        // Obtener cobranzas
        $cobranzas = $this->contratos->pluck('cobranzas')->collapse();

        // Incluir contratos
        $contratos = $cobranzas->pluck('contrato');

        // Incluir plan de contrato
        $contratos->pluck('plan');

        // Incluir pagos
        $cobranzas->pluck('pago');

        return $cobranzas;
    }

}
