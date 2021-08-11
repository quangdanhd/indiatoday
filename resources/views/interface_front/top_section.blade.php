<div class="row itg-top-section">
    <div class="top-block">
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <div class="col-sm-7 col-md-7 col-lg-7 mrgb30 home-top-featured" data-tb-region="homeTopFeatured">
                    <div class="widget-help-text">Template widgets ( <strong>Home Page Feature</strong> )</div>
                    <div class="itg-widget">
                        <div class="droppable ">
                            <div class="widget-wrapper home_page_feature">
                                <div class="data-holder" id="itg-block-1">
                                    <div id="block-itg-widget-home-page-feature" class="block block-itg-widget odd">
                                        <div class="featured-news">
                                            @include('interface_front.top_section_feature', ['obj' => $obj])
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5 col-md-5 col-lg-5 mrgb30 home-top-story" data-tb-region="homeTopStory">
                    <div class="widget-help-text">Template widgets (<strong>Top Story</strong>)</div>
                    <div class="itg-widget">
                        <div class="top-n-most-popular-stories">
                            <div class="itg-widget-child tab-data tab-data-1">
                                <div class="droppable ">
                                    <div class="widget-wrapper top_stories_ordering">
                                        <span class="widget-title">Top Stories</span>
                                        <div class="data-holder" id="itg-block-2">
                                            <div id="block-itg-widget-top-stories-ordering" class="block block-itg-widget even">
                                                @include('interface_front.top_section_top', ['obj' => $obj])
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
