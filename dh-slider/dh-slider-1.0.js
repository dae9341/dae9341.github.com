var dh_slider = function dh_slider(opt) {

    opt = $.extend({
        dh_slider:'#dh-bnrSlider',
        dh_leftBtn:'',
        dh_rightBtn:''
    },opt);

    var $dhSlider = $(opt.dh_slider); //#dh-bnrSlider
    var $dhSliderUl = $dhSlider.find('ul'); // ul.dh_slider
    var $leftBtn = $(opt.dh_leftBtn); // leftBtn
    var $rightBtn = $(opt.dh_rightBtn); // rightBtn
    var $sliderIndex = $dhSliderUl.children('li');  //li
    var sliderCnt = $sliderIndex.length; //슬라이드 갯수
    var slideWidth = $sliderIndex[0].offsetWidth;
    var slideHeight = $sliderIndex[0].offsetHeight;
    var onIndexNum = 1;
    var cloneFlag = false;

    function start(){

        console.log($leftBtn);
        console.log($rightBtn);

        slideSet();
        try {
            eventBind();
        }catch (e) {
            console.log(e);
        }
    }

    //slide style 설정
    function slideSet (){


    }

    function eventBind (){
        $leftBtn.on('click', function () {
            console.log('left!');
        });

        $rightBtn.on('click', function () {
            console.log('right!');
        });
    }

    try {
        start();
    }catch (e) {
        console.log(e);
    }

};
