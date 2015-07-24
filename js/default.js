var $ = jQuery;
var selector_member_profile_box = '.member-profile-box';

var member_profile_timeout;
var member_profile_timeout_in;
$(function(){
    var $body = $('body');
    $body.on('mouseenter', '.member-profile', on_member_profile);
	
	$body.on('mouseleave', '.member-profile', on_member_profile_leave);
	
	$body.on('mouseenter', selector_member_profile_box, on_member_box_profile);
	
	$body.on('mouseleave', selector_member_profile_box, on_member_profile_leave);
	
    function on_member_profile(e) {
		clearTimeout( member_profile_timeout );				
		
		var uid = $(this).attr('uid');
        var target_id = $(this).attr('target_id');
			member_profile_timeout_in = setTimeout(function(){
			$(".member-profile-box:not([uid='"+ uid +"'][target_id='"+ target_id +"'])").remove();
			
			var url = "/library/api?call=getMemberProfile&uid=" + uid + "&target_id=" + target_id;
			ajax_api(url, callback_show_member_profile);
		}, 300);
    }
	
	function callback_show_member_profile( re ){
		$(".member-profile-box:not([uid='"+ re.uid +"'][target_id='"+ re.target_id +"'])").remove();
	
		$body.append( re.markup );
		var h_member_profile = $('.member-profile').outerHeight() + 15;
		var position = $(".member-profile[uid='"+re.uid+"'][target_id='"+re.target_id+"']").position();
        var top = position.top + h_member_profile;
        var left = position.left + 10;
		
		
		$(".member-profile-box").css({
            'position': 'absolute',
            'top': top + 'px',
            'left': left + 'px',
        });		
	}
	
	function on_member_profile_leave(){	
		clearTimeout( member_profile_timeout_in );
	
		member_profile_timeout = setTimeout(function(){
			$(selector_member_profile_box).remove();
		},300);
	}
	
	/*on_member_box_profile*/
	function on_member_box_profile(){
		clearTimeout( member_profile_timeout );
	}
	/*EO on_member_box_profile*/
	/*
    function get_member_profile_box(uid, name) {
        var m = "<div class='member-profile-box'>";
		m += "<div class='triangle'></div>";
        m += "<div class='row user'><span class='caption'><a href='/message/send?receiver="+name+"'>"+name+"</a></span></div>";
        m += "<div class='row message'><span class='caption'><a href='/message/send?receiver="+name+"'>Send Message</a></span></div>";
        m += "<div class='row post'><span class='caption'><a href='/post/search?qn=y&q="+name+"'>Search Posts</a></span></div>";
        m += "<div class='row view-profile'><span class='caption'><a href='/member/view/"+name+"'>View Profile</a></span></div>";
        m += "</div>";
        return m;
    }
	*/
});

