<?php

namespace App\Http\Controllers\Auth;

use App\Models\admins;
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
            return Redirect::to('admin')->send();
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
        $admin = (new admins)->getAuth($username, $password);
        if ($admin) {
            Auth::login($admin);
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
