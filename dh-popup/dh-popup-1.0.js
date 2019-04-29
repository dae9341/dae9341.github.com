var dh_popup = function dh_popup(opt) {
    opt = $.extend({
        button:'.popupBtn',
        popup:'.popup'
    },opt);

    var $button = $(opt.button);
    var $popup = $(opt.popup);
    var dimLayer;


    function init() {
        bindEvent();
    }

    function dimLayerSet(){
        dimLayer='<div class="dimLayer"></div>';
        $('body').append(dimLayer);
        $popup.append("<a href='javascript:void(0);' class='closeBtn'>닫기</a>");
        $('.dimLayer').append($popup);

        $('.closeBtn').on('click', function () {
            $('.dimLayer').remove();
            $(this).remove();
        })
    };

    function popupLayerSet(){
        var popup_w = $popup.width();
        var popup_h = $popup.height();
        $popup.css({'position':'absolute','left':'50%', 'top':'50%','margin-left':'-'+popup_w / 2+'px', 'margin-top': '-' + popup_h / 2 + 'px' });
    }

    function bindEvent() {
        $button.on('click', function () {
            popupLayerSet();
            dimLayerSet();
            $popup.show();
        });


    };

    init();




};