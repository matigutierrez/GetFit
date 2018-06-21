<?php

namespace App\Http\Controllers;

use App\DisponibilidadServicio;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;
use Carbon\Carbon;

class DisponibilidadServicioController extends Controller
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
        return DisponibilidadServicio::all();
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
        $disponibilidad = new DisponibilidadServicio;
        $disponibilidad->tgf_servicio_id = $request->tgf_servicio_id;
        $disponibilidad->dse_fecha_inicio = Carbon::parse($request->dse_fecha_inicio)->toDateTimeString();
        $disponibilidad->dse_fecha_fin = Carbon::parse($request->dse_fecha_fin)->toDateTimeString();

        $disponibilidad->save();

        // Cachear servicio
        $disponibilidad->servicio;

        $this->pusher->trigger('disponibilidadServicio', 'create', $disponibilidad);
        
        return $disponibilidad->id;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DisponibilidadServicio::find($id);
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
        $disponibilidad = DisponibilidadServicio::find($id);
        $disponibilidad->update([
            'tgf_servicio_id' => $request->tgf_servicio_id,
            'dse_fecha_inicio' => Carbon::parse($request->dse_fecha_inicio)->toDateTimeString(),
            'dse_fecha_fin' => Carbon::parse($request->dse_fecha_fin)->toDateTimeString()
        ]);

        // Cachear servicio
        $disponibilidad->servicio;

        $this->pusher->trigger('disponibilidadServicio', 'update', $disponibilidad);

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
        DisponibilidadServicio::destroy($id);

        $this->pusher->trigger('disponibilidadServicio', 'delete', $id);

        return ['deleted' => true];
    }
}
