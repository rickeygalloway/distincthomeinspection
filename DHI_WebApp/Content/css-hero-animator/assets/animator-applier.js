chanimator_object = ajax_object.chanimator_current_step;
if (chanimator_object!== '') chanimator_object = JSON.parse(chanimator_object);

function chani_apply_animation(json_object){
	jQuery(json_object).each(function(i,c){
		
		
		
		ww = jQuery(window).width();
		
		obj = jQuery(c.item);
		par = obj.parent();
		
		animation_type		= c.animation;
		animation_speed 	= c.speed;
		animation_offset 	= c.offset;
		animate_once 		= c.run_once;
		disable_on_mobile = c.disable_mobile;
		
		if (!animation_speed)	animation_speed = '';
		if (animate_once && animate_once == 'yes'){
			animate_once = 'animateOnce'
		} else {
			animate_once = '';
		}
		
		if (disable_on_mobile == 'yes' && ww < 768){
			// DISABLED
		} else {
			par.addClass('animatedParent '+animate_once);
			if (animation_offset) par.attr('data-appear-top-offset',animation_offset);
			obj.addClass('animated '+animation_type+' '+animation_speed);
		}
	})
}
jQuery(document).ready(chani_apply_animation(chanimator_object));
	