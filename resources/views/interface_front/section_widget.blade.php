<div class="row itg-common-section mt-50 show-on-add" id="content-section-widget-1">
    @foreach($obj as $key => $value)
        @if($loop->index < 3)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
        @if ($loop->index >= 3)
            @break
        @endif
    @endforeach
</div>
<div class="row itg-common-section mt-50 show-on-add" id="content-section-widget-2">
    @foreach($obj as $key => $value)
        @if($loop->index >= 3)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
    @endforeach
</div>
