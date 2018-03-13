<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Freshwork\Transbank\CertificationBagFactory;
use Freshwork\Transbank\TransbankServiceFactory;
use Freshwork\Transbank\RedirectorHelper;

use App\Cobranza;
use App\MetodoPago;
use App\Pago;

use PDF;

class WebpayController extends Controller
{

    private $bag;

    public function __construct() {

        $this->bag = CertificationBagFactory::integrationWebpayNormal();

    }

    public function pagar($id, Request $request) {
        // Buscar cobranza
        $cobranza = Cobranza::find($id);

        // Validar que la cobranza existe
        if ( isset($cobranza) ) {
            // Iniciar pago por webpay
            $plus = TransbankServiceFactory::normal($this->bag);
            $plus->addTransactionDetail( $cobranza->cob_monto, $cobranza->id );
            $response = $plus->initTransaction(
                $request->getSchemeAndHttpHost() . '/api/webpay/response',
                $request->getSchemeAndHttpHost() . '/api/webpay/thanks'
            );
            return RedirectorHelper::redirectHTML($response->url, $response->token);
        }
        
    }

    public function response() {
        // Respuesta a transaccion
        $plus = TransbankServiceFactory::normal($this->bag);
        $response = $plus->getTransactionResult();
        $detalle = $response->detailOutput;

        if ( $detalle->responseCode == 0 ) {
            // Transaccion exitosa
            $id = $detalle->buyOrder;
            $monto = $detalle->amount;

            // Buscar cobranza
            $cobranza = Cobranza::find($id);

            // Existe cobranza?
            if ( isset($cobranza) ) {
                // El monto de la cobranza es el mismo?
                if ( $cobranza->cob_monto == $monto ) {
                    // Validar transaccion
                    $plus->acknowledgeTransaction();

                    // Metodo de pago Webpay
                    $metodoPago = MetodoPago::where('mep_nombre', 'Webpay Normal')->get()->last();

                    // Crear nuevo pago
                    $pago = new Pago;
                    $pago->tgf_metodo_pago_id = $metodoPago->id;
                    $pago->tgf_cobranza_id = $cobranza->id;

                    // Guardar pago
                    $pago->save();
                }

            }

        }

        return RedirectorHelper::redirectBackNormal($response->urlRedirection);
    }

    public function thanks() {
        return "Gracias por su compra";
    }

    public function boleta() {
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
