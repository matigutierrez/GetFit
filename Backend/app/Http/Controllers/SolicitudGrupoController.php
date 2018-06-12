<?php

namespace App\Http\Controllers;

use App\SolicitudGrupo;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class SolicitudGrupoController extends Controller
{

    private $pusher;

    public function __construct(PusherManager $pusher) {
        $this->pusher = $pusher;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SolicitudGrupo::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $solicitudGrupo = new SolicitudGrupo;
        $solicitudGrupo->tgf_cliente_id = $request->tgf_cliente_id;
        $solicitudGrupo->tgf_grupo_id = $request->tgf_grupo_id;

        $solicitudGrupo->save();

        // Cachear cliente y grupo
        $solicitudGrupo->cliente->usuario;
        $solicitudGrupo->grupo;

        $this->pusher->trigger('solicitudGrupo', 'create', $solicitudGrupo);

        return $solicitudGrupo->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SolicitudGrupo::find($id);
    }

    /**
     * Buscar una solicitud por el token del cliente y el ID del grupo
     * 
     * @param  AuthenticateController controlador de autenticación
     * @param  int  $tgf_grupo_id ID del grupo
     */
    public function findToken(AuthenticateController $auth, $tgf_grupo_id) {
        return SolicitudGrupo::where([
            'tgf_cliente_id' => $auth->getAuthenticatedUser()->cliente->id,
            'tgf_grupo_id' => $tgf_grupo_id
        ])->get()->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $solicitudGrupo = SolicitudGrupo::find($id);
        $solicitudGrupo->update($request->all());

        // Cachear cliente y grupo
        $solicitudGrupo->cliente->usuario;
        $solicitudGrupo->grupo;
        
        $this->pusher->trigger('solicitudGrupo', 'update', $solicitudGrupo);

        return ['updated' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        SolicitudGrupo::destroy($id);

        $this->pusher->trigger('solicitudGrupo', 'delete', $id);

        return ['deleted' => true];
    }

    /**
     * Crear una solicitud de grupo para el cliente
     * 
     */
    public function solicitar(AuthenticateController $auth, $tgf_grupo_id) {
        // Buscar el grupo
        $grupo = Grupo::find($tgf_grupo_id);

        // Si el grupo existe y se puede inscribir
        if ( isset($grupo) && $grupo->gru_solicitable == 1 ) {

            // Crear una solicitud nueva
            $solicitudGrupo = new SolicitudGrupo;
            $solicitudGrupo->tgf_cliente_id = $auth->getAuthenticatedUser()->cliente->id;
            $solicitudGrupo->tgf_grupo_id = $tgf_grupo_id;

            // Guardar solicitud
            $solicitudGrupo->save();

            // Cachear cliente y grupo
            $solicitudGrupo->cliente->usuario;
            $solicitudGrupo->grupo;

            // Enviar solicitud por pusher
            $this->pusher->trigger('solicitudGrupo', 'create', $solicitudGrupo);

            return $solicitudGrupo->id;
        }

        return null;
    }

}
