$(document).ready(function(){        

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', function () {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });
    //스크롤
    let pageWrap = document.querySelector('.pageWrap');  
    let page = document.querySelectorAll('.page'); 
    let pageLength = page.length;
    let current = 0;
    let windowHeight = window.innerHeight;      
    let footerHeight = $('.page.footer').innerHeight();
    let scrollHeight = 0;
    let animation = true;    
            
    function ani(){
        animation = false;
        pageWrap.addEventListener('transitionend',function(){
            animation = true;
        });
    }
    function wheel(){
        if(current == pageLength-1){
            scrollHeight = windowHeight*(current-1) + footerHeight; 
        }else{
            scrollHeight = windowHeight*current; 
        }
        $(".pageWrap").css('transform','translateY(-'+scrollHeight+'px)');
        $(".page").removeClass('now');
        $(".page").eq(current).addClass('now on');
    }     
    function up(){   
        if( current > 0 && $(".page").eq(current).children('.scrollBox').scrollTop() == 0 && animation == true){
            current--; 
            ani();
            wheel();    
        }   
    }
    function down(){
        if( current < pageLength-1 && animation == true){
            if($(".page").eq(current).children('.scrollBox').scrollTop() + $(".page").eq(current).children('.scrollBox').innerHeight() >= $(".page").eq(current).children('.scrollBox').prop('scrollHeight')){
                current++; 
                ani();
                wheel();
            }
        }
    }        
    window.addEventListener("wheel",function(e){               
        if(e.deltaY<0){
            up(); 
        }else{ 
            down();
        }
    });
    window.addEventListener('resize',function(){
        windowHeight = window.innerHeight;   
        footerHeight = $('.page.footer').innerHeight();
        //windowHeight =  $(".page").eq(current).innerHeight();  
        wheel();  
    })
    
    $("h1 span, .pageMenu span").on('click',function(){
        current = $(this).parents('li').index() + 1;
        console.log(current);
        wheel(current);
    })
    
    let percentage = 0;
    function progressBar(cont){
        percentage = Math.floor((cont.scrollTop() /
            (cont.prop("scrollHeight") - cont.prop("clientHeight"))
            ) * 100);     
        cont.find('i').css('height',percentage+'%');
    }
    $('.progressBarBox').on('scroll',function(){
        progressBar($(this));
    });

    let fadeLi = $('.animateFadeList>li');
    let fadeLength = fadeLi.length;
    let fadeCont = fadeLi.find('.fadeCont');
    let fadeSection = Math.floor(($('.animateFadeWrap').prop("clientHeight"))/fadeLength);
    let fadeIndex = 1;
    let fadeScroll = 0;
    let fadeArray = new Array();
    let indexEq = 1;
    for( var i = 0; i <= fadeLength ; i++){
        fadeArray.push(fadeSection * i);
    }
    function fadeWheelDown(eq){
        fadeCont.removeClass('wheelup active next prev');
        fadeLi.removeClass('now start');
        fadeLi.eq(eq).addClass('now');
        fadeLi.eq(eq).prev().find('.fadeCont').addClass('wheeldown prev');
        fadeLi.eq(eq).find('.fadeCont').addClass('wheeldown active on'); 
        if( fadeLi.eq(eq).find('input[type="checkbox"]').prop("checked") == false){
            fadeLi.eq(eq).find('input[type="checkbox"]').prop('checked',true).trigger("change");            
        }
    }
    function fadeWheelUp(eq){
        fadeCont.removeClass('wheeldown active next prev');
        fadeLi.removeClass('now');
        fadeLi.eq(eq).prev().addClass('now');
        fadeLi.eq(eq).find('.fadeCont').addClass('wheelup active');       
        fadeLi.eq(eq).prev().find('.fadeCont').addClass('wheelup next');
    }
    
    $('.topBtn').on('click',function(){
        current = 0;
        wheel();
    });


    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){//모바일
        console.log('mobile js');
        var mobClass = document.querySelector('.container');
        mobClass.classList.add('is-mob');
        $(window).on('touchstart',function(e){
            e.stopImmediatePropagation();
            startY = e.originalEvent.changedTouches[0].screenY;
        });
        $(window).on('touchend',function(e){
            endY=e.originalEvent.changedTouches[0].screenY;  
            touchY = endY - startY;
            if( touchY <= 0){   
                if( current < pageLength-1 && animation == true){
                    down();
                }
            }else{
                up(); 
            }
        });
        $('.animateFadeBox a, .animateFadeBox .popOpenBtn').on('touchend',function(e){
            e.stopImmediatePropagation();
        });
        $('.animateFadeList>li').on('touchstart',function(e){
            startX = e.originalEvent.changedTouches[0].screenX;
        });
        $('.animateFadeList>li').on('touchend',function(e){
            e.stopImmediatePropagation();
            endX=e.originalEvent.changedTouches[0].screenX;  
            touchX = endX - startX;
            indexEq = fadeIndex-1;
            if( touchX <= 0){   
                if( fadeIndex < fadeLength){
                    fadeIndex += 1;
                    indexEq++;
                    fadeWheelDown(fadeIndex-1);
                    
                }
            }else{
                if(fadeIndex > 1){
                    fadeIndex -= 1;
                    indexEq--;
                    fadeWheelUp(fadeIndex);
                }                
            }
        });
        
    }else{ //PC 
        console.log('pc js');   
        $('.animateFadeBox').on('scroll',function(){       
            fadeScrollNow = $(this).scrollTop();  
            indexEq = fadeIndex-1;         
            if( fadeScrollNow > fadeArray[fadeIndex-1] && fadeScrollNow <= fadeArray[fadeIndex]){
                // console.log(fadeIndex);               
            }else{
                if(fadeScrollNow > fadeScroll){
                    if( fadeIndex < fadeLength){
                        fadeIndex += 1;
                        fadeWheelDown(fadeIndex-1);
                    }
                }else{
                    if(fadeIndex > 1){
                        fadeIndex -= 1;
                        fadeWheelUp(fadeIndex);
                    }
                }
            }
            fadeScroll = fadeScrollNow;
        });     
    }


});

 
