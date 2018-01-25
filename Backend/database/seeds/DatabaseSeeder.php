<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(NotificacionSeeder::class);
        $this->call(ArchivoNotificacionSeeder::class);

        $this->call(RolTableSeeder::class);
        $this->call(SedeSeeder::class);

        $this->call(ClienteSeeder::class);
        $this->call(UsuarioSeeder::class);

        $this->call(EvaluacionSeeder::class);
        $this->call(ArchivoEvaluacionSeeder::class);
        
        $this->call(SedeUsuarioTableSeeder::class);
    }
}
