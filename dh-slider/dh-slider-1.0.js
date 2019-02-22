var dh_slider = function dh_slider(opt) {

    opt = $.extend({
        dh_slider:'#dh-bnrSlider', //슬라이더 DOM
        dh_leftBtn:'', //좌측버튼
        dh_rightBtn:'', //우측버튼
        dh_indicator:'', //인디케이터 DOM
        firstSlide:1  // 시작페이지 설정 1~length
    },opt);

    var $dhSlider = $(opt.dh_slider); //#dh-bnrSlider
    var $dhSliderUl = $dhSlider.find('ul'); // ul.dh_slider
    var $dhSliderUlClone = $dhSliderUl.clone(true).appendTo($dhSlider);
    var $leftBtn = $(opt.dh_leftBtn); // leftBtn
    var $rightBtn = $(opt.dh_rightBtn); // rightBtn
    var $sliderLis = $dhSliderUl.children('li');  //li
    var intSliderCnt = $sliderLis.length; //슬라이드 갯수
    var slideWidth = $sliderLis[0].offsetWidth;
    var slideHeight = $sliderLis[0].offsetHeight;
    var onIndexNum = 1; // 0~length
    var intStartSlide = opt.firstSlide;
    var cloneFlag = false;
    var intCloneItem;
    var $dhIndicator = $(opt.dh_indicator);

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


        for(var i= 0; i < intSliderCnt; i++){
            $dhIndicator.append('<a></a>');
        }

        //이미지 2개일때, 슬라이딩시 사진영역벗어나는 부분처리
        if(intSliderCnt === 2){
            intSliderCnt=3;
            cloneFlag = true;
        }

        $dhSlider.css({'width':slideWidth,'height':slideHeight,'overflow':'hidden'});
        $dhSliderUl.css({'overflow':'hidden','width':slideWidth*intSliderCnt+'px', 'top':'0px','left':'-'+slideWidth+'px'});
        $dhSliderUlClone.css({'display':'none'});

        onIndexNum = intStartSlide-1;
        $dhIndicator.find('a').eq(onIndexNum).addClass('on');

        onSlideSet(intStartSlide);

    }

    // 활성화 페이지 설정 startLi 1~length
    function onSlideSet(startLi) {
        if(cloneFlag){
            if(startLi === 1){
                $sliderLis.eq(1).clone(true).insertBefore($sliderLis.eq(0));
            }else{
                $sliderLis.eq(0).clone(true).appendTo($dhSliderUl);
            }
        }else {
            $dhSliderUl.find('li').remove();
            if (startLi === 1) {
                $dhSliderUlClone.find('li').eq(intSliderCnt - 1).clone(true).appendTo($dhSliderUl);
                for (var i = 0; i < intSliderCnt - 1; i++) {
                    $dhSliderUlClone.find('li').eq(i).clone(true).appendTo($dhSliderUl);
                }

            } else if (startLi > 1 && startLi <= intSliderCnt) {
                for (var i = startLi - 2; i < intSliderCnt; i++) {
                    $dhSliderUlClone.find('li').eq(i).clone(true).appendTo($dhSliderUl);
                }
                for (var j = 0; j < startLi - 2; j++) {
                    $dhSliderUlClone.find('li').eq(j).clone(true).appendTo($dhSliderUl);
                }
            }
        }
    }

    function eventBind (){
        $leftBtn.on('click', function () {
            $dhSliderUl.css({'left':'-'+slideWidth*2+'px'});
            $dhSliderUl.animate({left:'+='+slideWidth+'px'});


            //Clone필요한 index넘버 추출 (li의 위치조정)
            for(var i= 0; i < intSliderCnt; i++){
                if($dhSliderUlClone.find('li').eq(i).find('img').attr('src') === $dhSliderUl.find('li').eq(intSliderCnt-1).find('img').attr('src')) {
                    intCloneItem = i;
                }
            }

            if(cloneFlag){

                if (intCloneItem === 0) {
                    intCloneItem += 1;
                } else {
                    intCloneItem -= 1;
                }

                if(onIndexNum <= 0){
                    onIndexNum = 1;
                }else{
                    onIndexNum--;
                }
            }else{
                if(onIndexNum <= 0){
                    onIndexNum = intSliderCnt-1;
                }else{
                    onIndexNum--;
                }
            }

            //li태그 이동
            $dhSliderUl.find('li').eq(intSliderCnt-1).remove();
            $dhSliderUlClone.find('li').eq(intCloneItem).clone(true).insertBefore($dhSliderUl.find('li').eq(0));


            //indicator
            $dhIndicator.find('a').removeClass('on');
            $dhIndicator.find('a').eq(onIndexNum).addClass('on');

            console.log(onIndexNum);

            console.log('left!::::', onIndexNum);
        });

        $rightBtn.on('click', function () {
            $dhSliderUl.css({'left':'0px'});
            $dhSliderUl.animate({left:'-='+slideWidth+'px'});

            //Clone필요한 index넘버 추출
            for(var i= 0; i < intSliderCnt; i++){
                if($dhSliderUlClone.find('li').eq(i).find('img').attr('src') === $dhSliderUl.find('li').eq(0).find('img').attr('src')) {
                    intCloneItem = i;
                }
            }

            //이미지 2개 일때
            if(cloneFlag) {
                if (intCloneItem === 0) {
                    intCloneItem += 1;
                } else {
                    intCloneItem -= 1;
                }

                if(onIndexNum >= intSliderCnt-2 ){
                    onIndexNum = 0;
                }else {
                    onIndexNum++;
                }
            }else{
                if(onIndexNum >= intSliderCnt-1 ){
                    onIndexNum = 0;
                }else {
                    onIndexNum++;
                }
            }


            //li태그 이동
            $dhSliderUl.find('li').eq(0).remove();
            $dhSliderUlClone.find('li').eq(intCloneItem).clone(true).appendTo($dhSliderUl);

            //indicator
            $dhIndicator.find('a').removeClass('on');
            $dhIndicator.find('a').eq(onIndexNum).addClass('on');
        });

        $dhIndicator.find('a').on('click', function () {
            $dhIndicator.find('a').removeClass('on');
            $(this).addClass('on');
            onIndexNum = $(this).index();
            onSlideSet(onIndexNum + 1);
        });

    }
    
    function slideRightMove(value) {

    }

    try {
        start();
    }catch (e) {
        console.log(e);
    }

};
