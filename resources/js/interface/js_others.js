//common function for mobile
function mobilecheck() {
    var check = false;
    (function (a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

var is_mobile = mobilecheck() ? true : false;
document.addEventListener('DOMContentLoaded', function (event) {
    var winWidth;
    jQuery('.mobile-nav').click(function () {
        if (jQuery(this).hasClass('nochange')) {
            jQuery(this).addClass('change').removeClass('nochange');
            jQuery('.navigation').slideDown();
        } else {
            jQuery(this).addClass('nochange').removeClass('change');
            jQuery('.navigation').slideUp();
        }
    });
    jQuery(document).on('click', '.all-menu', function () {
        jQuery('#block-itg-menu-manager-third-level-menu ul.cities-third-level-menu').slideUp();
        jQuery('#newlist').slideToggle();
        jQuery('.third-level-menu #overflow').hide();
    });
    jQuery(document).on('click', function () {
        jQuery('#newlist').slideUp();
    });
    jQuery(document).on('click', '.all-menu', function (e) {
        e.stopPropagation();
    });
    jQuery(document).on('click', '#newlist > li > *', function (e) {
        e.stopPropagation();
    });    //social share animation effects
    jQuery('.social-share ul').each(function () {
        jQuery(this).children().not(":first").hide();
    });
    jQuery('.social-share li').click(function () {
        jQuery(this).find('.share').parent('li').nextAll('li').toggle();
    });
    var menuLength;
    jQuery(".vertical-menu").each(function () {
        menuLength = jQuery(this).find('li').length;
        if (menuLength > 5) {
            jQuery('.vertical-more').show();
        }
    });
    var calcNum = menuLength % 5;
    var divNum = parseInt(menuLength / 5);
    var count = 0;
    jQuery('.vertical-more a.more').click(function () {
        count++;
        if (count < divNum && calcNum != 0) {
            jQuery('.vertical-menu').css('margin-top', -375 * count + 'px');
        } else if (calcNum > 0 && count == divNum) {
            jQuery('.vertical-menu').css('margin-top', -(375 * (count - 1) + calcNum * 75) + 'px');
            jQuery('.vertical-more a.less').show();
            jQuery(this).hide();
        } else if (count < divNum && calcNum == 0) {
            jQuery('.vertical-menu').css('margin-top', -375 * count + 'px');
            jQuery('.vertical-more a.less').show();
            jQuery(this).hide();
        }
    });
    jQuery('.vertical-more a.less').click(function () {
        count = 0;
        jQuery('.vertical-menu').css('margin-top', '0px');
        jQuery('.vertical-more a.more').show();
        jQuery(this).hide();
    });
    jQuery('.page-user .form-submit').wrap('<div class="ripple-effect dib vtop"></div>');
    jQuery('.second-level-menu li, .itg-listing li, .tab-buttons span, .agbutton button').addClass('ripple-effect');
    jQuery('.second-level-menu li.dropdown_cls').removeClass('ripple-effect');
    jQuery(".ripple-effect").click(function (e) {        // Remove any old one
        jQuery(".ripple").remove();        // Setup
        var posX = jQuery(this).offset().left,
            posY = jQuery(this).offset().top,
            buttonWidth = jQuery(this).width(),
            buttonHeight = jQuery(this).height();        // Add the element
        jQuery(this).prepend("<span class='ripple'></span>");        // Make it round!
        if (buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }        // Get the center of the element
        var x = e.pageX - posX - buttonWidth / 2;
        var y = e.pageY - posY - buttonHeight / 2;        // Add the ripples CSS and start the animation
        jQuery(".ripple").css({
            width: buttonWidth,
            height: buttonHeight,
            top: y + 'px',
            left: x + 'px'
        }).addClass("rippleEffect");
    });
    if (is_mobile) {
        // third-level-menu on mobile
        var tlmenu = jQuery('#block-itg-menu-manager-third-level-menu .select-menu');
        tlmenu.click(function () {
            jQuery('.mobile-nav .fa-times').trigger('click');
            jQuery(this).next('ul').stop().slideToggle();
        });
        jQuery(document).on('click', function () {
            jQuery('#block-itg-menu-manager-third-level-menu ul.third-level-menu').slideUp();
            ;
        });
        tlmenu.click(function (e) {
            e.stopPropagation();
        });        // jQuery code to set personalization tab in mobile
        jQuery('body').on('click', '.personal-menu-tab-mobile', function () {
            jQuery(this).next().slideToggle();
        });
        jQuery('.personal-menu-tab').on('click', 'li', function () {
            var el = $(this);
            var get_class = el.attr('class'), get_text = el.find('a').text();
            el.closest('.personal-menu-tab-wrapper').find('.tab-text').attr('data-tab', get_class).text(get_text);
            el.parent().slideUp('fast');
        });        // jQuery code for personalization saved item on mobile
        jQuery('body').on('touchend', '.personal-action', function () {
            jQuery(this).parent().parent().siblings().find('.personal-action').css('opacity', '0');
            jQuery(this).css('opacity', '1');
        });
        jQuery('.event-search-icon').click(function () {
            jQuery('.event-search input').css('width', '180px');
        });
        jQuery(document).on('click touchstart', function () {
            jQuery('.event-search input').css('width', '0px');
        });
        jQuery('.event-search-icon, .event-search input').click(function (e) {
            e.stopPropagation();
        });        //for iphone zoom page
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });
    }    //event page navigation
    jQuery('#block-menu-menu-event-menu a.mobile-nav').click(function () {
        jQuery('#block-menu-menu-event-menu ul.menu').slideToggle();
    });    //city dropdown menu
    var ctymenu = jQuery('#block-itg-menu-manager-third-level-menu .cities-select-menu');
    ctymenu.click(function () {
        jQuery('#newlist').slideUp();
        jQuery(this).next('ul.cities-third-level-menu').stop().slideToggle();
    });
    jQuery(document).on('click', function () {
        jQuery('#block-itg-menu-manager-third-level-menu ul.cities-third-level-menu').slideUp();
    });
    ctymenu.click(function (e) {
        e.stopPropagation();
    });    //story page social share for mobile
    var getclick;
    jQuery('.comment-mobile .share-icon').toggle(function () {
        getclick = jQuery(this).parents('.comment-mobile').find('.social-share');
        getclick.css({'display': 'inline-block'});
    }, function () {
        getclick.css({'display': 'none'});
    });    // jQuery code to add Light off/on effect
    jQuery('body').on('click', '.light-off-on-tab', function () {
        jQuery(this).find('a').toggleClass('active');
        jQuery('body').toggleClass('light-off-overlay');
        jQuery('.program-livetv').toggleClass('effect-added');
    });    //footer css slider end
    jQuery('.emoji-container a').click(function () {
        var datavalue = jQuery(this).attr('data-click');
        if (datavalue === 'nice') {
            smilyanimation('smily');
        } else if (datavalue === 'no') {
            smilyanimation('smilysad');
        } else if (datavalue === 'whatever') {
            smilyanimation('wgmf');
        }
    });
    // jQuery code to show embed code popup
    jQuery('.show-embed-code-link .embed-link').click(function (e) {
        jQuery(this).toggleClass('active');
        jQuery(this).next('.show-embed-code-div').stop().fadeToggle();
        e.stopPropagation();
        return false;
    });
    jQuery('.show-embed-code-div').click(function (e) {
        e.stopPropagation();
    });
    jQuery(document).click(function () {
        jQuery('.show-embed-code-div').hide();
    });

    if (window.innerWidth <= 768) {
        jQuery('.drkmode').removeClass('hide');
        jQuery('.navigation .nav-items.ripple-effect.hide').removeClass('hide');
        jQuery('.navigation .all-menu').addClass('hide');
    }
});
