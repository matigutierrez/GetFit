<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Freshwork\Transbank\CertificationBagFactory;
use Freshwork\Transbank\TransbankServiceFactory;
use Freshwork\Transbank\RedirectorHelper;

//use PDF;
use PDF;
//use Elibyy\TCPDF\Facades\TCPDF;

class WebpayController extends Controller
{

    private $bag;

    public function __construct() {

        $this->bag = CertificationBagFactory::integrationWebpayNormal();

    }

    public function index(Request $request) {
        // Crear una transaccion
        $plus = TransbankServiceFactory::normal($this->bag);
        $plus->addTransactionDetail(100, "CODIGOBLABLABLA");
        $response = $plus->initTransaction(
            $response->getSchemeAndHttpHost() . '/api/webpay/response',
            $response->getSchemeAndHttpHost() . '/api/webpay/thanks'
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
        return "Gracias por su compra";
    }

    public function test() {
        /*
        $pdf = PDF::loadView('boleta');
        $pdf->setPaper([0, 0, 250, 700]);
        $pdf->setWarnings(false);
        return $pdf->stream();
        */

        $view = \View::make('boleta');
        $HTML = $view->render();

        PDF::SetPrintHeader(false);
        PDF::SetMargins(3, 0, 3, true);
        PDF::setJPEGQuality(100);
        PDF::setTextShadow(['enabled' => false]);
        PDF::AddPage('P', [75, 120]);
        PDF::SetTitle("Boleta Electrónica");
        PDF::writeHTML($HTML, true, false, true, false, '');
        
        PDF::Output('boleta.pdf', 'I');
    }

}
