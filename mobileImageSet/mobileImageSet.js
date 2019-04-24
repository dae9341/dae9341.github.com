var mobileImageSet = function mobileImageSet(opt){
    opt = $.extend({
        imageLayer: $('#imageLayer'),
        btnImageLoad: $('#btnEnter'),
        imageURL: $('#imageUrl'),
        canvas: $('#canvas')

    },opt);

    var $imageLayer = opt.imageLayer; //이미지나오는 영역
    var $btnImageLoad = opt.btnImageLoad; //이미지로드 버튼
    var $imageUrlInput = opt.imageURL; //이미지URL INPUT
    var imageURL = null; //이미지URL
    var $ImageTag = null; //이미지태그
    var imageWidth = 0;
    var imageHeight = 0;
    var $canvas = opt.canvas;


    //시작 함수
    function startFunc() {
        bindEvt();
        canvasSet();
    }

    //이벤트 바인드
    function bindEvt(){

        //확인 버튼 클릭
        $btnImageLoad.on('click', function () {
            imageURL = $imageUrlInput.val();
            if($ImageTag){
                $ImageTag.remove();
            }
            $imageLayer.append('<img src="'+imageURL+'"/>');
            $ImageTag = $imageLayer.find('img');
            console.log($ImageTag);
            // $canvas.width = $ImageTag.width();
            // $canvas.height = $ImageTag.height();
            // console.log($canvas);
        });
    }

    function canvasSet() {
        if($ImageTag) {
            console.log($ImageTag.width());
        }

    }

    startFunc();
};


