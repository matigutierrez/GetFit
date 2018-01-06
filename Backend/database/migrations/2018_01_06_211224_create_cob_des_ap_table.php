<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
// Descuentos aplicados a una cobranza
class CreateCobDesApTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cda', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cobranza_id')->unsigned();
            $table->foreign('tgf_cobranza_id')->references('id')->on('tgf_cobranza')->onDelete('cascade')->onUpdate('cascade');
            $table->text('cda_descripcion');
            $table->integer('cda_cantidad');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cda');
    }
}
