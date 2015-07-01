$ = jQuery;
var mall_top_page = 1;
var mall_top_total_pages;
var mall_top_total_items;
var mall_top_fake_items = 0;
var mall_top_animation_counter;
var mall_top_is_animating = false;
$(function(){
    if( $(".top-items.banner").length ){
        getInitialVariables();
        $("body").on( "click",".top-items.banner .arrow", callback_mall_top_arrow );
    }
});

function getInitialVariables(){
    mall_top_total_items = $(".top-items.banner .item[page]").length;
    if( mall_top_total_items > 1 ) mall_top_fake_items = 4;
    mall_top_total_pages = Math.ceil( mall_top_total_items / 2 );

    if( mall_top_total_pages > 1 ){
        console.log('a');
        $(".top-items.banner .inner .item").css('left','-100%');
    }
    else{
        console.log('b');
        $(".top-items.banner .arrow").css('display','none');
    }
}


function callback_mall_top_arrow(){
    if( mall_top_total_pages <= 1 ) return;

    if( mall_top_is_animating ) return;

    mall_top_is_animating = true;
    $this = $(this);


    mall_top_animation_counter = 0;

    if( $this.hasClass('right') ){
        movement = "-=";
        mall_top_page ++;
    }
    else if( $this.hasClass('left') ){
        movement = "+=";
        mall_top_page --;
    }

    do_animation_callback_mall_top( movement, 1, 500, mall_top_animate_callback );
}

function do_animation_callback_mall_top( movement, num, speed, callback ){
    $(".top-items.banner .item").animate({
        left: movement + ( num * 100 ) + "%"
    }, speed, callback );
}

function mall_top_animate_callback(){
    mall_top_animation_counter ++;
    //console.log( mall_top_animation_counter );
    //console.log( mall_top_total_items + mall_top_fake_items );

    if( mall_top_animation_counter >= ( mall_top_total_items + mall_top_fake_items ) ){
        mall_top_animation_counter = 0;
        if( mall_top_page < 1 ){
            do_animation_callback_mall_top( "-", mall_top_total_pages, 0, mall_top_animate_callback );
            mall_top_page = mall_top_total_pages;
        }
        else if( mall_top_page > mall_top_total_pages ){
            do_animation_callback_mall_top( "-", 1, 0, mall_top_animate_callback );
            mall_top_page = 1;
        }
        mall_top_is_animating = false;
    }

    //mall_top_is_animating = false;
}