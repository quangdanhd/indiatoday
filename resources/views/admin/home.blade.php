@extends('layouts.master')
@section('content')
    <chart-home :obj='@json($obj)'></chart-home>
@stop
