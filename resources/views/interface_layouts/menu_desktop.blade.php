@if (isset($obj['category']))
    @foreach($obj['category'] as $key => $value)
        @if($loop->index == $obj['category_show'])
            <li class="all-menu">
                <a class="" href="javascript:void(0)">
                    <i class="fa fa-circle"></i> <i class="fa fa-circle"></i> <i class="fa fa-circle"></i>
                </a>
            </li>
        @endif
        @if($loop->index < $obj['category_show'])
            <li class="nav-items ripple-effect">
                <a href="/category/{{$key}}" class="second-level-child second-level-child-{{($loop->index + 1)}} notactive notactive url-type-external">{{$value}}</a>
            </li>
        @else
            <li class="nav-items  ripple-effect hide">
                <a href="/category/{{$key}}" style="background : transparent" class="second-level-child second-level-child-{{($loop->index + 1)}} notactive notactive url-type-external">{{$value}}</a>
            </li>
        @endif
    @endforeach
    <li class="drkmode nav-items ripple-effect hide" style="">
        <label for="switch">
            <span>Dark Mode</span>
        </label>
    </li>
@endif
