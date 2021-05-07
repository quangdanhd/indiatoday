<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DataSearch\DataFormIndexSearch;
use App\Http\Controllers\DataSearch\DataTableIndexSearch;
use Illuminate\Support\Facades\Route;

// Login
Route::group(['namespace' => 'Auth'], function () {
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'login']);
    Route::get('logout', [LoginController::class, 'logout']);
});
// Data Search
Route::group(['namespace' => 'DataSearch'], function () {
    Route::post('form-index', [DataFormIndexSearch::class, 'index']);
    Route::post('data-table-index', [DataTableIndexSearch::class, 'index']);
});
// Home
Route::get('/', function () {
    return view('welcome');
});
// Admin
Route::get('/admin', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Product
Route::resource('products', '\App\Http\Controllers\ProductController', [
    'only' => ['index', 'create', 'store', 'edit', 'update']
]);
// User
Route::resource('users', '\App\Http\Controllers\UserController', [
    'only' => ['index', 'create', 'store', 'edit', 'update']
]);
