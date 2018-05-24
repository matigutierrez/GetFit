<?php

namespace App\Http\Controllers;

use App\SolicitudPlan;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class SolicitudPlanController extends Controller
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
        return SolicitudPlan::all();
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
        $solicitudPlan = new SolicitudPlan;
        $solicitudPlan->tgf_cliente_id = $request->tgf_cliente_id;
        $solicitudPlan->tgf_plan_id = $request->tgf_plan_id;

        $solicitudPlan->save();

        // Cachear cliente y plan
        $solicitudPlan->cliente->usuario;
        $solicitudPlan->plan;

        $this->pusher->trigger('solicitudPlan', 'create', $solicitudPlan);

        return $solicitudPlan->id;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SolicitudPlan::find($id);
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
        $solicitudPlan = SolicitudPlan::find($id);
        $solicitudPlan->update($request->all());

        // Cachear cliente y plan
        $solicitudPlan->cliente->usuario;
        $solicitudPlan->plan;
        
        $this->pusher->trigger('solicitudPlan', 'update', $solicitudPlan);

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
        SolicitudPlan::destroy($id);

        $this->pusher->trigger('solicitudPlan', 'delete', $id);

        return ['deleted' => true];
    }
}
