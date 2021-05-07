<?php

namespace App\Http\Controllers\Auth;

use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

class LoginController extends BaseController
{
    public function index()
    {
        if (Auth::check()) {
            return Redirect::to('')->send();
        }
        return View::make('auth/login');
    }

    public function login(Request $request)
    {
        $username = $request->get('username');
        $password = $request->get('password');
        if (!$username || !$password) {
            return 'Tài khoản & mật khẩu không được để trống!';
        }
        $user = (new user)->getAuth($username, $password);
        if ($user) {
            Auth::login($user);
            return 'success';
        } else {
            return 'Sai tài khoản hoặc mật khẩu!';
        }
    }

    public function logout()
    {
        Auth::logout();
        return Redirect::to('login')->send();
    }
}
