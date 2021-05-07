(function ($) {
    $(document).ready(function () {
        $(document).on('click', '#menu-left li.has-sub > a', function () {
            $(this).removeAttr('href');
            let element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            } else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });
        $(document).on('click', '.menu-left li.has-sub > div > a', function () {
            $(this).removeAttr('href');
            let element = $(this).closest('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            } else {
                element.addClass('open');
                element.children('div').children('ul').slideDown();
                element.siblings('li').children('div').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });
    });
})(jQuery);
