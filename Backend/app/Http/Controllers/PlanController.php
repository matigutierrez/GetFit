<?php

namespace App\Http\Controllers;

use App\Plan;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;
use JWTAuth;

class PlanController extends Controller
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
    public function index(AuthenticateController $auth)
    {
        $usuario = $auth->getAuthenticatedUser();
        
        switch ($usuario->rol->rol_nombre) {
            case 'Administrador':
                return Plan::with(['horarios','contratos.cliente','sede'])->get();
            case 'Profesor':
                return Plan::with(['horarios','sede'])->get();
            case 'Cliente':
                $contratos = $usuario->cliente->contratos;
                $planes = $contratos->pluck('plan');

                // Indicar que el plan fue contratado
                foreach ($planes as $plan) {
                    $plan->contratado = true;
                }

                $planes = $planes->merge( Plan::all() );
                $planes->pluck('horarios');
                $planes->pluck('sede');

                return $planes->unique('id');
        }

        return null;
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
        $plan = new Plan;
        $plan->tgf_sede_id = $request->tgf_sede_id;
        $plan->pla_nombre = $request->pla_nombre;
        $plan->pla_descripcion = $request->pla_descripcion;
        $plan->pla_costo = $request->pla_costo;
        $plan->pla_capacidad = $request->pla_capacidad;

        $plan->save();

        // Cachear variables
        $plan->horarios;
        $plan->contratos->pluck('cliente');
        $plan->sede;

        $this->pusher->trigger('plan', 'create', $plan);

        return $plan->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Plan::with('horarios', 'contratos')
            ->withCount('contratos')
            ->find($id);
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
        $plan = Plan::with('horarios', 'contratos.cliente', 'sede')->find($id);
        $plan->update($request->all());

        $this->pusher->trigger('plan', 'update', $plan);

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
        Plan::destroy($id);

        $this->pusher->trigger('plan', 'delete', $id);

        return ['deleted' => true];
    }

    /**
     * Obtener los contratos de un plan
     * 
     * @param  int  $id
     * @return \App\Contrato
     */
    public function contratos($id) {
        return Plan::find($id)->contratos()->with('cliente.usuario', 'plan')->get();
    }

    /**
     * Obtener los profesores de un plan
     * 
     * @param  int  $id
     * @return \App\Profesor
     */
    public function profesores($id) {
        return Plan::find($id)->profesores;
    }

    /**
     * Obtener los horarios de un plan
     * 
     * @param  int  $id
     * @return \App\Horario
     */
    public function horarios($id) {
        return Plan::find($id)->horarios;
    }

    /**
     * Obtener todos los clientes de un plan
     * 
     * @param  int  $id
     * @return \App\Cliente
     */
    public function clientes($id) {

        $clientes = Plan::find($id)->clientes;
        $clientes->pluck('usuario');

        return $clientes;
    }

    /**
     * Obtener la lista de clientes que solicitan un plan
     * 
     * @param  int  $id
     * @return \App\Cliente
     */
    public function clientesSolicitando($id) {
        return Plan::find($id)->clientesSolicitando;
    }
    
}
