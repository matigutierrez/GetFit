<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cliente', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cli_rut', 30);
            $table->string('cli_nombres');
            $table->string('cli_apellidos');
            $table->string('cli_numerotelefonico', 30)->nullable();
            $table->string('cli_direccion')->nullable();
            $table->binary('cli_huella')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cliente');
    }
}
