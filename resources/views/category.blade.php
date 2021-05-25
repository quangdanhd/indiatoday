@extends('interface_layouts.master', ['title' => isset($obj['title']) ? $obj['title'] : '', 'body_class' => 'not-front'])
@section('content')
    @include('interface_category.main', ['obj' => $obj])
@stop
