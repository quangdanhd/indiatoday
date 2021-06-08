<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    @isset($title)
        <title>{{ $title }}</title>
    @else
        <title>IndiaToday</title>
    @endisset
    @include('interface_layouts.head_tag')
    <script>
        let dark = localStorage.getItem('dark_mode');
        if (!!parseInt(dark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    </script>
    @yield('plugins')
</head>
<body class="html {{$body_class}} not-logged-in one-sidebar sidebar-second page-node page-node- page-node-2 node-type-page">
<p id="skip-link">
    <a href="https://www.indiatoday.in/#main-menu" class="element-invisible element-focusable">Jump to navigation</a>
</p>
<div id="page">
    <header class="header" id="header" role="banner">
        <section class="header-top">
            <div class="header__region region region-header">
                @include('interface_layouts.header')
                @yield('breadcrumb')
            </div>
        </section>
    </header>
    <main id="main" class="container">
        @yield('content')
    </main>
    @include('interface_layouts.footer')
</div>
<div class="goToTop">
    <span class="goToTopIcon">
        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"></path>
            <path d="M0 0h48v48h-48z" fill="none"></path>
        </svg>
    </span>
</div>
<script src="{{ mix('/js/app_interface.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js" integrity="sha512-2hIlk2fL+NNHkULe9gGdma/T5vSYk80U5tvAFSy3dGEl8XD4h2i6frQvHv5B+bm/Itmi8nJ6krAcj5FWFcBGig==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    document.addEventListener('DOMContentLoaded', function (event) {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 750) {
                jQuery('.goToTop').addClass("showGototop");
            } else {
                jQuery('.goToTop').removeClass("showGototop");
            }
        });
        jQuery(".goToTop").click(function () {
            jQuery("body,html").animate({scrollTop: 0}, 800)
        });
    });
    jQuery(document).mouseup(function (e) {
        let container = jQuery('#newlist');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
    jQuery('.drkmode label').click(function () {
        let html = jQuery('html');
        let dark = html.attr('data-theme');
        let theme = 'light';
        if (dark === 'light') {
            theme = 'dark';
        }
        localStorage.setItem('dark_mode', theme === 'dark' ? '1' : '0');
        html.attr('data-theme', theme);
    });
    if (window.innerWidth >= 768) {
        jQuery('.top_stories_ordering .data-holder').mCustomScrollbar();
    }
</script>
@yield('scripts')
</body>
</html>
