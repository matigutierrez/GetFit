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

        $this->call(ClienteSeeder::class);
        $this->call(ProfesorSeeder::class);

        $this->call(RolSeeder::class);
        $this->call(SedeSeeder::class);
        $this->call(PlanSeeder::class);

        $this->call(HoraDiaSeeder::class);
        $this->call(DiaSemanaSeeder::class);
        $this->call(HorarioSeeder::class);
        $this->call(ContratoSeeder::class);
        $this->call(AsistenciaSeeder::class);
        $this->call(CobranzaSeeder::class);
        $this->call(MetodoPagoSeeder::class);

        $this->call(FotoSeeder::class);
        $this->call(UsuarioSeeder::class);

        $this->call(EvaluacionSeeder::class);
        $this->call(ArchivoEvaluacionSeeder::class);
        
        $this->call(SedeClienteSeeder::class);
    }
}
