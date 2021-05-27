<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="description" content="Admin"/>
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="locale" content="{{ App::getLocale() }}"/>
<link rel="shortcut icon" href={{ asset('favi.png') }} />
<link rel="stylesheet" href="{{ mix('/css/app.css') }}">
<script>
    window.report_config = JSON.parse('{!! json_encode(config('constants.field')) !!}');
    window.explode_filter = JSON.parse('{!! json_encode(config('constants.explode_filter')) !!}');
    window.menu_config = JSON.parse('{!! json_encode(config('menu')[1]) !!}');
</script>
<script src="{{ mix('/js/app.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.5.1/tinymce.min.js"></script>
