<?php

namespace App\Http\Controllers;

use App\Profesor;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class ProfesorController extends Controller
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
        return Profesor::all();
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
        $profesor = new Profesor;
        $profesor->pro_rut = $request->pro_rut;
        $profesor->pro_nombres = $request->pro_nombres;
        $profesor->pro_apellidos = $request->pro_apellidos;
        $profesor->pro_numerotelefonico = $request->pro_numerotelefonico;
        $profesor->pro_direccion = $request->pro_direccion;

        $profesor->save();

        $this->pusher->trigger('profesor', 'create', $profesor);

        return $profesor->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Profesor::find($id);
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
        $profesor = Profesor::find($id);
        $profesor->update($request->all());

        $profesor->pluck('usuario.rol');

        $this->pusher->trigger('profesor', 'update', $profesor);

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
        Profesor::destroy($id);

        $this->pusher->trigger('profesor', 'delete', $id);

        return ['deleted' => true];
    }

    /**
     * Retorna los planes de un profesor
     * 
     * @param  int  $id
     * @return \App\Plan
     */
    public function planes($id) {
        return Profesor::find($id)->planes;
    }
}
