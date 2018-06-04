<?php

namespace App\Http\Controllers;

use App\Cobranza;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

use JWTAuth;

class CobranzaController extends Controller
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
        return Cobranza::with('contrato')->get();
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
        // Para crear una cobranza, hacerlo atraves de CobranzaHistoricaController
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Cobranza::find($id);
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
        $cobranza = Cobranza::find($id);
        $cobranza->update($request->all());

        // Cachear variables
        $cobranza->cobranza_historica;
        $cobranza->contrato;

        $this->pusher->trigger('cobranza', 'update', $cobranza);

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
        Cobranza::destroy($id);

        $this->pusher->trigger('cobranza', 'delete', $id);

        return ['deleted' => true];
    }

    /**
     * Obtener cobranzas de cliente
     * 
     * @return \App\Cobranza
     */
    public function cobranzasToken(AuthenticateController $auth) {
        return $auth->getAuthenticatedUser()->cliente->cobranzas()->with('contrato')->get();
    }
    
}
