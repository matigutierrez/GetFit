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
	Route::get('cliente/{id}/solicitudes', 'ClienteController@solicitudesGrupo');
	Route::get('clientecontratos', 'ClienteController@contratosToken');
	Route::get('clientesolicitudes', 'ClienteController@solicitudesGrupoToken');

	Route::apiResource('cobranza', 'CobranzaController');
	Route::get('cobranzastoken', 'CobranzaController@cobranzasToken');

	Route::apiResource('cobranzahistorica', 'CobranzaHistoricaController');

	Route::apiResource('cobranzahistoricaservicio', 'CobranzaHistoricaServicioController');

	Route::apiResource('cobranzaservicio', 'CobranzaServicioController');

	Route::apiResource('contrato', 'ContratoController');
	Route::get('contrato/{id}/acta', 'ContratoController@acta');
	Route::get('contrato/find/{cliente_id}/{tgf_grupo_id}', 'ContratoController@find');
	Route::get('contrato/findtoken/{tgf_grupo_id}', 'ContratoController@findToken');

	Route::apiResource('contratohistorico', 'ContratoHistoricoController');

	Route::apiResource('diasemana', 'DiaSemanaController');

	Route::apiResource('disponibilidadservicio', 'DisponibilidadServicioController');

	Route::apiResource('evaluacion', 'EvaluacionController');

	Route::apiResource('foto', 'FotoController');

	Route::apiResource('horadia', 'HoraDiaController');

	Route::apiResource('horario', 'HorarioController');

	Route::apiResource('metodopago', 'MetodoPagoController');

	Route::apiResource('notificacion', 'NotificacionController');

	Route::apiResource('pago', 'PagoController');

	Route::apiResource('grupo', 'GrupoController');
	Route::get('grupo/{id}/profesores', 'GrupoController@profesores');
	Route::get('grupo/{id}/clientes', 'GrupoController@clientes');
	Route::get('grupo/{id}/horarios', 'GrupoController@horarios');
	Route::get('grupo/{id}/contratos', 'GrupoController@contratos');
	Route::get('grupo/{id}/contratoshistoricos', 'GrupoController@contratosHistoricos');
	Route::get('grupo/{id}/contratoscobranzas', 'GrupoController@contratosCobranzas');
	Route::get('grupo/{id}/contratoscobranzashistoricas', 'GrupoController@contratosCobranzasHistoricas');
	Route::get('grupo/{id}/solicitudes', 'GrupoController@solicitudes');

	Route::apiResource('profesor', 'ProfesorController');
	Route::get('profesor/{id}/grupos', 'ProfesorController@grupos');

	Route::apiResource('rol', 'RolController');

	Route::apiResource('sede', 'SedeController');

	Route::apiResource('servicio', 'ServicioController');

	Route::apiResource('solicitudgrupo', 'SolicitudGrupoController');
	Route::get('solicitudgrupo/findtoken/{tgf_grupo_id}', 'SolicitudGrupoController@findToken');
	Route::get('solicitudgrupo/solicitar/{tgf_grupo_id}', 'SolicitudGrupoController@solicitar');

	Route::apiResource('tipogrupo', 'TipoGrupoController');

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