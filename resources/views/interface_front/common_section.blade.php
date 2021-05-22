<div class="row itg-common-section">
    @foreach($obj as $key => $value)
        @if($loop->index < 3)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
        @if ($loop->index >= 3)
            @break
        @endif
    @endforeach
</div>
<div class="row itg-common-section">
    @foreach($obj as $key => $value)
        @if($loop->index >= 3)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
    @endforeach
</div>

