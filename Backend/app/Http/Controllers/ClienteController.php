<?php

namespace App\Http\Controllers;

use App\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Cliente::with('usuario.rol', 'contratos.plan')->get();
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
        return Cliente::insertGetId([       // Por ahora esta entidad no posee claves foraneas, pero si relaciones
            'cli_rut' => $request->cli_rut,
            'cli_nombres' => $request->cli_nombres,
            'cli_apellidos' => $request->cli_apellidos,
            'cli_numerotelefonico' => $request->cli_numerotelefonico,
            'cli_direccion' => $request->cli_direccion,
            'cli_huella' => $request->cli_huella,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Cliente::find($id);
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
        return Cliente::find($id)->contratos;
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

}
