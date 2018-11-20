odoo.define('theme_laze.front_js',function(require){
	'use strict';
  var sAnimation = require('website.content.snippets.animation');
  
  function initialize_owl(el){
   el.owlCarousel({
    items: 4,
            margin: 30,
            navigation: true,
            pagination: false,
            responsive: {
                0: {
                    items: 1,
                },
                481: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                1024: {
                    items: 4,
                }
            }

   })
  }
  function destory_owl(el){
    if(el && el.data('owlCarousel'))
   {
    el.data('owlCarousel').destroy();
    el.find('.owl-stage-outer').children().unwrap();
    el.removeData();
    }
  }
  sAnimation.registry.advance_product_slider = sAnimation.Class.extend({
    selector : ".tqt_products_slider",
        start: function () {
            var self = this;
            //self.$target.empty();
			if (self.editableMode)
            {//$('.tqt_products_slider .advance_product_slider').addClass("hidden");
	                self.$target.empty().append('<div class="container"><div class="advance_product_slider"><div class="col-md-12"><div class="seaction-head"><h1>Product Slider</h1> </div></div></div></div>');
		}
			if(!this.editableMode){
			var	tab_collection=parseInt(self.$target.attr('data-tab-id') || 0),
				slider_id='tqt_products_slider'+new Date().getTime();

            $.get("/shop/get_products_content",{'tab_id':self.$target.attr('data-tab-id') || 0,
												'slider_id':slider_id,

            									}).then(function( data ) {
                if(data){                   
                    self.$target.empty().append(data);
					$(".tqt_products_slider").removeClass('hidden');
					initialize_owl($(".tqt-pro-slide"));
    				
                }
            });
			}
        }
    });

    sAnimation.registry.product_brand_slider = sAnimation.Class.extend({
        selector: ".tqt_product_brand_slider",
        start: function(editable_mode) {
            var self = this;
            //self.$target.empty();
            if (self.editableMode) {
               //$('.tqt_product_brand_slider .owl-carousel').empty();
self.$target.empty().append('<div class="container"><div class="shopper_brand_slider"><div class="col-md-12"><div class="seaction-head"><h1>Brand Slider</h1> </div></div></div></div>');
}
            if (!self.editableMode) {
                $.get("/shop/get_product_brand_slider", {
                    'label': self.$target.attr('data-brand-label') || '',
                    'brand-count': self.$target.attr('data-brand-count') || 0,
                }).then(function(data) {
                    if (data) {
                    self.$target.empty().append(data);
					$(".tqt_product_brand_slider").removeClass('hidden');
					$.getScript("/theme_laze/static/src/js/owl.carousel.min.js");		
					$.getScript("/theme_laze/static/src/js/website.brand.js");												
					}
				});
			}
}
	});
});

