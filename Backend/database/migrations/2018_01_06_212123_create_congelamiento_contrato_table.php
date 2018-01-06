<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCongelamientoContratoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cong_cont', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_contrato_id')->unsigned();
            $table->foreign('tgf_contrato_id')->references('id')->on('tgf_contrato')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('coc_fecha');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cong_cont');
    }
}
