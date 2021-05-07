@extends('layouts.master')
@section('content')
    <data-table :obj='@json($obj)'>
    </data-table>
@stop
