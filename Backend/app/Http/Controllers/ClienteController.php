<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Cliente;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class ClienteController extends Controller
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
        return Cliente::with('usuario', 'contratos.plan')->get();
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
        $cliente = new Cliente;
        $cliente->cli_rut = $request->cli_rut;
        $cliente->cli_nombres = $request->cli_nombres;
        $cliente->cli_apellidos = $request->cli_apellidos;
        $cliente->cli_numerotelefonico = $request->cli_numerotelefonico;
        $cliente->cli_direccion = $request->cli_direccion;
        $cliente->cli_huella = $request->cli_huella;

        $cliente->save();

        $this->pusher->trigger('cliente', 'create', $cliente);

        return $cliente->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Cliente::with('usuario')->find($id);
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
        $cliente = Cliente::find($id);
        $cliente->update($request->all());

        // Cachear usuario y contratos
        $cliente->usuario;
        $cliente->contratos->pluck('plan');

        $this->pusher->trigger('cliente', 'update', $cliente);

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
        Cliente::destroy($id);

        $this->pusher->trigger('cliente', 'delete', $id);

        return ['deleted' => true];
    }

    /**
     * Obtener el usuario de un cliente
     *
     * @param  int  $id
     * @return \App\Usuario
     */
    public function usuario($id) {
        return Cliente::find($id)->usuario;
    }

    /**
     * Obtener evaluaciones de un cliente
     *
     * @param  int  $id
     * @return \App\Evaluacion
     */
    public function evaluaciones($id) {
        return Cliente::find($id)->evaluaciones;
    }

    /**
     * Obtener fotos de un cliente
     * 
     * @param  int  $id
     * @return \App\Foto
     */
    public function fotos($id) {
        return Cliente::find($id)->fotos;
    }

    /**
     * Obtener contratos de un cliente
     *
     * @param  int  $id
     * @return \App\Contrato
     */
    public function contratos($id) {
        return Cliente::find($id)->contratos()->with('plan')->get();
    }

    /**
     * Obtener las sedes de un cliente
     * 
     * @param  int  $id
     * @return \App\Sede
     */
    public function sedes($id) {
        return Cliente::find($id)->sedes;
    }

    /**
     * Obtener los planes de un cliente
     * 
     * @param  int  $id
     * @return \App\Plan
     */
    public function planes($id) {
        return Cliente::find($id)->planes;
    }

    /**
     * Obtener huella de un cliente
     * 
     * @param  int  $id
     * @return \App\Huella
     */
    public function huella($id) {
        return Cliente::find($id)->huella;
    }

    /**
     * Obtener cobranzas de un cliente
     * 
     * @param  int  $id
     * @return \App\Cobranza
     */
    public function cobranzas($id) {
        return Cliente::find($id)->cobranzas;
    }

    /**
     * Obtener cobranzas de cliente
     * 
     * @return \App\Cobranza
     */
    public function cobranzasToken(AuthenticateController $auth) {
        return $auth->getAuthenticatedUser()->cliente->cobranzas;
    }

    /**
     * Obtener solicitudes de plan de cliente
     * 
     * @return \App\SolicitudPlan
     */
    public function solicitudesPlanToken(AuthenticateController $auth) {
        $solicitudes = $auth->getAuthenticatedUser()->cliente->solicitudesPlan;
        $solicitudes->pluck('cliente');
        $solicitudes->pluck('plan.horario');
        $solicitudes->pluck('plan.sede');

        return $solicitudes;
    }

    /**
     * Obtener solicitudes de plan de un cliente
     * 
     * @return \App\SolicitudPlan
     */
    public function solicitudesPlan($id) {
        $solicitudes = Cliente::find($id)->solicitudesPlan;
        $solicitudes->pluck('cliente');
        $solicitudes->pluck('plan');

        return $solicitudes;
    }

    /**
     * Obtener los contratos del cliente
     * 
     * @return \App\Contrato
     */
    public function contratosToken(AuthenticateController $auth) {
        $contratos = $auth->getAuthenticatedUser()->cliente->contratos()->with('plan')->get();
        $contratos->pluck('plan.horarios');
        $contratos->pluck('plan.sede');

        return $contratos;
    }

    /**
     * Obtener los planes no inscritos por un cliente
     * 
     * @return \App\Plan
     */
    public function noPlanesToken(AuthenticateController $auth) {
        $planes = $auth->getAuthenticatedUser()->cliente->noPlanes;
        $planes->pluck('horarios');
        $planes->pluck('sede');

        return $planes;
    }

    /**
     * Obtener los planes solicitados por un cliente
     * 
     * @param  int  $id
     */
    public function planesSolicitados($id) {
        return Cliente::find($id)->planesSolicitados;
    }

}
