<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        // Kernel.php
        // $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (!Auth::check()) {
                $obj = menu_category();
                $obj['title'] = '404 | Not Found';
                return new response(view('errors.404_custom')->with('obj', $obj));
                // return Redirect::to('login')->send();
            }
            return $next($request);
        });
    }
}
