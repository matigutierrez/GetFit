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
	Route::get('cliente/{id}/cobranzashistoricas', 'ClienteController@cobranzas_historicas');
	Route::get('cliente/{id}/solicitudes', 'ClienteController@solicitudesPlan');
	Route::get('clientecontratos', 'ClienteController@contratosToken');
	Route::get('clientesolicitudes', 'ClienteController@solicitudesPlanToken');

	Route::apiResource('cobranza', 'CobranzaController');
	Route::get('cobranzastoken', 'CobranzaController@cobranzasToken');

	Route::apiResource('cobranzahistorica', 'CobranzaHistoricaController');

	Route::apiResource('contrato', 'ContratoController');
	Route::get('contrato/{id}/acta', 'ContratoController@acta');
	Route::get('contrato/find/{cliente_id}/{plan_id}', 'ContratoController@find');
	Route::get('contrato/findtoken/{plan_id}', 'ContratoController@findToken');

	Route::apiResource('contratohistorico', 'ContratoHistoricoController');

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
	Route::get('plan/{id}/clientes', 'PlanController@clientes');
	Route::get('plan/{id}/clientessolicitando', 'PlanController@clientesSolicitando');
	Route::get('plan/{id}/horarios', 'PlanController@horarios');
	Route::get('plan/{id}/contratos', 'PlanController@contratos');
	Route::get('plan/{id}/contratoshistoricos', 'PlanController@contratosHistoricos');
	Route::get('plan/{id}/contratoscobranzas', 'PlanController@contratosCobranzas');
	Route::get('plan/{id}/contratoscobranzashistoricas', 'PlanController@contratosCobranzasHistoricas');
	Route::get('plan/{id}/solicitudes', 'PlanController@solicitudesPlan');

	Route::apiResource('profesor', 'ProfesorController');
	Route::get('profesor/{id}/planes', 'ProfesorController@planes');

	Route::apiResource('rol', 'RolController');

	Route::apiResource('sede', 'SedeController');

	Route::apiResource('solicitudplan', 'SolicitudPlanController');
	Route::get('solicitudplan/findtoken/{plan_id}', 'SolicitudPlanController@findToken');
	Route::get('solicitudplan/solicitar/{plan_id}', 'SolicitudPlanController@solicitar');

	Route::apiResource('tipoplan', 'TipoPlanController');

	Route::apiResource('usuario', 'UsuarioController');
	Route::get('usuariorol', 'UsuarioController@rolSesion');
	Route::get('usuario/{id}/rol', 'UsuarioController@rol');
	Route::get('usuario/{id}/cliente', 'UsuarioController@cliente');
	Route::get('usuario/{id}/notificaciones', 'UsuarioController@notificaciones');

});

Route::post('login', 'AuthenticateController@authenticate');

Route::get('webpay/pagar/{id}', 'WebpayController@pagar');
Route::post('webpay/response', 'WebpayController@response');
Route::post('webpay/thanks', 'WebpayController@thanks');
Route::any('webpay/boleta', 'WebpayController@boleta');