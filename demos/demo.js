(function($){
	$('#basic').parallayers({
		'layer-1' : { x : -25, y : -5 },
		'layer-2' : { x : -5, y : -2 },
		'layer-3' : { x : 0, y : 0 },
		'layer-4' : { x : 15, y : 5 },
		'layer-5' : { x : 50, y : 10 }
	});
	
	$('#rotate3d').parallayers({
		'layer-1' : { x : -25, y : -5 },
		'layer-2' : { x : -5, y : -2 },
		'layer-3' : { x : 0, y : 0, rotateX: -10, rotateY: 10, perspective: 600 },
		'layer-4' : { x : 15, y : 5 },
		'layer-5' : { x : 50, y : 10 }
	});
	
	$('#div-relative').parallayers({
		'layer-1' : { x : -25, y : -5 },
		'layer-2' : { x : -5, y : -2 },
		'layer-3' : { x : 0, y : 0, rotateX: -10, rotateY: 10, perspective: 600 },
		'layer-4' : { x : 15, y : 5 },
		'layer-5' : { x : 50, y : 10 }
	}, {
		'relativeTo' : $('#div-relative')
	});
	
	var p = $('#manual').parallayers({
		'layer-1' : { x : -25, y : -5 },
		'layer-2' : { x : -5, y : -2 },
		'layer-3' : { x : 0, y : 0, rotateX: -10, rotateY: 10, perspective: 600 },
		'layer-4' : { x : 15, y : 5 },
		'layer-5' : { x : 50, y : 10 }
	}, {
		'enabled' : false
	});
	
	$('#button-enable').click(function() {
		p.enable();
		$('body').addClass('parallax-enabled');
	});
	
	$('#button-disable').click(function() {
		p.disable();
		$('body').removeClass('parallax-enabled');
	});
})(window.jQuery);