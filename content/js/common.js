
$(function(){  
    function mobClass(){   
        var windowWidth = $( window ).width(); 
        if(windowWidth <= 768) {  
            $('body').addClass('uni-mob');
         } 
            else {  
                $('body').removeClass('uni-mob');            
         }
    }
    mobClass();
    $( window ).resize( function() {
        mobClass();
    } );

    var alertbtn = $('.top-menu ul').children('li').eq(-1);  
    alertbtn.on('click',function(){
        alert('준비중');
    });
    $('.mob-btn-back').click(function(){
        window.parent.history.back();
    });
});