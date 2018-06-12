<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoGrupo extends Model
{
    protected $table = 'tgf_tipo_grupo';
    protected $primarykey = 'id';

    protected $fillable = ['tgr_nombre', 'tgr_color'];

    public $timestamps = false;

    public function grupos() {
        return $this->hasMany('App\Grupo', 'tgf_tipo_grupo_id');
    }

}
