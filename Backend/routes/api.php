<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['jwt.auth']], function () {

	Route::apiResource('archivoEvaluacion', 'ArchivoEvaluacionController');

	Route::apiResource('archivoNotificacion', 'ArchivoNotificacionController');

	Route::apiResource('asistencia', 'AsistenciaController');

	Route::apiResource('cliente', 'ClienteController');
	Route::get('cliente/{id}/usuario', 'ClienteController@usuario');
	Route::get('cliente/{id}/evaluaciones', 'ClienteController@evaluaciones');
	Route::get('cliente/{id}/fotos', 'ClienteController@fotos');
	Route::get('cliente/{id}/contratos', 'ClienteController@contratos');
	Route::get('cliente/{id}/huella', 'ClienteController@huella');

	Route::apiResource('cobranza', 'CobranzaController');

	Route::apiResource('contrato', 'ContratoController');

	Route::apiResource('descuentoCobranza', 'DescuentoCobranzaController');

	Route::apiResource('descuentoPlan', 'DescuentoPlanController');

	Route::apiResource('evaluacion', 'EvaluacionController');

	Route::apiResource('foto', 'FotoController');

	Route::apiResource('horario', 'HorarioController');

	Route::apiResource('metodopago', 'MetodoPagoController');

	Route::apiResource('notificacion', 'NotificacionController');

	Route::apiResource('pago', 'PagoController');

	Route::apiResource('plan', 'PlanController');

	Route::apiResource('rol', 'RolController');

	Route::apiResource('sede', 'SedeController');

	Route::apiResource('usuario', 'UsuarioController');
	Route::get('usuario/rol', 'UsuarioController@rolSesion');
	Route::get('usuario/{id}/rol', 'UsuarioController@rol');
	Route::get('usuario/{id}/cliente', 'UsuarioController@cliente');
	Route::get('usuario/{id}/sedes', 'UsuarioController@sedes');
	Route::get('usuario/{id}/notificaciones', 'UsuarioController@notificaciones');

});

Route::post('login', 'AuthenticateController@authenticate');