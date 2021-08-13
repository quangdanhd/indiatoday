@if(isset($value[0]))
    <div class="col-md-4 col-sm-4 col-xs-12 mt-50" data-tb-region="HomeMovies">
        <div class="widget-help-text">Section Card</div>
        <div class="itg-widget">
            <div class="droppable ">
                <div class="widget-wrapper section_wise_order">
                <span class="widget-title">
                    <a href="/category/{{$value[0]['link']}}">{{$value[0]['name']}}</a>
                </span>
                    <div class="data-holder" id="itg-block-{{$loop->index + 7}}">
                        <div class="section-ordering video-gif">
                            <div data-tb-region-item="">
                                <a class="pic-no-icon" href="/{{$value[0]['url']}}">
                                    <img data-preview-url="" class="lazyload" width="370" height="208" src="{{ asset('/img/itg_image370x208.jpg') }}" data-src="{{$value[0]['image']}}" alt="{{$value[0]['title']}}">
                                </a>
                                <h3 title="{{$value[0]['title']}}" class="frist-heading story">
                                    <a href="/{{$value[0]['url']}}">{{$value[0]['title']}}</a>
                                </h3>
                            </div>
                            @foreach($value as $k_2 => $val_2)
                                @if($loop->index > 0 && $loop->index < 3)
                                    <p data-tb-region-item="" title="{{$val_2['title']}}">
                                        <a href="/{{$val_2['url']}}">{{$val_2['title']}}</a>
                                    </p>
                                @endif
                                @if ($loop->index >= 3)
                                    @break
                                @endif
                            @endforeach
                            <div class="morediv">
                                <a href="/category/{{$value[0]['link']}}">
                                    <span>more from {{$value[0]['name']}}</span>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
