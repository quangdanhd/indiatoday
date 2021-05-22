@extends('interface_layouts.master', ['title' => isset($obj['title']) ? $obj['title'] : '', 'body_class' => 'front'])
@section('content')
    @include('interface_front.front', ['obj' => $obj])
@stop
