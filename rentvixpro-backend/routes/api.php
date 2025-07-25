<?php

use App\Http\Controllers\AsetMobilController;
use App\Http\Controllers\CrudBuilderController;
use App\Http\Controllers\FrontendBuilderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('/aset-mobils', AsetMobilController::class);

Route::post('/builder/generate-frontend', [FrontendBuilderController::class, 'generate']);

Route::post('/builder/generate', [CrudBuilderController::class, 'generate']);
Route::get('/builder/list-tables', [CrudBuilderController::class, 'listTables']);
Route::apiResource('pengguna', App\Http\Controllers\Api\PenggunaController::class);
Route::apiResource('perusahaan', App\Http\Controllers\Api\PerusahaanController::class);
Route::apiResource('kendaraan', App\Http\Controllers\Api\KendaraanController::class);
Route::apiResource('motor', App\Http\Controllers\Api\MotorController::class);
Route::apiResource('sepeda', App\Http\Controllers\Api\SepedaController::class);