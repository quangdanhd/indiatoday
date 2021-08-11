<section id="content" role="main">
    <a id="main-content"></a>
    <h1 class="page__title title front-title-hide" id="page-title">News</h1>
    <div class="itg-layout-container itg-front">
        <div class="row">
            <div class="col-md-12"></div>
        </div>
        @include('interface_front.top_section', ['obj' => $obj])
        <div class="row itg-common-section"></div>
        <div class="itg-layout-container itg-front">
            @if(isset($obj['others'][0]))
                @include('interface_front.common_section', ['obj' => $obj['others'][0]])
            @endif
{{--            @include('interface_front.h321_section', ['obj' => $obj])--}}
            @if(isset($obj['others'][2]))
                @include('interface_front.common_section_2', ['obj' => $obj['others'][2]])
            @endif
            @if(isset($obj['others'][3]))
                @include('interface_front.section_widget', ['obj' => $obj['others'][3]])
            @endif
            <div class="option2sty"></div>
            <div class="no-more-card" style="display:none">No More Result Found.</div>
            <div class="it-gaming-section"></div>
        </div>
    </div>
</section>
