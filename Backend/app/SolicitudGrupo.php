<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SolicitudGrupo extends Model
{
    protected $table = 'tgf_cliente_solicita_grupo';
    protected $primarykey = 'id';

    protected $fillable = [
        'tgf_cliente_id',
        'tgf_grupo_id'
    ];

    const CREATED_AT = 'fecha_solicitud';
    const UPDATED_AT = null;

    public function cliente() {
        return $this->belongsTo('App\Cliente', 'tgf_cliente_id');
    }

    public function grupo() {
        return $this->belongsTo('App\Grupo', 'tgf_grupo_id');
    }
}
