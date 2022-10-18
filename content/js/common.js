function onClass(ul,num){
    for(var li of ul){
        li.classList.remove('on');
    }
    ul[num].classList.add('on');
}
const mainBox = document.querySelector('.mainBox');
const portUl = document.querySelector('.port-ul-wrap');
const portLi = document.querySelector('.port-ul').children;
const portBox = document.querySelector('.port-boxes').children;
let boxTop = 500;
function nowBox() {
    let scrollTop = window.scrollY;    
    mainBox.classList.add('on');
    portUl.classList.add('on');
    if(scrollTop < boxTop && scrollTop > 200){
        onClass(portLi,0);
        onClass(portBox,0);
    }else if(scrollTop > boxTop && scrollTop < boxTop*2 ){
        onClass(portLi,1);
        onClass(portBox,1);
    }else if(scrollTop > boxTop*2  && scrollTop < boxTop*3 ){
        onClass(portLi,2);
        onClass(portBox,2);
    }else if(scrollTop > boxTop*3  && scrollTop < boxTop*4 ){
        onClass(portLi,3);
        onClass(portBox,3);
    }else if(scrollTop > boxTop*4 ){
        onClass(portLi,4);
        onClass(portBox,4);
    }else if(scrollTop == 0){
        for(var li of portLi){
            li.classList.remove('on');
        }
        mainBox.classList.remove('on');
        portUl.classList.remove('on');
    }
}
for(var i = 0; i<portLi.length ; i++){
    (function(idx){
        portLi[idx].onclick = function(){
            window.scrollTo({top:(idx * boxTop + 450), left:0, behavior:'auto'});
            nowBox();
        }
    })(i)
}
window.addEventListener('scroll', nowBox);
nowBox();

const slideUl = document.querySelector('.slide');
//const slideImg = document.querySelectorAll('.slide-img');
let imgWidth = 12100 - window.innerWidth;
//let imgWidth = slide.scrollWidth;
// for(var i = 0; i<slideImg.length ; i++){
//     (function(idx){
//         imgWidth += slideImg[idx].scrollWidth;
//     })(i)
// }
//console.log(imgWidth);
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