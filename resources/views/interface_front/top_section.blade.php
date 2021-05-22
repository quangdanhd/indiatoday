<div class="row itg-top-section">
    <div class="top-block">
        <div class="row">
            <div class="col-sm-12 col-md-8 padrht0">
                <div class="col-sm-8 col-md-8 col-lg-8 mrgb30 home-top-featured" data-tb-region="homeTopFeatured">
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
                <div class="col-sm-4 col-md-4 col-lg-4 padrht0 mrgb30 home-top-story" data-tb-region="homeTopStory">
                    <div class="widget-help-text">Template widgets (<strong>Top Story</strong>)</div>
                    <div class="itg-widget">
                        <div class="top-n-most-popular-stories">
                            <div class="itg-widget-child tab-data tab-data-1">
                                <div class="droppable ">
                                    <div class="widget-wrapper top_stories_ordering">
                                        <span class="widget-title">Top Stories</span>
                                        <div class="data-holder mCustomScrollbar _mCS_1" id="itg-block-2">
                                            <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style="max-height: none;" tabindex="0">
                                                <div id="mCSB_1_container" class="mCSB_container" style="position:relative; top:0; left:0;" dir="ltr">
                                                    <div id="block-itg-widget-top-stories-ordering" class="block block-itg-widget even">
                                                        @include('interface_front.top_section_top', ['obj' => $obj])
                                                    </div>
                                                </div>
                                                <div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical" style="display: block;">
                                                    <div class="mCSB_draggerContainer" style="">
                                                        <div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 30px; display: block; height: 240px; max-height: 586px; top: 0px;">
                                                            <div class="mCSB_dragger_bar" style="line-height: 30px;"></div>
                                                        </div>
                                                        <div class="mCSB_draggerRail"></div>
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
            <div class="col-sm-12 col-md-4">
                <div class="top-rhs-add">
                    <div class="widget-help-text">Non Draggable ( <strong>Ad widget</strong> )</div>
                    <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 mrgb30 top-rhs-add-child">
                        <div class="itg-widget">
                            <div class="ad-widget">
                                <div class="sidebar-ad">
                                    <div id="block-itg-ads-ads-medium-rectangl-rhs1-300x250--2" class="block block-itg-ads even">
                                        <div class="adtext">advertisement</div>
                                        <div id="div-gpt-ad-1514896195242-1" style="min-height:250px;" data-google-query-id="CNm0hsat0_ACFTmC6QUdT0kNQQ">
                                            <div id="google_ads_iframe_/1007232/Indiatoday_HP_ATF_300x250_1_0__container__" style="border: 0pt none; display: inline-block; width: 300px; height: 250px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-12 col-lg-12 home-trending-video">
                    <div class="widget-help-text">Template widgets(<strong>Trending Videos &amp; Top Takes</strong>)
                    </div>
                    <div class="tab-buttons">
                        <span data-class="itg-block-5" data-id="tab-data-1" class="active ripple-effect">
                            <a href="#">Trending Videos</a>
                        </span>
                        <span data-class="itg-block-6" data-id="tab-data-2" class="ripple-effect">
                            <a href="#">Top Takes</a>
                        </span>
                    </div>
                    <div class="itg-widget-child tab-data tab-data-1" data-tb-region="homeTrendingVideo">
                        <div class="droppable ">
                            <div class="widget-wrapper trending_videos_widget">
                                <div class="data-holder" id="itg-block-5">
                                    <div id="block-itg-widget-trending-videos-widget" class="block block-itg-widget odd">
                                        <h3 class="desktop-hide">Trending Videos</h3>
                                        <div class="trending-videos-flex trending-toptakes--tab" id="trending-videos">
                                            <div class="flex-viewport" style="overflow: hidden; position: relative;">
                                                <ul class="trending-videos slides" style="width: 1400%; transition-duration: 0s; transform: translate3d(-328px, 0px, 0px);">
                                                    <li data-tb-region-item="" class="videogallery trending-videos-list clone" aria-hidden="true" style="width: 328px; margin-right: 15px; float: left; display: block;">
                                                        <a class="pic" href="#">
                                                            <img data-preview-url="" class="lazyloa" src="{{ asset('/img/itg_image370x208.jpg') }}" data-src="" alt="" title="" draggable="false">
                                                            <div class="playIconThumbContainer">
                                                                <div class="platDetailVideoIcon"></div>
                                                                <div class="platDetailVideoTime">01:53</div>
                                                            </div>
                                                        </a>
                                                        <p title="Tracking Cyclone Tauktae: How gusty winds, torrential rains left a trail of destruction in Goa">
                                                            <a href="#" title="">Tracking Cyclone Tauktae: How gusty winds, torrential rains left a trail of destruction in Goa</a>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <ol class="flex-control-nav flex-control-paging">
                                                <li>
                                                    <a href="#" class="flex-active">1</a>
                                                </li>
                                            </ol>
                                            <ul class="flex-direction-nav">
                                                <li class="flex-nav-prev">
                                                    <a class="flex-prev" href="#"></a>
                                                </li>
                                                <li class="flex-nav-next">
                                                    <a class="flex-next" href="#"></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="itg-widget-child tab-data tab-data-2 hide" data-tb-region="homeTopTakes">
                        <div class="droppable ">
                            <div class="widget-wrapper top_takes_videos_tab_widget">
                                <div class="data-holder" id="itg-block-6">
                                    <div id="block-itg-widget-top-takes-videos-tab-widget" class="block block-itg-widget even">
                                        <h3 class="desktop-hide">Top Takes</h3>
                                        <div class="top-takes-videos-flex trending-toptakes--tab home-top-takes" id="trending-videos-top-takes" style="">
                                            <div class="flex-viewport" style="overflow: hidden; position: relative;">
                                                <ul class="trending-videos slides" style="width: 1400%; transition-duration: 0s; transform: translate3d(-323px, 0px, 0px);">
                                                    <li data-tb-region-item="" class="trending-videos-list top-takes-4 clone" aria-hidden="true" style="width: 323px; margin-right: 15px; float: left; display: block;">
                                                        <a class="pic" href="#">
                                                            <img class="lazyload" data-preview-url="" src="{{ asset('/img/itg_image370x208.jpg') }}" data-src="" alt="" title="">
                                                        </a>
                                                        <p title="Rajinikanth meets MK Stalin, donates Rs 50 lakh to CM Relief Fund to fight Covid" class="top-takes-1803532">
                                                            <a href="#" title="Rajinikanth meets MK Stalin, donates Rs 50 lakh to CM Relief Fund to fight Covid">Rajinikanth meets MK Stalin, donates Rs 50 lakh to CM Relief Fund to fight Covid</a>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <ol class="flex-control-nav flex-control-paging">
                                                <li>
                                                    <a href="#" class="flex-active">1</a>
                                                </li>
                                            </ol>
                                            <ul class="flex-direction-nav">
                                                <li class="flex-nav-prev">
                                                    <a class="flex-prev" href="#"></a>
                                                </li>
                                                <li class="flex-nav-next">
                                                    <a class="flex-next" href="#"></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <script>
                                        function activeflex() {
                                            setTimeout(function () {
                                                jQuery(".top-takes-videos-flex").resize();
                                            });
                                        }
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
