@extends('layouts.master')
@section('content')
    <get-news :obj='@json($obj)'></get-news>
@stop
@section('scripts')
    <script>
        (function () {
            'use strict';
            $(document).on('submit', 'form.needs-validation', function (e) {
                if (this.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.classList.add('was-validated');
            });
        })();
    </script>
@endsection
