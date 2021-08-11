<ul id="newlist" class="menu" style="left: 871px;">
    @if (isset($obj['category']))
        @foreach($obj['category'] as $key => $value)
            @if($loop->index >= $obj['category_show'])
                <li>
                    <a href="/category/{{$key}}" style="background : transparent" target="_self" class="second-level-child second-level-child-{{($loop->index + 1)}} notactive notactive url-type-internal">{{$value}}</a>
                </li>
            @endif
        @endforeach
    @endif
    <li class="drkmode">
        <label for="switch">
            <span>Dark Mode</span>
        </label>
    </li>
</ul>
