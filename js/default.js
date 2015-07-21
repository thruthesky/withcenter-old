var $ = jQuery;
var selector_member_profile_box = '.member-profile-box';
$(function(){
    var $body = $('body');
    $body.on('mouseenter', '.member-profile', on_member_profile);
    function on_member_profile(e) {
        var name = $(this).text();
        var uid = $(this).attr('uid');
        var target_id = $(this).attr('target_id');
        var markup = get_member_profile_box(uid, name);
        $(selector_member_profile_box).remove();
        $body.append(markup);
        var h_member_profile = $('.member-profile').outerHeight() + 4;
        console.log("h:"+h_member_profile);
        var position = $(".member-profile[uid='"+uid+"'][target_id='"+target_id+"'").position();
        var top = position.top + h_member_profile;
        var left = position.left + 60;
        $(selector_member_profile_box).css({
            'position': 'absolute',
            'top': top + 'px',
            'left': left + 'px',
            'padding': '1em',
            'background-color': '#f2f2f2'
        });

        console.log(e);
    }
    function get_member_profile_box(uid, name) {
        var m = "<div class='member-profile-box'>";
        m += "<div class='row'><span class='caption'><a href='/message/send?receiver="+name+"'>"+name+"</a></span></div>";
        m += "<div class='row'><span class='caption'><a href='/message/send?receiver="+name+"'>Send Message</a></span></div>";
        m += "<div class='row'><span class='caption'><a href='/post/search?qn=y&q="+name+"'>Search Posts</a></span></div>";
        m += "<div class='row'><span class='caption'><a href='/member/view/"+name+"'>View Profile</a></span></div>";
        m += "</div>";
        return m;
    }

});

