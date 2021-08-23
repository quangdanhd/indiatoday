@extends('layouts.master')
@section('content')
    <admin-settings :obj='@json($obj)'></admin-settings>
@stop
