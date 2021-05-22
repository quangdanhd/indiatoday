@foreach($obj as $key => $value)
    <div style="border-bottom: 1px solid #ddd; margin-bottom: 7px; padding-bottom: 7px;" class="data-holder">
        <a class="pic-no-icon" href="/{{$value->url}}">
            <img data-preview-url="" class="lazyload" width="100%" src="{{ asset('/img/itg_image370x208.jpg') }}" data-src="{{$value->image}}" alt="{{$value->title}}">
        </a>
        <div>
            <a href="/{{$value->url}}">{{$value->title}}</a>
        </div>
    </div>
@endforeach
