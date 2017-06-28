chanimator_stored_animations = [];
chanimator_full_object = ajax_object.chanimator_current_step;

function chanimator_check_already_applied_animation(scope){
	for (var i = 0, len = chanimator_stored_animations.length; i < len; i++) {
        if (chanimator_stored_animations[i].item == scope){
			return i;   
        }
    }
	return -1;
}

function chanimator_clear_animation(scope){
	chanimator_already_stored_element = chanimator_check_already_applied_animation(scope)
	chanimator_stored_animations.splice(chanimator_already_stored_element,1)
	editing_element = jQuery(scope);
	editing_element_parent = editing_element.parent();
	
	chanimator_clear_classes_from_array(editing_element,chanimator_effects_array);
	chanimator_clear_classes_from_array(editing_element,speed_array);
	editing_element.removeClass('animated')
	editing_element_parent.removeAttr('data-appear-top-offset').removeClass('animateOnce').removeClass('animatedParent');
	
	jQuery('.render .render-item-li[render-item-name="'+scope+'"]').fadeOut(300,function(){
		jQuery(this).remove();
		if (jQuery('.render-item-li').length < 1){
			jQuery('#csshero-animator.toggled #animator-toggle').trigger('click')
		}
	})
	
	chanimator_update_state('s2');
	chanimator_clear_states()
	
	zazza = JSON.stringify(chanimator_stored_animations)
	jQuery('#csshero-animator-form-sender').val(zazza)
	
}

function chanimator_update_state(state){
	jQuery('#csshero-animator').attr('data_animator_state',state);
}

function chanimator_clear_classes_from_array(element,array){
	for ( var i = 0; i < array.length; i++ ){
		if ( element.hasClass( array[i] ) ){
			element.removeClass(array[i]);
			break;  
		}
	}
}

function chanimator_draw_animation(li){
	list = li.closest('.list-els');
	list.find('.cur').removeClass('cur')
	option_type = list.attr('option_type');
	option_value = li.attr('option_value')
	option_desc = li.text();
	list_label = list.closest('.list-outer-wrap').find('.chanimator_list-label span');
	editing_element_scope = jQuery('#csshero-animator .editing_el input').val();
	editing_element = jQuery(editing_element_scope);
	editing_element_parent = editing_element.parent();
	
	chanimator_already_stored_element = chanimator_check_already_applied_animation(editing_element_scope)
	
	// ANIMATION CASE
	if (option_type == 'animation'){
			
		chanimator_clear_classes_from_array(editing_element,chanimator_effects_array);	
		
		if (chanimator_already_stored_element > -1){
			// ELEMENT ALREADY IN ARRAY
			if (chanimator_stored_animations[chanimator_already_stored_element].animation == option_value){
				// SECOND CLICK ON ALREADY APPLIED ANIMATION
				chanimator_clear_animation(editing_element_scope);
				//editing_element.removeClass('animated '+option_value);
				//editing_element_parent.removeClass('animatedParent');
				list_label.text('Not Set')
			} else {
				// CLICK ON A DIFFERENT ANIMATION 
				chanimator_stored_animations[chanimator_already_stored_element].animation = option_value
				editing_element.addClass('animated '+option_value);
				li.addClass('cur');
				list_label.text(option_desc)
			}
		} else {
			// CLICK ON NON-ANIMATED ELEMENT
			chanimator_update_state('s3')
			li.addClass('cur')
			list_label.text(option_desc)
			chanimator_stored_animations.push({
				item:editing_element_scope,
				animation:option_value
			});
		
			editing_element.addClass('animated '+option_value);
			editing_element_parent.addClass('animatedParent');
		}
	} else {
		chanimator_stored_object = chanimator_stored_animations[chanimator_already_stored_element];
		
		if (chanimator_stored_object[option_type] && chanimator_stored_object[option_type] == option_value){
			delete chanimator_stored_object[option_type];
			list_label.text('Not Set')
			
		} else {
			chanimator_stored_object[option_type] = option_value;
			li.addClass('cur')
			list_label.text(option_desc)
		}	
		
		// SE PARAMETRO SETTATO VADO AVANTI E APPLICO PROPRIETA AGLI OGGETTI
		
		// ANIMATE ONCE
		if (chanimator_stored_object[option_type] && option_type == 'run_once' && chanimator_stored_object[option_type] == 'yes'){
			editing_element_parent.addClass('animateOnce');
		} else {
			editing_element_parent.removeClass('animateOnce');
		}
		
		// OFFSET
		if (chanimator_stored_object[option_type] && option_type == 'offset' && chanimator_stored_object[option_type] != 'default'){
			editing_element_parent.attr('data-appear-top-offset',chanimator_stored_object[option_type]);
		} else {
			editing_element_parent.removeAttr('data-appear-top-offset');
		}
		
		// SPEED
		if (chanimator_stored_object[option_type] && option_type == 'speed' && chanimator_stored_object[option_type] != 'default'){
			
			chanimator_clear_classes_from_array(editing_element,speed_array);
			editing_element.addClass(chanimator_stored_object[option_type])
		} else {
			chanimator_clear_classes_from_array(editing_element,speed_array);
		}
	}
	console.log('now?s')
	jQuery(window).scroll();
}

function chanimator_render(combinations){
	render = jQuery('#csshero-animator .render ul');
	render.empty();
	render_name = '';
	jQuery(combinations).each(function(i,o){ //chanimator_stored_animations
		render_options = '';
		for(var key in o) {
			if (key == 'item') render_name = o[key];
			render_options += ('<li class="render-li render-li-'+key+'"><span class="render-k render-k-'+key+'">' +key+ '</span><span class="render-v render-v-'+key+'">'+ o[key]+'</span></li>');
		}
		render_options += '<li class="render-li-actions"><span class="e">Edit</span><span class="d">Delete</span></li>';
		render.append('<li class="render-item-li" render-item-name="'+render_name+'"><ul>'+render_options+'</ul></li>')
	})
}

function chanimator_retrieve_animation(scope){
	ele = chanimator_check_already_applied_animation(scope);
	ele = chanimator_stored_animations[ele];
	
	jQuery('.editing_el input').val(scope);
	
	chanimator_clear_states();
	if (ele){
		chanimator_update_state('s3')
	
		for(var key in ele) {
			list = jQuery('.list-els[option_type="'+key+'"]');
			
			cur = list.find('li[option_value="'+ele[key]+'"]');
			cur_desc = cur.text();
			cur.addClass('cur');
			list.closest('.list-outer-wrap').find('.chanimator_list-label span').text(cur_desc)
		}
	
	} else {	
		chanimator_update_state('s2')
	}
	
}

function chanimator_clear_states(){
	jQuery('#csshero-animator .cur').removeClass('cur');
	jQuery('#csshero-animator .act').removeClass('act');
	jQuery('#csshero-animator .chanimator_list-label span').text('Not Set');
}


//EFFECTS AND SPEEDS ARRAY INIT

chanimator_effects_array = ['bounceIn','bounceInDown','bounceInRight','bounceInUp','bounceInLeft','fadeInDownShort','fadeInUpShort','fadeInLeftShort','fadeInRightShort','fadeInDown','fadeInUp','fadeInLeft','fadeInRight','fadeIn','growIn','shake','shakeUp','rotateIn','rotateInUpLeft','rotateInDownLeft','rotateInUpRight','rotateInDownRight','rollIn','wiggle','swing','tada','wobble','pulse','lightSpeedInRight','lightSpeedInLeft','flip','flipInX','flipInY'];
chanimator_effects_array = chanimator_effects_array.sort();
 
speed_array = ['default','slow','slower','slowest'];

 


jQuery(document).on('click','.chanimator_list-label',function(){
	jQuery(this).closest('.list-outer-wrap').toggleClass('act')
});

///// CHOOSE ANIMATION TYPE
jQuery(document).on('click','#csshero-animator .list-els li',function(){
	li = jQuery(this);
	chanimator_draw_animation(li)
});

var editimer;
var similar_timer;

// ON MOUSEOVER editable elements
jQuery(document).on('mouseover',".csshero-animator-on-body .editable" ,  function(e){                  
	e.stopPropagation(); 
	jQuery('*[hovering_hero]').removeAttr('hovering_hero');
	edielement = jQuery(this);
	edielement.attr('hovering_hero','');
	
	editimer = setTimeout(function(){
		csshero_hover_elements_standalone(edielement);                                                                                                
	}, 100); 
	
	similar_timer = setTimeout(function(){
		csshero_hilight_similar_elements_standalone(edielement)                                                                                               
	}, 500); 
	
	                                              
}).on('mouseout',".editable",function(e){
	jQuery('.csshero-edi-ele-sec').remove();
	clearTimeout(editimer);
	clearTimeout(similar_timer);
});

jQuery(window).on('scroll',function(){
	jQuery('.csshero-edi-ele').remove();
})

jQuery(document).ready(function(){
	jQuery("#csshero-very-first-trigger").hide();
	if (chanimator_full_object){
		chanimator_stored_animations = JSON.parse(chanimator_full_object);
		chanimator_received_data = chanimator_full_object;
		chanimator_render(chanimator_stored_animations)
	} else {
		chanimator_received_data = 'nodata'
	}
	
	//Show the interface
	jQuery('#csshero-animator').show();
	
	jQuery('#csshero-animator-form-receiver').val(chanimator_received_data)
	
	jQuery('#csshero-animator').draggable({handle:'section.chanimator_logo'});
	
	
	jQuery('body').addClass('csshero-animator-on-body');
	have_we_launched = jQuery('.editable').length > 0;
	
	//INITIALIZE SAVING FORM
	chani_enable_ajax_form();
	// CHECK IF CONFIG HAS BEEN LOADED YET
	if (!have_we_launched) csshero_rocket_mode();
})

jQuery( '.csshero-animator-service-overlay,.list-els' ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;

    this.scrollTop += ( delta < 0 ? 1 : -1 ) * 10;
    e.preventDefault();
});


jQuery(document).on('click','#animator-toggle',function(){
	animator = jQuery('#csshero-animator');
	if (animator.hasClass('toggled')){
		animator.removeClass('toggled');
		chani_hide_overlay(10)
	} else {
		animator.addClass('toggled');
		chani_show_overlay('.render')
	}
})

jQuery(document).on('click','#csshero-animator .render .render-li-actions .e',function(){
	scope = jQuery(this).closest('ul').find('.render-v-item').text();
	chanimator_retrieve_animation(scope);
	jQuery('#csshero-animator').removeClass('toggled');
	chani_hide_overlay(10)
}).on('click','#csshero-animator .render .render-li-actions .d', function(){
	scope = jQuery(this).closest('ul').find('.render-v-item').text();
	
	item = jQuery(this).closest('.render-item-li');
	item.append('<div class="render-item-overlay"><div><p>Sure?</p><div class="chani-actions"><span class="chani-action chani-cancel">No</span><span class="chani-action chani-confirm" to_delete="'+scope+'">Yes</span></div></div></div>');

}).on('click','#csshero-animator .render .render-item-overlay .chani-confirm',function(){
	cleared_item = jQuery(this).attr('to_delete');
	chanimator_clear_animation(cleared_item);
	
	
}).on('click','#csshero-animator .render .render-item-overlay .chani-cancel',function(){
	jQuery(this).closest('.render-item-overlay').fadeOut(300,function(){
		jQuery(this).remove();
	})
})


jQuery(window).load(function(){
	jQuery(document).on('click','.csshero-animator-on-body .editable', function(e){
		e.preventDefault();
		e.stopPropagation();
		t = jQuery(this).attr('editableclass');
		jQuery('#csshero-animator').removeClass('toggled');
		chanimator_retrieve_animation(t);
	});

	// CHECKER FUNCTION
		
	jQuery(document).on('click','.list-els li',function(){
		chanimator_render(chanimator_stored_animations);
		chanimator_full_object = JSON.stringify(chanimator_stored_animations)
		jQuery('#csshero-animator-form-sender').val(chanimator_full_object)
	})
		
	
}); // END ON WINDOW LOAD

 


function chani_show_overlay(section){
	jQuery('#csshero-animator .csshero-animator-service-overlay section').hide()
	jQuery('#csshero-animator .csshero-animator-service-overlay').fadeIn(300,function(){
		if (section) jQuery('#csshero-animator .csshero-animator-service-overlay '+section).fadeIn(300)
	});
}

function chani_hide_overlay(delay){
	if (!delay) delay = 300;

	jQuery('#csshero-animator .csshero-animator-service-overlay').delay(delay).fadeOut(300,function(){
		jQuery('#csshero-animator .csshero-animator-service-overlay section').hide();
	});
	

}
//SAVING
function chani_enable_ajax_form(){
	// ANIMATIONS MAIN SAVING
	jQuery("#csshero-animator-form").attr("action",ajax_object.ajax_url).ajaxForm({
		data:{
			action:'chanimator_save_step'
		},
		target:  "#csshero-animator-form-feedback",
		beforeSerialize: function(formData, jqForm, options) {
			chani_show_overlay('.loader')
			jQuery("#csshero-animator-form-feedback").html("");  
		},
		success : function(responseText, statusText, xhr, $form) {
			//jQuery('#csshero-animator .csshero-animator-service-overlay').delay(400).fadeOut(300);
			chani_hide_overlay(900)
		}
	}); 
}

function chani_removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

jQuery(document).on('click','#csshero-animator-cancel,#close-animator',function(e){
	e.preventDefault();
	chani_show_overlay('.quit')
})

function chani_close_animator(){
	url = window.location.href;
	url = chani_removeParam('chanimator_action',url);
	url = chani_removeParam('rand',url);
	window.location.href = url;
}

jQuery(document).on('click','.quit .chani-confirm',function(){
	chani_close_animator()
}).on('click','.quit .chani-cancel',function(){
	chani_hide_overlay(10)
});