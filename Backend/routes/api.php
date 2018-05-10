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
	Route::get('cliente/{id}/cobranzas', 'ClienteController@cobranzas');
	Route::get('cliente/{id}/planessolicitados', 'ClienteController@planesSolicitados');
	Route::get('clientecobranzas', 'ClienteController@cobranzasToken');
	Route::get('clienteplanes', 'ClienteController@planesToken');
	Route::get('clientenoplanes', 'ClienteController@noPlanesToken');

	Route::apiResource('cobranza', 'CobranzaController');

	Route::apiResource('contrato', 'ContratoController');
	Route::get('contrato/{id}/acta', 'ContratoController@acta');

	Route::apiResource('descuentoCobranza', 'DescuentoCobranzaController');

	Route::apiResource('descuentoPlan', 'DescuentoPlanController');

	Route::apiResource('diasemana', 'DiaSemanaController');

	Route::apiResource('evaluacion', 'EvaluacionController');

	Route::apiResource('foto', 'FotoController');

	Route::apiResource('horadia', 'HoraDiaController');

	Route::apiResource('horario', 'HorarioController');

	Route::apiResource('metodopago', 'MetodoPagoController');

	Route::apiResource('notificacion', 'NotificacionController');

	Route::apiResource('pago', 'PagoController');

	Route::apiResource('plan', 'PlanController');
	Route::get('plan/{id}/profesores', 'PlanController@profesores');
	Route::get('plan/{id}/clientessolicitando', 'PlanController@clientesSolicitando');

	Route::apiResource('profesor', 'ProfesorController');
	Route::get('profesor/{id}/planes', 'ProfesorController@planes');

	Route::apiResource('rol', 'RolController');

	Route::apiResource('sede', 'SedeController');

	Route::apiResource('usuario', 'UsuarioController');
	Route::get('usuariorol', 'UsuarioController@rolSesion');
	Route::get('usuario/{id}/rol', 'UsuarioController@rol');
	Route::get('usuario/{id}/cliente', 'UsuarioController@cliente');
	Route::get('usuario/{id}/sedes', 'UsuarioController@sedes');
	Route::get('usuario/{id}/notificaciones', 'UsuarioController@notificaciones');

});

Route::post('login', 'AuthenticateController@authenticate');

Route::get('webpay/pagar/{id}', 'WebpayController@pagar');
Route::post('webpay/response', 'WebpayController@response');
Route::post('webpay/thanks', 'WebpayController@thanks');
Route::any('webpay/boleta', 'WebpayController@boleta');