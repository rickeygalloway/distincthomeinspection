function csshero_hover_elements_standalone(element){
	jQuery('.csshero-edi-ele:not(.edi-ele-currently-selected)').remove();
	
	var t = element;
	frame = jQuery(window);
	frame_data = {};
	
	if (t.hasClass('animated')){
		is_animated_class = 'ch_is_animated';
	} else {
		is_animated_class = '';
	}
	
	frame_data = {
		_top	: 0,
		_left	: 0,
		_width : frame.outerWidth(),
		_height : frame.outerHeight(),
		_scroll : frame.scrollTop(),
	}
	
	var t_data = {};
	t_data = {
		_scope : t.attr('editableclass'),
		_suggestion : t.attr('editablesuggestion'),
		_width : t.outerWidth(),
		_height : t.outerHeight(),
		_top : t.offset().top,
		_left: t.offset().left,
		_padding_top : t.css('padding-top'),
		_padding_right : t.css('padding-right'),
		_padding_bottom : t.css('padding-bottom'),
		_padding_left : t.css('padding-left'),
		_margin_top : t.css('margin-top'),
		_margin_right : t.css('margin-right'),
		_margin_bottom : t.css('margin-bottom'),
		_margin_left : t.css('margin-left'),
	}
	
	element_top_position = t_data._top - frame_data._scroll;
	element_bottom_position = element_top_position + t_data._height;
	element_right_position = t_data._left + t_data._width -1; 
	
	var theres_no_canvas = jQuery('.frame-canvas-animator').length == 0;
	if (theres_no_canvas){
		jQuery('body').append('<div class="frame-canvas frame-canvas-animator" style="position:fixed;top:'+frame_data._top+';left:'+frame_data._left+';z-index:9999;overflow:visible;width:3px;height:3px;"></div>');
	}
	
	ediele_top = '<div class="csshero-edi-ele edi-ele-top '+is_animated_class+'" style="width:'+t_data._width+'px; top:'+element_top_position+'px;left:'+t_data._left+'px;"></div>';
	
	ediele_right = '<div class="csshero-edi-ele edi-ele-right '+is_animated_class+'" style="height:'+t_data._height+'px; top:'+element_top_position+'px;left:'+element_right_position+'px;"></div>';
	
	ediele_bottom = '<div class="csshero-edi-ele edi-ele-bottom '+is_animated_class+'" style="width:'+t_data._width+'px; top:'+element_bottom_position+'px;left:'+t_data._left+'px;"></div>';
	
	ediele_left = '<div class="csshero-edi-ele edi-ele-left '+is_animated_class+'" style="height:'+t_data._height+'px; top:'+element_top_position+'px;left:'+t_data._left+'px;"></div>';
	
	// THE LABELS
	if (t_data._top < 50) {
		var label_position = element_top_position + t_data._height;
	} else {
		var label_position = element_top_position - 20;
	}
	
	// SIMILAR ELS
	similar_els = jQuery(document).find("[editableclass='" + t_data._scope + "']").not(t);
	similar_els_number = similar_els.length;
	similar_els_number_including_this = similar_els_number +1;
	
	
	if (similar_els_number > 0){
		var label_num = '<span class="eclass enum">'+similar_els_number_including_this+' on this page</span>';
	} else {
		var label_num = '';
	}
	
	var label_contents = '<span class="eclass etext">'+t_data._suggestion+'</span>'+label_num;
	
	
	labels = '<div class="csshero-edi-ele csshero-edi-ele-label '+is_animated_class+'" style="top:'+label_position+'px; left:'+t_data._left+'px;">'+label_contents+'</div>';
	
	ediele = ediele_left + ediele_top + ediele_bottom + ediele_right + labels;
	
	jQuery(ediele).hide().appendTo('.frame-canvas-animator').fadeIn(400);
}        
        
function csshero_hilight_similar_elements_standalone(element){
	scope = element.attr('editableclass');
	overall_scroll = jQuery('body').scrollTop();
	
	similars = jQuery(document).find("[editableclass='" + scope + "']").not(element);
	similars.each(function(index,similar_item){
		similar_item = jQuery(similar_item);
		s_top = similar_item.offset().top - overall_scroll;
		s_left = similar_item.offset().left;
		s_width = similar_item.outerWidth();
		s_height = similar_item.outerHeight();
		s_contents = '<div style="position:absolute;top:'+s_top+'px;left:'+s_left+'px;width:'+s_width+'px;height:'+s_height+'px;" class="csshero-edi-ele csshero-edi-ele-sec"></div>';
		jQuery(s_contents).appendTo('.frame-canvas-animator');
	});
}