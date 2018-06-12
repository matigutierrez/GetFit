<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfesorImparteGrupoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesor_imparte_grupo', function (Blueprint $table) {
            $table->integer('tgf_profesor_id')->unsigned();
            $table->foreign('tgf_profesor_id')->references('id')->on('tgf_profesor')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('tgf_grupo_id')->unsigned();
            $table->foreign('tgf_grupo_id')->references('id')->on('tgf_grupo')->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['tgf_profesor_id', 'tgf_grupo_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesor_imparte_grupo');
    }
}
