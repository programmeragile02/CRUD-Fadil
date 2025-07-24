<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AsetMobilController;

Route::middleware(['api'])->group(function () {
    Route::apiResource('aset-mobils', AsetMobilController::class);
});