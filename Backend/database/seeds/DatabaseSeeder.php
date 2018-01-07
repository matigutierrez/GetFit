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
        $this->call(NotificacionTableSeeder::class);
        $this->call(RolTableSeeder::class);
        $this->call(SedeSeeder::class);
        $this->call(ClienteSeeder::class);
        $this->call(UsuarioSeeder::class);
    }
}
