<div class="container">
    <ul class="second-level-menu menu" style="">
        <li class="nav-items ripple-effect hide-md">
            <a href="/" class="second-level-child second-level-child-0 notactive notactive url-type-external">
                <img src="{{ asset('/img/logo.png') }}" alt="Home" class="logo-menu" style="height: 37px;">
            </a>
        </li>
        @include('interface_layouts.menu_desktop')
    </ul>
    @include('interface_layouts.menu_mobile')
</div>
