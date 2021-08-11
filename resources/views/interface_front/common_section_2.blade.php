<div class="row itg-common-section">
    @foreach($obj as $key => $value)
        @if($loop->index < 3)
            @include('interface_front.common_section_child', ['value' => $value])
        @endif
        @if ($loop->index >= 3)
            @break
        @endif
    @endforeach
    <div class="col-md-4 col-sm-4 col-xs-12 mt-50 sectioncart" id="section-cart-itg-block-16" data-tb-region="HomeProgramme">
    </div>
</div>
