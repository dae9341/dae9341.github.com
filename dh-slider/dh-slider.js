var dh_slider = function dh_slider(opt) {
    opt = $.extend({
        dh_slider:'#dh-bnrSlider'
    });

    var dhSlider = $(opt.dh_slider); //#dh-bnrSlider
    var dhSliderUl = $(opt.dh_slider).find('ul'); // ul.dh_slider
    var leftBtn = $(opt.dh_slider).children('.leftBtn'); // leftBtn
    var rightBtn = $(opt.dh_slider).children('.rightBtn'); // rightBtn
    var sliderIndex = dhSliderUl.children('li');  //li
    var sliderCnt = sliderIndex.length; //슬라이드 갯수
    var slideWidth = sliderIndex[0].offsetWidth;
    var slideHeight = sliderIndex[0].offsetHeight;
    var onIndexNum = 1;
    var cloneFlag = false;

    function start(){
        slideSet();
        try {
            eventBind();
        }catch (e) {
            console.log(e);
        }
    }

    //slide style 설정
    function slideSet (){
        //이미지 2개일때, 슬라이딩시 사진영역벗어나는 부분처리
        if(sliderCnt === 2){
            sliderIndex.eq(0).clone(true).appendTo(dhSliderUl);
            sliderCnt = 3;
            cloneFlag = true;
        }
        dhSlider.css({'width':slideWidth, 'height':slideHeight});
        dhSliderUl.css({'width': slideWidth*sliderCnt + 'px', 'top':'0' , 'left': '-'+slideWidth+'px'});

    }

    function eventBind (){
        leftBtn.on('click', function () {
            dhSliderUl.css({'left':'-'+slideWidth*2+'px'});
            dhSliderUl.animate({left: '+='+slideWidth+'px'});

            dhSliderUl.find('li').eq(0).before(dhSliderUl.find('li').eq(sliderCnt-1));

            //이미지 2개일때
            if(cloneFlag){
                dhSliderUl.find('li').eq(0).remove();
                dhSliderUl.find('li').eq(sliderCnt-1).clone(true).before(dhSliderUl.find('li').eq(0));
            }

        });
        rightBtn.on('click', function () {
            dhSliderUl.css({'left':'0px'});
            dhSliderUl.animate({left: '-='+slideWidth+'px'});

            dhSliderUl.find('li').eq(sliderCnt - 1).after(dhSliderUl.find('li').eq(0));

            //이미지 2개일때
            if(cloneFlag){
                dhSliderUl.find('li').eq(sliderCnt-1).remove();
                dhSliderUl.find('li').eq(0).clone(true).appendTo(dhSliderUl);
            }
        });
    }

    try {
        start();
    }catch (e) {
        console.log(e);
    }

};
