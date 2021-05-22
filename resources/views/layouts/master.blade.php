<!DOCTYPE html>
<html lang="vi">
<head>
    @isset($title)
        <title>{{ $title }}</title>
    @else
        <title>Admin</title>
    @endisset
    @include('layouts.head_tag')
    @yield('plugins')
</head>
<body>
<div id="app">
    <header>
        <div class="menu_acumatica">
            <div class="mr-3">
                <child-menu-toggle></child-menu-toggle>
            </div>
            <div class="menu1-timeuser">
                <main-menu></main-menu>
                <div class="time-user float-right">
                    <div class="user">
                        <div class="dropdown">
                            <a class="btn btn-secondary dropdown-toggle user-1" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tài khoản</a>
                            <div class="dropdown-menu user-3" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item user-2" href="/logout"><i class="fas fa-sign-out-alt"></i>
                                    SignOut</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-main-menu menu-2">
            <sub-menu></sub-menu>
        </div>
    </header>
    <div class="body">
        <child-menu></child-menu>
        <div class="container-fluid pl-4 pt-3 bao-cao report-container">
            @yield('content')
        </div>
    </div>
</div>
@yield('scripts')
<script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
</body>
</html>
