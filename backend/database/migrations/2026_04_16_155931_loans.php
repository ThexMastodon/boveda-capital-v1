<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        {
            Schema::create('loans', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained("users");
                $table->foreignId('client_id')->constrained("clients");
                $table->foreignId('tax_id')->constrained("taxes");
                $table->integer('import');
                $table->integer('lapse');
                $table->integer('pay_date');
                $table->integer('status');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        {
            Schema::dropIfExists('loans');
        }
    }
};
