$ = jQuery;
var mall_top_page = 1;
var mall_top_total_pages = 0;
var mall_top_fake_total_pages = 0;
var mall_top_total_items = 0;
//var mall_top_fake_items = 0;
var mall_top_animation_counter = 0;
var mall_top_is_animating = false;

var timeout_confirm_password;
$(function(){	
	if( $(".top-items.banner").length ){
		getInitialVariables();
		$("body").on( "click",".top-items.banner .arrow", callback_mall_top_arrow );
	}
	
	$("body").on( "click",".layout > header .top table.menu-table .item.more", callback_slide_nav_menu );
	
	$("body").on( "mouseenter","header .bottom .inner a.menu", callback_menu_class_in );
	$("body").on( "mouseleave","header .bottom .inner a.menu", callback_menu_class_out );

	$("body").on( "keyup",".member-form .row.data-set > .text input[name='confirm_password']", callback_confirm_password );
	$("body").on( "keyup",".member-form .row.data-set > .text input[name='password']", callback_confirm_password );

});

function callback_confirm_password(){
	clearTimeout( timeout_confirm_password );
	var $this = $(this);
	$selector = $(".member-form .row.confirm_password");
	timeout_confirm_password = setTimeout( function(){				
		if( $(".member-form .row.data-set > .text input[name='password']").val() == "" ){
			$selector.find(".form-error").remove();
			return;
		}
		
		if( $(".member-form .row.data-set > .text input[name='password']").val() != $(".member-form .row.data-set > .text input[name='confirm_password']").val() ){
			if( $selector.parent().find(".form-error").length ) return;
			$selector.find(".text").append( create_form_error_notice("Does not match with the password.") );
		}
		else{
			$selector.find(".form-error").remove();
		}
	}, 300);
}

function create_form_error_notice( str ){
	return "<div class='form-error'>" + str + "</div>";
}

function callback_slide_nav_menu(){
	$("header .top nav.menu").slideToggle();
}

var menu_timout_in;

function callback_menu_class_in(){	
	$this = $(this);		
	menu_timout_in = setTimeout( function(){
		if( $this.hasClass('add') ) return;
		if( $this.hasClass('selected') ) return;
		$this.addClass('hover');	
	}
	, 300 );
}

function callback_menu_class_out(){	
	clearTimeout( menu_timout_in );
	$this = $(this);
	if( $this.hasClass('hover') ) $this.removeClass('hover');
}

function getInitialVariables(){
	mall_top_total_items = $(".top-items.banner .item[page]").length;
	mall_top_total_pages = $(".top-items.banner .page[page]").length;
	mall_top_fake_total_pages = $(".top-items.banner .page.fake").length;
	if( mall_top_total_pages > 1 ){
		reset_mall_top_position();				
	}
	else{
		$(".top-items.banner .arrow").css('display','none');
	}	
}

function reset_mall_top_position(){
	starting_value = -100;
	for( i = 0; i < ( mall_top_total_pages + mall_top_fake_total_pages ); i++ ){		
		$(".top-items.banner .inner .page:eq(" + i + ")").css('left', ( starting_value ) + '%');		
		starting_value = starting_value + 100;
	}
}

function move_to_last_mall_top_position(){
	starting_value = 100;
	for( i = ( mall_top_total_pages + mall_top_fake_total_pages - 1 ); i >= 0; i-- ){	
		//console.log( i + ": " + starting_value );
		$(".top-items.banner .inner .page:eq(" + i + ")").css('left', ( starting_value ) + '%');
		
		starting_value = starting_value - 100;
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
	$(".top-items.banner .page").animate({
		left: movement + ( num * 100 ) + "%"
	}, speed, callback );
}

function mall_top_animate_callback(){
	mall_top_animation_counter ++;	
	if( mall_top_animation_counter >= ( mall_top_total_pages + mall_top_fake_total_pages ) ){			
		mall_top_animation_counter = 0;		
		if( mall_top_page < 1 ){
			setTimeout(function(){ move_to_last_mall_top_position(); },1);
			mall_top_page = mall_top_total_pages;
		}
		else if( mall_top_page > mall_top_total_pages ){
			//seems to have some kind of bug..
			setTimeout(function(){ reset_mall_top_position(); },1);
			
			mall_top_page = 1;			
		}		
		mall_top_is_animating = false;		
	}	
	//mall_top_is_animating = false;
}