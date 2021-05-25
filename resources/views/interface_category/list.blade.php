<h1 class="category-heading">{{$obj['title']}}</h1>
<div class="view view-category-wise-content-list view-id-category_wise_content_list view-display-id-section_wise_content_listing view-dom-id- custom">
    <div class="view-content">
        @if(isset($obj['list']))
            @foreach($obj['list'] as $key => $value)
                <div class="catagory-listing">
                    <div class="pic ">
                        <img class="lazyload" src="{{ asset('/img/itg_image170x127.jpg') }}" data-src="{{$value->image}}" alt="{{$value->title}}" title="{{$value->title}}">
                    </div>
                    <div class="detail">
                        <h2 class="" title="{{$value->title}}">
                            <a href="/{{$value->url}}">{{$value->title}}</a>
                        </h2>
                        <p>{{$value->describe}}</p>
                    </div>
                </div>
            @endforeach
        @endif
    </div>
    <h2 class="element-invisible">Pages</h2>
    <div class="item-list">
        @include('interface_pagination.default', ['paginator' => $obj['list']])
    </div>
</div>
