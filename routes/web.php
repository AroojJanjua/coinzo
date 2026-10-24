<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScoreController;

Route::view('/', 'game')->name('game');
Route::get('/scores', [ScoreController::class, 'index'])->name('scores.index');
Route::post('/scores', [ScoreController::class, 'store'])->middleware('throttle:20,1')->name('scores.store');
