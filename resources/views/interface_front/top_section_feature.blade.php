@if(isset($obj['newest'][0]))
    <div class="featured-post featured-post-first">
        <a href="/{{$obj['newest'][0]['url']}}">
            <img class="lazyload" width="483" height="271" src="{{ asset('/img/itg_image370x208.jpg') }}" data-src="{{!!$obj['newest'][0]['image'] ? $obj['newest'][0]['image'] : ''}}" alt="{{$obj['newest'][0]['title']}}">
        </a>
        <h2 class="home-page-feature-1803938">
            <a href="/{{$obj['newest'][0]['url']}}" title="{{$obj['newest'][0]['title']}}">{{$obj['newest'][0]['title']}}</a>
        </h2>
    </div>
    @foreach($obj['newest'] as $key => $value)
        @if(!!$key)
            <div class="featured-post">
                <a href="/{{$value['url']}}">
                    <img class="lazyload" width="237" height="133" src="{{ asset('/img/itg_image170x127.jpg') }}" data-src="{{!!$value['image'] ? $value['image'] : ''}}" alt="{{$value['title']}}" title="{{$value['title']}}">
                </a>
                <h3 title="{{$value['title']}}" class="home-page-feature-small-1804002">
                    <a href="/{{$value['url']}}" title="{{$value['title']}}">{{$value['title']}}</a>
                </h3>
            </div>
        @endif
    @endforeach
@endif
