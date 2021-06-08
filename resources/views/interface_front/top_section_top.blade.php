@if(isset($obj['top']))
    <ul class="itg-listing" style="padding-top: 0px;">
        @foreach($obj['top'] as $key => $value)
            <li data-tb-region-item="" title="{{$value->title}}" class="story">
                <a href="/{{$value->url}}" title="{{$value->title}}">{{$value->title}}</a>
            </li>
        @endforeach
    </ul>
@endif
