@extends('interface_layouts.master', ['title' => isset($obj['title']) ? $obj['title'] : '', 'body_class' => 'not-front'])
@section('breadcrumb')
    <div id="block-itg-layout-manager-front-end-breadcrumb" class="block block-itg-layout-manager last odd">
        <div class="container">
            <div>
                <div class="lft pathone">
                    <a href="/" itemprop="item">
                        <span itemprop="name">Home</span>
                    </a>
                    <meta itemprop="position" content="1">
                </div>
                <div itemprop="itemListElement" class="lft pathone">
                    <a href="/{{$obj['detail']->link}}" itemprop="item">
                        <span class="sec_name" itemprop="name">{{$obj['detail']->name}}</span>
                    </a>
                    <meta itemprop="position" content="2">
                </div>
                <span class="content_name">{{$obj['title']}}</span>
            </div>
        </div>
    </div>
@stop
@section('content')
    @include('interface_detail.main', ['obj' => $obj])
@stop
