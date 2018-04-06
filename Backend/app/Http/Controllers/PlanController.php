<?php

namespace App\Http\Controllers;

use App\Plan;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

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
    public function index()
    {
        return Plan::with('horarios','contratos.cliente','sede')->get();
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

        $plan->save();
        $plan->pluck(['horarios', 'contratos.cliente', 'sede']);

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
        return Plan::find($id);
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
        $plan = Plan::find($id);
        $plan->update($request->all());
        $plan->pluck(['horarios', 'contratos.cliente', 'sede']);

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
}
