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
        @if($loop->index >= 3 && $loop->index < 6)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
        @if ($loop->index >= 6)
            @break
        @endif
    @endforeach
</div>
<div class="row itg-common-section">
    @foreach($obj as $key => $value)
        @if($loop->index >= 6 && $loop->index < 9)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
        @if ($loop->index >= 9)
            @break
        @endif
    @endforeach
</div>
<div class="row itg-common-section">
    @foreach($obj as $key => $value)
        @if($loop->index >= 9 && $loop->index < 12)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
        @if ($loop->index >= 12)
            @break
        @endif
    @endforeach
</div>

