<h1 itemprop="headline">{{$node->title}}</h1>
<div class="story-left-section story-update">
    <div class="story-kicker">
        <h2>{{$node->describe}}</h2>
    </div>
    <div class="story-header-wrapper">
        <div class="story-header-ad">
            <div class="adtext">advertisement</div>
            <div id="indiatoday_story_tablet_con">
                <div id="div-gpt-ad-1507709583969-0"></div>
            </div>
        </div>
{{--        <div class="story-left">--}}
{{--            <div class="byline">--}}
{{--                <div class="profile-pic">--}}
{{--                </div>--}}
{{--                <div class="profile-detail">--}}
{{--                    <dl class="profile-byline">--}}
{{--                        <span itemprop="author">--}}
{{--                            <dt class="title" itemprop="name">--}}
{{--                                <a title="Vidya" href="#" target="_blank">Vidya</a>--}}
{{--                                <span class="mobile-twitter">--}}
{{--                                    <a title="Vidya" href="#">--}}
{{--                                        <i class="fa fa-twitter"></i>--}}
{{--                                    </a>--}}
{{--                                </span>--}}
{{--                            </dt>--}}
{{--                        </span>--}}
{{--                        <dt>Mumbai</dt>--}}
{{--                        <dt class="pubdata">{{date('F d, Y', strtotime($node->created_at))}}</dt>--}}
{{--                        <dt class="update-data">--}}
{{--                            <span class="update-data">UPDATED: {{date('F d, Y H:i', strtotime($node->updated_at))}}</span>--}}
{{--                        </dt>--}}
{{--                    </dl>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--            <div class="share_bar" id="share_bar">--}}
{{--                <dl class="list-inline social-share">--}}
{{--                    <dt>--}}
{{--                        <a target="_blank" href="#" title="YT Subscription" class="def-cur-pointer yticon">--}}
{{--                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <g>--}}
{{--                                    <circle fill="#ee2324" cx="15" cy="15" r="15"></circle>--}}
{{--                                    <path fill="#FFFFFF" d="M24,13c0-0.2,0-0.4,0-0.6c-0.1-0.9-0.2-1.9-0.8-2.7c-0.5-0.6-1.3-0.8-2.1-0.8c-0.9-0.1-1.9-0.2-2.9-0.2c-1.9-0.1-3.9,0-5.8,0c-1,0-2,0-3,0.1c-1.2,0.1-2.5,0.3-3,1.5C5.9,11.4,6,12.8,6,13.9c0,1.1,0,2.1,0,3.2c0.1,1.4,0.1,3.1,1.6,3.7c0.8,0.3,1.7,0.4,2.6,0.4c0.9,0.1,1.8,0.1,2.7,0.1c1.9,0,3.7,0,5.6-0.1c1.3,0,2.6,0,3.9-0.5c1.1-0.4,1.4-1.5,1.5-2.5c0.1-1,0.1-2,0.1-3C24,14.5,24,13.8,24,13z M13.2,17.7c0-1.8,0-3.6,0-5.5c1.6,0.9,3.1,1.8,4.7,2.7C16.3,15.9,14.7,16.8,13.2,17.7z"></path>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                    <dt>--}}
{{--                        <a rel="noopener noreferrer" title="share on facebook" class="def-cur-pointer fbicon">--}}
{{--                            <svg height="30" width="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <g>--}}
{{--                                    <circle fill="#3b549a" cx="15" cy="15" r="15"></circle>--}}
{{--                                    <path fill="#FFFFFF" d="M16.3,23.5v-7.8h2.6l0.4-3h-3v-1.9c0-0.9,0.2-1.5,1.5-1.5l1.6,0V6.6c-0.3,0-1.2-0.1-2.3-0.1c-2.3,0-3.9,1.4-3.9,4v2.2h-2.6v3h2.6v7.8H16.3L16.3,23.5z"></path>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                    <dt>--}}
{{--                        <a rel="noopener noreferrer" title="share on twitter" href="javascript:void(0)" class="user-activity twicon" data-rel="1805162" data-tag="story" data-activity="twitter_share" data-status="1">--}}
{{--                            <svg height="30" width="30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <g>--}}
{{--                                    <circle fill="#82c3eb" cx="15" cy="15" r="15"></circle>--}}
{{--                                    <g>--}}
{{--                                        <path fill="#FFFFFF" d="M24.4,10.3c-0.4,0.1-0.8,0.1-0.8,0.1l0-0.1c0.4-0.3,1.4-1.3,1.5-1.8c0.1-0.2,0-0.3,0-0.3l-1.3,0.5l-1.1,0.5l0,0C22.1,8.5,21,8,19.7,8c-2.2,0-4,1.6-4,3.5c0,0.4,0.1,1,0.2,1.3c0,0.1,0-0.1,0,0c-1.4,0-3.3-0.6-4.9-1.5C7.7,9.8,7.5,8.6,7.5,8.6C7,9.2,6.7,11,7.2,12.4c0.3,0.9,1.5,1.7,1.5,1.7l0,0c0,0-0.5,0-1-0.2c-0.5-0.2-0.7-0.4-0.7-0.4c-0.3,0.8,0.3,2.1,1.4,3.1c0.6,0.6,1.8,0.9,1.8,0.9l-1.8,0.1c-0.1,1.8,3.7,2.8,3.7,2.8l0,0c-1.1,0.9-2.4,1.4-3.8,1.4c-0.7,0-1.4-0.1-2.1-0.3c1.8,1.5,4.2,2.6,6.8,2.4c6.8-0.4,10.7-6.2,10.8-12l0,0c0,0,0.3-0.2,1-0.8c0.7-0.7,1.1-1.5,1.1-1.5S24.8,10.1,24.4,10.3z"></path>--}}
{{--                                    </g>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                    <dt class="mhide">--}}
{{--                        <a rel="noopener noreferrer" class="whatsapp_share whticon" target="_blank" title="share on whatsapp" href="#">--}}
{{--                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <g>--}}
{{--                                    <g>--}}
{{--                                        <circle fill="#3eb64a" cx="15" cy="15" r="15"></circle>--}}
{{--                                    </g>--}}
{{--                                    <g>--}}
{{--                                        <g>--}}
{{--                                            <path fill="#FFFFFF" d="M15,23.5c-1.5,0-2.9-0.4-4.2-1.1l-3.3,1.1L8.1,20c-1.1-1.5-1.6-3.2-1.6-5c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5C23.5,19.7,19.7,23.5,15,23.5z M10.9,21l0.3,0.2c1.2,0.7,2.5,1.1,3.8,1.1c4,0,7.2-3.2,7.2-7.2c0-4-3.2-7.2-7.2-7.2c-4,0-7.2,3.2-7.2,7.2c0,1.6,0.5,3.2,1.5,4.4l0.2,0.2l-0.4,1.9L10.9,21z"></path>--}}
{{--                                        </g>--}}
{{--                                        <path class="st1" d="M10.7,11.7c0,0,0.5-0.9,0.9-0.9c0.4,0,0.9,0,1.1,0.2c0.1,0.3,0.8,1.8,0.8,1.8s0.1,0.3-0.1,0.5c-0.2,0.3-0.5,0.6-0.5,0.6s-0.2,0.3,0,0.5c0.2,0.3,0.5,0.8,1.2,1.5c0.7,0.7,1.9,1.1,1.9,1.1s0.2,0,0.3-0.1c0.1-0.1,0.7-0.9,0.7-0.9s0.2-0.3,0.5-0.1c0.3,0.2,1.8,0.9,1.8,0.9s0.2,0.1,0.2,0.3c0,0.3-0.1,0.9-0.3,1.1c-0.2,0.2-0.8,0.9-1.8,0.9c-0.9,0-3.2-0.8-4.4-1.9c-1.2-1.2-2.2-2.4-2.5-3.5C10.4,12.7,10.4,12.2,10.7,11.7z"></path>--}}
{{--                                    </g>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                    <dt class="desktop-hide">--}}
{{--                        <a rel="noopener noreferrer" class="whatsapp_share whticonm">--}}
{{--                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <g>--}}
{{--                                    <g>--}}
{{--                                        <circle fill="#368a41" cx="15" cy="15" r="15"></circle>--}}
{{--                                    </g>--}}
{{--                                    <g>--}}
{{--                                        <g>--}}
{{--                                            <path fill="#FFFFFF" d="M15,23.5c-1.5,0-2.9-0.4-4.2-1.1l-3.3,1.1L8.1,20c-1.1-1.5-1.6-3.2-1.6-5c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5C23.5,19.7,19.7,23.5,15,23.5z M10.9,21l0.3,0.2c1.2,0.7,2.5,1.1,3.8,1.1c4,0,7.2-3.2,7.2-7.2c0-4-3.2-7.2-7.2-7.2c-4,0-7.2,3.2-7.2,7.2c0,1.6,0.5,3.2,1.5,4.4l0.2,0.2l-0.4,1.9L10.9,21z"></path>--}}
{{--                                        </g>--}}
{{--                                        <path class="st1" d="M10.7,11.7c0,0,0.5-0.9,0.9-0.9c0.4,0,0.9,0,1.1,0.2c0.1,0.3,0.8,1.8,0.8,1.8s0.1,0.3-0.1,0.5c-0.2,0.3-0.5,0.6-0.5,0.6s-0.2,0.3,0,0.5c0.2,0.3,0.5,0.8,1.2,1.5c0.7,0.7,1.9,1.1,1.9,1.1s0.2,0,0.3-0.1c0.1-0.1,0.7-0.9,0.7-0.9s0.2-0.3,0.5-0.1c0.3,0.2,1.8,0.9,1.8,0.9s0.2,0.1,0.2,0.3c0,0.3-0.1,0.9-0.3,1.1c-0.2,0.2-0.8,0.9-1.8,0.9c-0.9,0-3.2-0.8-4.4-1.9c-1.2-1.2-2.2-2.4-2.5-3.5C10.4,12.7,10.4,12.2,10.7,11.7z"></path>--}}
{{--                                    </g>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                    <dt class="itg-activity-read-later user-activity-trigger">--}}
{{--                        <a title="Bookmark" href="javascript:void(0)" data-rel="1805162" data-tag="story" data-activity="read_later" data-status="1" class="user-activity def-cur-pointer bookmrkicon">--}}
{{--                            <svg version="1.1" height="30" width="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <g>--}}
{{--                                    <g>--}}
{{--                                        <circle fill="#F69220" cx="15" cy="15" r="15"></circle>--}}
{{--                                    </g>--}}
{{--                                    <g>--}}
{{--                                        <path class="st1" d="M19.8,6.5c0.1,0,0.3,0,0.4,0.1c0.4,0.2,0.7,0.5,0.7,0.9v15c0,0.4-0.3,0.8-0.7,0.9c-0.1,0.1-0.3,0.1-0.4,0.1c-0.3,0-0.5-0.1-0.8-0.3l-4-3.9l-4,3.9c-0.2,0.2-0.5,0.3-0.8,0.3c-0.1,0-0.3,0-0.4-0.1c-0.4-0.2-0.7-0.5-0.7-0.9v-15c0-0.4,0.3-0.8,0.7-0.9c0.1-0.1,0.3-0.1,0.4-0.1H19.8L19.8,6.5z"></path>--}}
{{--                                    </g>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                    <dt>--}}
{{--                        <a class="comnticon def-cur-pointer postCommentBut1805162">--}}
{{--                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30">--}}
{{--                                <style type="text/css">--}}
{{--                                    .st1 {--}}
{{--                                        fill-rule: evenodd;--}}
{{--                                        clip-rule: evenodd;--}}
{{--                                        fill: #FFFFFF;--}}
{{--                                    }--}}
{{--                                </style>--}}
{{--                                <g>--}}
{{--                                    <g>--}}
{{--                                        <circle fill="#dab227" cx="15" cy="15" r="15"></circle>--}}
{{--                                    </g>--}}
{{--                                    <g>--}}
{{--                                        <g transform="translate(-238.000000, -842.000000)">--}}
{{--                                            <g transform="translate(238.000000, 842.000000)">--}}
{{--                                                <path class="st1" d="M7.5,18.2l0.1,0.1c0,0,0,0.2-0.1,0.3c-0.1,0.3-0.2,0.5-0.5,1.2c-0.3,0.7-0.4,1-0.5,1.3c-0.2,0.6-0.3,1,0.1,1.3c0.3,0.2,0.6,0.2,1.4,0c0.4-0.1,2.8-1,3.2-1.1c0.2-0.1,0.4-0.1,0.5-0.1c0.1,0,0.1,0,0.1,0c0,0,0,0,0,0c1,0.3,2.1,0.5,3.2,0.5c4.8,0,8.8-3.1,8.8-7s-4-7-8.8-7s-8.8,3.1-8.8,7c0,0.9,0.2,1.9,0.7,2.7C7.1,17.6,7.3,17.9,7.5,18.2z"></path>--}}
{{--                                            </g>--}}
{{--                                        </g>--}}
{{--                                    </g>--}}
{{--                                </g>--}}
{{--                            </svg>--}}
{{--                        </a>--}}
{{--                    </dt>--}}
{{--                </dl>--}}
{{--            </div>--}}
{{--        </div>--}}
    </div>
    <div class="story-right ">
        <div class="">
            <div class="stryimg">
                {{--<img data-src="" class="lazyload" width="770" alt=" " title=" " height="433" src="">--}}
            </div>
            {{--<div class="image-alt"></div>--}}
        </div>
        <div class="story-movie">
            <div class="movie-detail"></div>
        </div>
        <div class="description " itemprop="articleBody">
            {!! $node->content !!}
        </div>
    </div>
</div>
