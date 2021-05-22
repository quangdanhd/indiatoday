const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js').vue()
    .js('resources/js/app_interface.js', 'public/js').vue()
    .sass('resources/sass/app.scss', 'public/css').version()
    .sass('resources/sass/app_interface.scss', 'public/css').version();
