$('.leftBox > ul > li > strong').on('click',function(){
    $(this).toggleClass('active');
    $(this).next('div').stop().slideToggle();
});

let sectionNow = 0;
let goalheight = 0;  
let sectionLength = $('.rightBox > div').length -1 ;
function leftScroll(e){
    let wheel = e.originalEvent.wheelDelta;
    if(wheel < 0){
        if(sectionNow < sectionLength){                 
            e.preventDefault();
            goalheight =  $('.rightBox > div').eq(sectionNow).position().top - 25;       
            $('.bodyWrap').animate({
                scrollTop: goalheight
            }, 800);   
            sectionNow++; 
        }
    }else{
        if(sectionNow > 0){
            e.preventDefault();
            sectionNow--;      
            goalheight =  $('.rightBox > div').eq(sectionNow).position().top - 25;       
            $('.bodyWrap').animate({
                scrollTop: goalheight
            }, 800);  
        }else if(sectionNow == 0){
            goalheight = 0;
            sectionNow = 0; 
        }
    }
}
$('.rightBox').on('mousewheel',leftScroll);

$('.leftBox .portfolio li').on('click',function(){
    let link = $(this).data('portlink');
    let goal = $('[data-portname="'+link+'"]');
    goalpoint = goal.position().top - 25;
    $('.bodyWrap').animate({
        scrollTop: goalpoint
    }, 800);
    sectionNow = goal.index() - 1;
});

const slideUl = document.querySelector('.slide');
let imgWidth = 8000 - window.innerWidth;
let x = 0;
let startX, endX, touchX;
var slideNo = false;

setInterval(function(){
    if(x<imgWidth && slideNo == false){
        slideUl.style.transform = 'translateX(-'+x+'px)'; 
        x += 100;
    }else if(x>imgWidth && slideNo == false){
        slideUl.style.transform = 'translateX('+0+'px)'; 
        x = 0;
    }
}, 1000);
slideUl.addEventListener("mouseenter",function(){ 
    slideNo = true;
});
slideUl.addEventListener("mouseleave",function(){ 
    slideNo = false;
});

function slideEvent(e){   
    if(x<imgWidth && x >= 0){
        touchX = endX - startX;
        x -= touchX;
        slideUl.style.transform = 'translateX(-'+x+'px)'
    }
}        
slideUl.onmousedown = function(e){
    e.preventDefault();
    startX = e.pageX;  
};
slideUl.onmouseup = function(e){
    e.preventDefault();
    endX = e.pageX;
    slideEvent();
};
slideUl.ontouchstart = function(e){
    e.preventDefault();
    startX = e.originalEvent.changedTouches[0].screenX;
};
slideUl.ontouchend = function(e){
    e.preventDefault();
    endX=e.originalEvent.changedTouches[0].screenX;  
    slideEvent();
};