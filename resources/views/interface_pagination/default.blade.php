@if ($paginator->lastPage() > 1)
    <ul class="pager">
        @if($paginator->currentPage() != 1)
            <li class="pager-first first">
                <a title="Go to first page" href="{{ $paginator->url(1) }}">« first</a>
            </li>
            <li class="pager-previous">
                <a title="Go to previous page" href="{{ $paginator->url(1) }}">Previous</a>
            </li>
        @endif
        @for ($i = 1; $i <= $paginator->lastPage(); $i++)
            @if($paginator->currentPage() - 5 == $i)
                <li class="pager-ellipsis">…</li>
            @endif
            @if($paginator->currentPage() - 5 < $i && $paginator->currentPage() + 5 > $i)
                <li class="{{ ($paginator->currentPage() == $i) ? 'pager-current' : 'pager-item' }}">
                    @if($paginator->currentPage() == $i)
                        <span>{{$i}}</span>
                    @else
                        <a title="Go to page {{$i}}" href="{{ $paginator->url($i) }}">{{ $i }}</a>
                    @endif
                </li>
            @endif
            @if($paginator->currentPage() + 5 == $i)
                <li class="pager-ellipsis">…</li>
            @endif
        @endfor
        @if($paginator->currentPage() != $paginator->lastPage())
            <li class="pager-next">
                <a title="Go to next page" href="{{ $paginator->url($paginator->currentPage() + 1) }}">Next</a>
            </li>
            <li class="pager-last last">
                <a title="Go to last page" href="{{ $paginator->url($paginator->lastPage()) }}">last »</a>
            </li>
        @endif
    </ul>
@endif
