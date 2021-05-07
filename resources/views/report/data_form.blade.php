@extends('layouts.master', ['title' => $obj['title']])
@section('content')
    @if(isset($obj['back_link']) && $obj['back_link'])
        <div class="mb-1" style="margin-top: -10px;">
            <a href="{{$obj['back_link']['link']}}" style="background: #eee; color: #777; padding: 2px 10px;">
                <i class="fas fa-angle-double-left"></i>
                {{$obj['back_link']['title']}}
            </a>
        </div>
    @endif
    <div>
        <h4 class="mb-0">{{$obj['title']}}</h4>
    </div>
    <data-form :obj='@json($obj)'></data-form>
@endsection

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
