<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\View;

class AdminHomeController extends Controller
{
    public function index()
    {
        return View::make('admin/home');
    }
}
