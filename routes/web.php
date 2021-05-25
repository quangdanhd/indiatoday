<?php

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\NewsController;
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
// Admin
Route::group(['namespace' => 'Admin'], function () {
    Route::get('/admin', [HomeController::class, 'index'])->name('home');
    // News
    Route::resource('admin-news', '\App\Http\Controllers\Admin\NewsController', [
        'only' => ['index', 'create', 'store', 'edit', 'update']
    ]);
    // User
    //Route::resource('users', '\App\Http\Controllers\UserController', [
    //    'only' => ['index', 'create', 'store', 'edit', 'update']
    //]);
    // generate_sample_data
    Route::get('/generate-sample-data', [NewsController::class, 'generate']);
});
// Home
Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);
// Category
Route::get('/category/{url}', [App\Http\Controllers\HomeController::class, 'category']);
// News View
Route::get('/{url}', [App\Http\Controllers\HomeController::class, 'show']);
