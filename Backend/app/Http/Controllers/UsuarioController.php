<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Usuario::all();
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
        return Usuario::insertGetId([
            'tgf_rol_id' => $request->tgf_rol_id,
            'tgf_cliente_id' => $request->tgf_cliente_id,
            'usu_correo' => $request->usu_correo,
            'password' => bcrypt($request->usu_pass),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Usuario::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);
        $usuario->update($request->all());
        return ['updated' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Usuario::destroy($id);
        return ['deleted' => true];
    }

    /**
     * Obtener el rol del usuario con sesion
     *
     * @param  int $id
     * @return \App\Rol
     */
    public function rolSesion(AuthenticateController $auth) {
        return Usuario::with('rol')->where('id', $auth->getAuthenticatedUser()->id)->first();;
    }

    /**
     * Obtener el rol del usuario
     *
     * @param  int $id
     * @return \App\Rol
     */
    public function rol($id) {
        return Usuario::find($id)->rol;
    }

    /**
     * Obtener el cliente del usuario
     *
     * @param  int $id
     * @return \App\Cliente
     */
    public function cliente($id) {
        return Usuario::find($id)->cliente;
    }

    /**
     * Obtener las sedes del usuario
     *
     * @param  int $id
     * @return \App\Sede
     */
    public function sedes($id) {
        return Usuario::find($id)->sedes;
    }

    /**
     * Obtener las notificaciones del usuario
     *
     * @param  int $id
     * @return \App\Notificacion
     */
    public function notificaciones($id) {
        return Usuario::find($id)->notificaciones;
    }

}
