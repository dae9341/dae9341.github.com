var dh_slider = function dh_slider(opt) {
    opt = $.extend({
        dh_slider:'.dh-slider',
        leftBtn: '.leftBtn',
        rightBtn:'.rightBtn',
    });

    var dhSlider = $(opt.dh_slider);
    var leftBtn = $(opt.leftBtn);
    var rightBtn = $(opt.rightBtn);
    var sliderWidth = dhSlider.innerWidth();
    var sliderCont = dhSlider.children('li');
    var sliderCnt = sliderCont.length;

    function start(){
        slideSet();
        try {
            eventBind();
        }catch (e) {
            console.log(e);
        }
        console.log(sliderWidth, sliderCnt);
    }

    function slideSet (){
        for(var i = 0; i < sliderCnt; i++){
            sliderCont.eq(i).css('transform3d',i * sliderWidth +'px,0,0');
        }
    }


    function eventBind (){
        leftBtn.on('click', function () {
            console.log('left!');
        });
        rightBtn.on('click', function () {
            console.log('right!');
        });
    }

    try {
        start();
    }catch (e) {
        console.log(e);
    }

};
