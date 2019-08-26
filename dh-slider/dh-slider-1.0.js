var dh_slider = function dh_slider(opt) {

    opt = $.extend({
        dh_slider:'#dh-bnrSlider', //슬라이더 DOM
        dh_leftBtn:'', //좌측버튼
        dh_rightBtn:'', //우측버튼
        dh_indicator:'', //인디케이터 DOM
        firstSlide:1,  // 시작페이지 설정 1~length
        loop:true, //루프 설정
        width:'',
        height:'',
        autoplay:false,
        viewItem:1,
        moveItem:1
    },opt);

    var $dhSlider = $(opt.dh_slider); //#dh-bnrSlider
    var $dhSliderUl = $dhSlider.find('ul'); // ul.dh_slider
    var $dhSliderUlClone = $dhSliderUl.clone(true).appendTo($dhSlider); //슬라이드 복제
    var $leftBtn = $(opt.dh_leftBtn); // leftBtn
    var $rightBtn = $(opt.dh_rightBtn); // rightBtn
    var $sliderLis = $dhSliderUl.children('li');  //li
    var intSliderCnt = $sliderLis.length; //슬라이드 갯수
    var slideWidth = ((opt.width)? opt.width:$sliderLis.children('img')[0].width); // 슬라이드 width값
    var slideHeight = (opt.height)? opt.height:$sliderLis.children('img')[0].height; //슬라이드 height값
    var onIndexNum = 1; // 0~length 현재 활성화페이지
    var intStartSlide = opt.firstSlide; // 1~length 시작 페이지
    var cloneFlag = false; // 슬라이드 요소 2개일때 : true
    var intCloneItem; // 클론하는 item의 인덱스 저장변수
    var $dhIndicator = $(opt.dh_indicator); //인디케이터 DOM
    var isLoop = opt.loop; //루프 설정
    var isAutoPlay = opt.autoplay ; //자동슬라이드
    var autoPlayInterval = null;

    var viewItem = (opt.viewItem < intSliderCnt && opt.viewItem > 0) ? opt.viewItem:1;
    var viewWidth = slideWidth * viewItem;
    var moveItem = opt.moveItem;


    // dh-slider 시작
    function start(){

        slideSet();
        autoPlay(isAutoPlay);

        try {
            eventBind();
        }catch (e) {
            console.log(e);
        }

    }

    // dh-slider css, 변수 세팅
    function slideSet (){

        for(var i= 0; i < intSliderCnt; i++){
            $dhIndicator.append('<a></a>');
        }

        //이미지 2개일때, 슬라이딩시 사진영역벗어나는 부분처리
        if(intSliderCnt === 2){
            intSliderCnt=3;
            cloneFlag = true;
        }

        $dhSlider.css({'width':viewWidth,'height':slideHeight,'overflow':'hidden'});
        $dhSliderUl.css({'overflow':'hidden','width':slideWidth*intSliderCnt+'px', 'top':'0px','left':'-'+slideWidth+'px'});
        $dhSliderUlClone.css({'display':'none'});

        onIndexNum = intStartSlide-1;
        $dhIndicator.find('a').eq(onIndexNum).addClass('on');
        loopCheck();

        onSlideSet(intStartSlide);

    }

    //이벤트 바인딩
    function eventBind (){
        //좌측버튼 클릭
        $leftBtn.on('click', function () {
            leftSlideMove(onIndexNum);
            clearInterval(autoPlayInterval);
            autoPlay(isAutoPlay);
        });

        //우측버튼 클릭
        $rightBtn.on('click', function () {
            rightSlideMove(onIndexNum);
            clearInterval(autoPlayInterval);
            autoPlay(isAutoPlay);
        });

        //인디케이터 요소 클릭
        $dhIndicator.find('a').on('click', function () {
            $dhIndicator.find('a').removeClass('on');
            $(this).addClass('on');
            onIndexNum = $(this).index();
            if(cloneFlag){
                if(onIndexNum === 0){
                    $dhSliderUl.find('li').eq(2).remove();
                }else{
                    $dhSliderUl.find('li').eq(0).remove();
                }

            }
            onSlideSet(onIndexNum + 1);
            loopCheck();

        });

    }

    function loopCheck() {

        if(!isLoop){
            if(onIndexNum === 0){
                $leftBtn.addClass('noneClick');
                $rightBtn.removeClass('noneClick');
            }else if(onIndexNum === intSliderCnt -1 || (onIndexNum === 1 && cloneFlag)){
                $rightBtn.addClass('noneClick');
                $leftBtn.removeClass('noneClick');
            }else{
                $leftBtn.removeClass('noneClick');
                $rightBtn.removeClass('noneClick');
            }
        }
    }


    // 활성화 페이지 설정 startLi: 1~length
    function onSlideSet(startLi) {
        if(cloneFlag){
            if(startLi === 1){
                $dhSliderUlClone.find('li').eq(1).clone(true).insertBefore($dhSliderUl.find('li').eq(0));
            }else{
                $dhSliderUlClone.find('li').eq(0).clone(true).appendTo($dhSliderUl);
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

    //좌측 이동 인자값: 현재 활성화 페이지 index
    function leftSlideMove(slideIndex) {

        $dhSliderUl.css({'left':'-'+slideWidth*2+'px'});
        $dhSliderUl.animate({left:'+='+slideWidth+'px'});

        var temp = [];

        for(var j = 0; j < moveItem; j++) {
            //Clone필요한 index넘버 추출 (li의 위치조정)
            for (var i = 0; i < intSliderCnt; i++) {
                if ($dhSliderUlClone.find('li').eq(i).find('img').attr('src') === $dhSliderUl.find('li').eq(intSliderCnt - 1 - j).find('img').attr('src')) {
                    intCloneItem = i;
                    temp.push(i);
                }
            }
        }

        //이미지 2개일때
        if(cloneFlag){
            if (intCloneItem === 0) {
                intCloneItem += 1;
            } else {
                intCloneItem -= 1;
            }

            if(slideIndex <= 0){
                slideIndex = 1;
            }else{
                slideIndex--;
            }
        }else{//이미지 3개 이상
            if(slideIndex <= 0){
                slideIndex = intSliderCnt-1;
            }else{
                slideIndex--;
            }
        }


        for(var j = 0; j < moveItem; j++) {
            //li태그 이동
            $dhSliderUl.find('li').eq(intSliderCnt - 1).remove();
            $dhSliderUlClone.find('li').eq(temp[j]).clone(true).insertBefore($dhSliderUl.find('li').eq(0));
        }

        //indicator
        $dhIndicator.find('a').removeClass('on');
        $dhIndicator.find('a').eq(slideIndex).addClass('on');

        onIndexNum = slideIndex;

        loopCheck();
    }

    //우측 이동 인자값: 현재 활성화 페이지 index
    function rightSlideMove(slideIndex) {
        $dhSliderUl.css({'left':'0px'});
        $dhSliderUl.animate({left:'-='+slideWidth+'px'});

        var temp = [];
        for(var j = 0; j < moveItem; j++) {
            //Clone필요한 index넘버 추출
            for(var i= 0; i < intSliderCnt; i++){
                    if ($dhSliderUlClone.find('li').eq(i).find('img').attr('src') === $dhSliderUl.find('li').eq(j).find('img').attr('src')) {
                        intCloneItem = i;
                        temp.push(i);
                    }
            }
        }

        //이미지 2개 일때
        if(cloneFlag) {
            if (intCloneItem === 0) {
                intCloneItem += 1;
            } else {
                intCloneItem -= 1;
            }

            if(slideIndex >= intSliderCnt-2 ){
                slideIndex = 0;
            }else {
                slideIndex++;
            }
        }else{
            if(slideIndex >= intSliderCnt-1 ){
                slideIndex = 0;
            }else {
                slideIndex++;
            }
        }


        console.log("intCloneItem:::::::::",temp);
        //li태그 이동
        for(var j = 0; j < moveItem; j++) {
            $dhSliderUl.find('li').eq(0).remove();
            $dhSliderUlClone.find('li').eq(temp[j]).clone(true).appendTo($dhSliderUl);
        }
        //indicator
        $dhIndicator.find('a').removeClass('on');
        $dhIndicator.find('a').eq(slideIndex).addClass('on');

        onIndexNum = slideIndex;

        loopCheck();

    }

    //right,left무브 통합
    function slideMove(type) {
        if(type == 'r'){
            $dhSliderUl.css({'left':'0px'});
            $dhSliderUl.animate({left:'-='+slideWidth+'px'});
        }else if(type=='l'){
            $dhSliderUl.css({'left':'-'+slideWidth*2+'px'});
            $dhSliderUl.animate({left:'+='+slideWidth+'px'});
        }
        
    }
    
    
    function autoPlay(flag) {
        if(!flag){
            return false;
        }
        else{
            autoPlayInterval = setInterval(function () {
                rightSlideMove(onIndexNum);
            },2000);

        }
    }


    //실행부
    try {
        start();
    }catch (e) {
        console.log(e);
    }

};
