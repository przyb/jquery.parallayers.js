/*!
 * parallayers.js v.01 by Jakub Przyborowski, http://www.przyborowski.info/
 * http://github.com/przyb/jquery.parallayers.js
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function(w, $, undefined) {
	var P = function(relativeTo) {
		this._w = $(w);
		
		if (relativeTo === undefined) {
			relativeTo = this._w;
			$('html').mousemove($.proxy(this._onMouseMove, this));
		} else {
			relativeTo = $(relativeTo);
			relativeTo.mousemove($.proxy(this._onMouseMove, this));
		}
		
		this._containerWidth 	= parseInt(relativeTo.width());
		this._containerHeight	= parseInt(relativeTo.height());
		this._parallaxPosX		= 0;
		this._parallaxPosY		= 0;
		this._isEnabled 		= false;
		this._layers 			= [];
		
		this._w.resize($.proxy(this._onResize, this));
	};
	
	P.prototype.addLayer = function(layer, options) {
		if (options === undefined) {
			options = {};
		}
		this._layers.push({
			layer	: layer,
			options	: {
				x			: (options.x !== undefined) 			? options.x 			: 0,
				y			: (options.y !== undefined) 			? options.y 			: 0,
				perspective	: (options.perspective !== undefined) 	? options.perspective 	: 0,
				rotateX		: (options.rotateX !== undefined) 		? options.rotateX 		: 0,
				rotateY		: (options.rotateY !== undefined) 		? options.rotateY 		: 0,
				rotateZ		: (options.rotateZ !== undefined) 		? options.rotateZ 		: 0
			}
		});
		
		return this;
	};
	
	P.prototype.getLayerOptions = function(layer) {
		var layerObj = this._findLayer(layer);
		if (layerObj) {
			return layerObj.options;
		}
		return null;
	},
	
	P.prototype.setLayerOption = function(layer, optionName, optionValue) {
		var layerObj = this._findLayer(layer);
		if (layerObj && layerObj.options[optionName] !== undefined) {
			layerObj[optionName] = optionValue;
		}
		return this;
	},
	
	P.prototype.setLayerOptions = function(layer, options) {
		var layerObj = this._findLayer(layer);
		if (layerObj) {
			for (var i in options) {
				 if (layerObj.options[i] !== undefined) {
					layerObj.options[i] = options[i];
				}
			}
		}
		return this;
	},

	P.prototype.enable = function() {
		this._isEnabled = true;
		return this;
	};

	P.prototype.disable = function() {
		this._isEnabled = false;
		return this;
	};
	
	P.prototype._findLayer = function(layer) {
		if (parseInt(layer) == layer) {
			if (this._layers[layer] !== undefined) {
				return this._layers[layer];
			}
			
			return null;
		}
		
		if (typeof(layer) == 'string') {
			for (var i in this._layers) {
				if (this._layers[i].layer.hasClass(layer)) {
					return this._layers[i];
				}
			}
		}
		else {
			for (var i in this._layers) {
				if (this._layers[i].layer === layer) {
					return this._layers[i];
				}
			}
		}
		
		return null;
	};

	P.prototype._onMouseMove = function(e) {
		if (this._isEnabled) {
			if (e.pageX>=0 && e.pageX<=this._containerWidth && e.pageX>=0 && e.pageY<=this._containerHeight) {
				this._parallaxPosX = (2*e.pageX/this._containerWidth)-1;
				this._parallaxPosY = (2*e.pageY/this._containerHeight)-1;
				var i;
				for (i in this._layers) {
					this._layers[i].layer.css({
						'left'			: Math.round(this._layers[i].options.x*this._parallaxPosX),
						'top'			: Math.round(this._layers[i].options.y*this._parallaxPosY),
						'perspective'	: this._layers[i].options.perspective,
						'rotateX'		: (this._layers[i].options.rotateX*this._parallaxPosY)+'deg',
						'rotateY'		: (this._layers[i].options.rotateY*this._parallaxPosX)+'deg',
						'rotate'		: (this._layers[i].options.rotateZ*this._parallaxPosX)+'deg'
					});
				}
			}
		}
	},

	P.prototype._onResize = function(e) {
		this._containerWidth = parseInt(this._w.width());
		this._containerHeight = parseInt(this._w.height());
	};
	
	w.Parallayers = P
	$.fn.parallayers = function(layerOptions, options) {
		if (options === undefined) {
			options = {};
		}
		
		var self 	= $(this),
			p 		= new P(options.relativeTo),
			layer, i;
			
		if (self.length) {
			self.find('.layer').each(function() {
				layer = $(this);
				p.addLayer(layer);
			});

			if (layerOptions !== undefined) {
				for (i in layerOptions) {
					p.setLayerOptions(i, layerOptions[i]);
				}
			}

			if (options.enabled === undefined || options.enabled == true) {
				p.enable();
			}
			
			return p;
		}
		
		return null;
	};
})(window, window.jQuery);