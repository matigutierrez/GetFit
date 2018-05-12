<?php

namespace App\Http\Controllers;

use App\Horario;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class HorarioController extends Controller
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
        return Horario::get();
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
        $horario = new Horario;
        $horario->tgf_hora_dia_id = $request->tgf_hora_dia_id;
        $horario->tgf_dia_semana_id = $request->tgf_dia_semana_id;
        $horario->tgf_plan_id = $request->tgf_plan_id;
        $horario->hor_recuperativo = $request->hor_recuperativo;
        $horario->hor_inactivo = $request->hor_inactivo;

        $horario->save();

        $this->pusher->trigger('horario', 'create', $horario);

        return $horario->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Horario::find($id);
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
        $horario = Horario::find($id);
        $horario->update($request->all());

        $this->pusher->trigger('horario', 'update', $horario);

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
        Horario::destroy($id);

        $this->pusher->trigger('horario', 'delete', $id);

        return ['deleted' => true];
    }
}
