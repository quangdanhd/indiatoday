@extends('layouts.master', ['title' => trans('database.list_' . $obj['table_name'])])
@section('content')
    <data-form-index :obj='@json($obj)'></data-form-index>
@endsection
