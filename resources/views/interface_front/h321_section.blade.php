<div class="row itg-h321-section">
    <div class="col-md-8 col-sm-6 col-xs-12 mt-50" data-tb-region="HomeDoNotMiss">
        <div class="widget-help-text">Template widgets ( <strong>Don't Miss</strong> )</div>
        <div class="itg-widget">
            <div class="droppable ">
                <div class="widget-wrapper dont_miss">
                    @if(isset($obj['others'][1]))
                        @foreach($obj['others'][1] as $key => $value)
                            @if(isset($value[0]))
                                <span class="widget-title">From the {{strtolower($value[0]['name'])}}</span>
                            @endif
                            <div class="data-holder" id="itg-block-10">
                                <div id="block-itg-widget-dont-miss" class="block block-itg-widget even">
                                    <div class="dont-miss">
                                        <ul>
                                            @foreach($value as $k_2 => $val_2)
                                                @if($loop->index < 4)
                                                    <li data-tb-region-item="" class="dont-miss-listing">
                                                        <div class="dm-pic">
                                                            <a href="/{{$val_2['url']}}">
                                                                <img class="lazyload" width="170" height="96" src="{{ asset('/img/itg_image170x127.jpg') }}" data-src="{{!!$val_2['image'] ? $val_2['image'] : ''}}" alt="{{$val_2['title']}}" title="{{$val_2['title']}}">
                                                            </a>
                                                        </div>
                                                        <div class="dm-detail">
                                                            <p title="{{$val_2['title']}}" class="dont-miss-widget dont-miss-1802457">
                                                                <a href="/{{$val_2['url']}}" title="{{$val_2['title']}}">{{$val_2['title']}}</a>
                                                            </p>
                                                        </div>
                                                    </li>
                                                @endif
                                                @if ($loop->index >= 4)
                                                    @break
                                                @endif
                                            @endforeach
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @endif
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 col-sm-6 col-xs-12 mt-50">
        <div class="widget-help-text">Non Draggable ( <strong>Ad Widget</strong> )</div>
        <div class="itg-widget">
            <div class="ad-widget">
                <div class="sidebar-ad">
                    <div id="block-itg-ads-ads-medium-rectangl-rhs2-300x250--2" class="block block-itg-ads odd">
                        <div class="adtext">advertisement</div>
                        <div id="div-gpt-ad-1514896195242-3" style="height:250px;" data-google-query-id="CLK1hsat0_ACFTmC6QUdT0kNQQ">
                            <div id="google_ads_iframe_/1007232/Indiatoday_HP_MTF_300x250_0__container__" style="border: 0pt none; display: inline-block; width: 300px; height: 250px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
