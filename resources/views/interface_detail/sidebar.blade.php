<div id="block-itg-ads-ads-medium-rectangl-rhs1-300x250" class="block block-itg-ads first odd">
    <div class="adtext">advertisement</div>
    <div id="div-gpt-ad-1507709583969-1" style="height:250px; width:300px;">
    </div>
    <style type="text/css">
        .block-itg-ads iframe {
            max-width: inherit !important;
        }
    </style>
</div>
<div id="block-itg-widget-we-may-suggest" class="block block-itg-widget even">
    <div class="may-be-suggest-container">
        @include('interface_detail.read_this', ['obj' => $obj['top']])
    </div>
</div>
<div id="block-itg-front-end-common-recommend-news-block" class="block block-itg-front-end-common odd">
    <div class="may-be-recommend mhide">
        <h3>
            <span>Recommended</span>
        </h3>
        <div id="taboola-right-rail-thumbnails" class="trc_related_container trc_spotlight_widget trc_elastic trc_elastic_alternating-thumbnails-rr">
            <div class="trc_rbox_container">
                @include('interface_detail.recommend', ['obj' => $obj['recommend']])
            </div>
        </div>
    </div>
</div>
<div id="block-itg-ads-ads-medium-rectangl-rhs2-300x250" class="block block-itg-ads last even">
    <div class="adtext">advertisement</div>
    <div id="div-gpt-ad-1507709583969-2" style="height:250px; width:300px; margin:0 auto;">
    </div>
</div>
