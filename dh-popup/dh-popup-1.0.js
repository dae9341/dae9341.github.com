var dh_popup = function dh_popup(opt) {
    opt = $.extend({
        button:'.popupBtn',
        popup:'.popup',
    },opt);

    var $button = $(opt.button);
    var $popup = $(opt.popup);
    var dimLayer;


    function init() {
        bindEvent();
    }

    function dimLayerSet(popup){
        dimLayer='<div class="dimLayer"></div>';
        $('body').append(dimLayer);
        $('.dimLayer').append(popup);
    };

    function popupLayerSet(popup){
        var popup_w = popup.width();
        var popup_h = popup.height();
        popup.css({'position':'absolute','left':'50%', 'top':'50%','margin-left':'-'+popup_w / 2+'px', 'margin-top': '-' + popup_h / 2 + 'px' });
    }

    function bindEvent() {
        $button.on('click', function () {
            popupLayerSet($popup);
            dimLayerSet($popup);
            $popup.show();
        })
    };

    init();




};