<?php

namespace App\Http\Controllers;

use App\Sede;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class SedeController extends Controller
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
        return Sede::all();
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
        $sede = new Sede;
        $sede->sed_nombre = $request->sed_nombre;
        $sede->sed_direccion = $request->sed_direccion;

        $sede->save();

        $this->pusher->trigger('sede', 'create', $sede);

        return $sede->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Sede::find($id);
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
        $sede = Sede::find($id);
        $sede->update($request->all());

        $this->pusher->trigger('sede', 'update', $sede);

        return ['update' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Sede::destroy($id);

        $this->pusher->trigger('sede', 'delete', $id);

        return ['delete' => true];
    }

    /**
     * Obtener los clientes de una sede
     * 
     * @param  int  $id
     * @return \App\Cliente
     */
    public function clientes($id) {
        return Sede::find($id)->clientes;
    }
}
