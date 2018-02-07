<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Freshwork\Transbank\CertificationBagFactory;
use Freshwork\Transbank\TransbankServiceFactory;
use Freshwork\Transbank\RedirectorHelper;

class WebpayController extends Controller
{

    private $bag;

    public function __construct() {

        $this->bag = CertificationBagFactory::integrationWebpayNormal();

    }

    public function index() {
        // Crear una transaccion
        $plus = TransbankServiceFactory::normal($this->bag);
        $plus->addTransactionDetail(100, "CODIGOBLABLABLA");
        $response = $plus->initTransaction(
            'http://localhost:8000/api/webpay/response',
            'http://localhost:8000/api/webpay/thanks'
        );
        return RedirectorHelper::redirectHTML($response->url, $response->token);
    }

    public function response() {
        // Respuesta a transaccion
        $plus = TransbankServiceFactory::normal($this->bag);
        $response = $plus->getTransactionResult();
        $detalle = $response->detailOutput;

        if ( $detalle->responseCode == 0 ) {
            // Transaccion exitosa
            $codigoTransaccion = $detalle->buyOrder;
            $montoRecibido = $detalle->amount;

            // Validar que el monto recibido es el mismo que el de la cobranza
            $plus->acknowledgeTransaction();
        }

        return RedirectorHelper::redirectBackNormal($response->urlRedirection);
    }

    public function thanks() {
        return "Hola mundo!";
    }

}
