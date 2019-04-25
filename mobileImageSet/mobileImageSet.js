var mobileImageSet = function mobileImageSet(opt){
    opt = $.extend({
        imageLayer: $('#imageLayer'),
        btnImageLoad: $('#btnEnter'),
        imageURL: $('#imageUrl'),
        canvas: $('#canvas'),


    },opt);

    var $imageLayer = opt.imageLayer; //이미지나오는 영역
    var $btnImageLoad = opt.btnImageLoad; //이미지로드 버튼
    var $imageUrlInput = opt.imageURL; //이미지URL INPUT
    var imageURL = null; //이미지URL
    var $ImageTag = null; //이미지태그
    var imageWidth = 0;
    var imageHeight = 0;
    var $canvas = opt.canvas;
    var ctx = $canvas[0].getContext("2d");
    var drawReady = false;
    var startX, startY, endX, endY;


    //시작 함수
    function startFunc() {
        bindEvt();
    }

    //이벤트 바인드
    function bindEvt(){

        //확인 버튼 클릭
        $btnImageLoad.on('click', function () {
            imageURL = $imageUrlInput.val();
            if($ImageTag){
                $ImageTag.remove();
            }
            $imageLayer.append("<img src='"+imageURL+"'/>");
            $ImageTag = $imageLayer.find('img');

            $ImageTag[0].onload=function(){
                imageWidth = this.clientWidth;
                imageHeight = this.clientHeight;
                $canvas[0].width = imageWidth;
                $canvas[0].height = imageHeight;

                ctx.rect(44,38,108,123);
                ctx.stroke();

                $canvas.mousedown (function(event){
                    startX = event.clientX;
                    startY = event.clientY;
                    console.log(event.clientX, event.clientY);
                    ctx.beginPath();
                    drawReady = true;
                });

                $canvas.mousemove(function (event) {
                    if(drawReady){
                        ctx.strokeRect(startX, startY, event.clientX, event.clientY);
                    }
                });

                $canvas.mouseup (function(event){
                    endX = event.clientX;
                    endY = event.clientY;
                    // ctx.rect(startX, startY, event.clientX, event.clientY);
                    // ctx.stroke();
                    console.log(event.clientX, event.clientY);
                    drawReady = false;

                });

            }

            console.log($imageLayer);
            console.log($ImageTag);


        });
    }


    startFunc();
};


