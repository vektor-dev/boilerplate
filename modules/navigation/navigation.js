(function($){
	var navigation = {
		el: null,
		hb_el: null,
		init: function(config) {
			this.el = $(config.el);
			this.hb_el = $(config.hb_el);
			this.el.add('.document__header').on('click', function(e) { e.stopPropagation(); });
			this.hb_el.on('click', $.proxy(function(e){ this.toggle(); e.stopPropagation(); }, this));
			$(document).on('click', $.proxy(function(){ this.close(); }, this));
			this.el.find('.has_children').children('a').on('click', function(e) {
				var selected = $(this);
				if( selected.next('ul').hasClass('is_hidden') ) {
					selected.addClass('selected').next('ul').removeClass('is_hidden').end().parent('.has_children').parent('ul').addClass('moves_out');
					selected.parent('.has_children').siblings('.has_children').children('ul').addClass('is_hidden').end().children('a').removeClass('selected');
				} else {
					selected.removeClass('selected').next('ul').addClass('is_hidden').end().parent('.has_children').parent('ul').removeClass('moves_out');
				}
				e.preventDefault();
			});
			this.el.find('.go_back').on('click', function(e){
				$(this).parent('ul').addClass('is_hidden').parent('.has_children').parent('ul').removeClass('moves_out');
				e.preventDefault();
			});
			return this;
		},
		destroy: function() {
			this.el.find('.go_back').off();
			this.el.find('.has_children').children('a').off();
			this.el.off();
			return this;
		},
		open: function() {
			this.el.removeClass('is_hidden');
			return this;
		},
		close: function() {
			this.el.find('.has_children ul').addClass('is_hidden');
			this.el.find('.has_children a').removeClass('selected');
			this.el.find('.moves_out').removeClass('moves_out');
			this.el.addClass('is_hidden');
			return this;
		},
		toggle: function() {
			if (this.el.hasClass('is_hidden')) {
				this.open();
			} else {
				this.close();
			}
			return this;
		}
	};

	navigation.init({
		el: '#document__navigation--main',
		hb_el: '#document__navigation__icon--main'
	});
})(jQuery);