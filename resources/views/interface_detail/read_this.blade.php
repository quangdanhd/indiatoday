<h3>
    <span>READ THIS</span>
</h3>
<ul>
    @foreach($obj as $key => $value)
        <li class="may-we-suggest">
            <a href="/{{$value['url']}}" class="pic" title="{{$value['title']}}">
                <img class="lazyload" alt="{{$value['title']}}" title="{{$value['title']}}" data-src="{{$value['image']}}" src="{{ asset('/img/itg_image170x127.jpg') }}" width="88" height="50">
            </a>
            <p title="{{$value['title']}}" class="title may-be-suggest-1805082">
                <a href="/{{$value['url']}}" title="{{$value['title']}}">{{$value['title']}}</a>
            </p>
        </li>
    @endforeach
</ul>
