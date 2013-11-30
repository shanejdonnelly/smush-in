/*
* Smush In - jQuery plugin 
*
* Copyright (c) 2013 Shane Donnelly
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
* http://shanejdonnelly.github.io/smush-in
* Version:  1.0
*
*/
;(function ($) {

    "use strict"; 


    /* CLASS DEFINITION
    * ====================== */

    var SmushIn = function ($element, options) {
        this.settings = options;
        this.$el = $element;
        this.setup();
    }

    SmushIn.prototype = {

        constructor: SmushIn,

        setup: function(){
            this.height = this.$el.height();
            this.width = this.$el.width();
            this.left = parseInt(this.$el.css('left'));
            this.top = parseInt(this.$el.css('top'));
            this.font_size = parseInt(this.$el.css('font-size'));
            this.window_width = $(window).width();
            this.window_height = $(window).height();
            this.max_anim_speed = (this.settings.speed === 'slow') ? 130 : 75;          

            if(this.settings.overshot === 0){ this.settings.overshot = this.rand(10,70) }

            //decide direction
            if(this.settings.from_direction === 'random') {
                var random_direction = (this.rand(0,20) < 10) ? 'left' : 'right';
                this.horzAnim(random_direction);
            }
            else{
                this.horzAnim(this.settings.from_direction);
            }      
        },  

        horzAnim: function(from_direction){
            var 
            base = this,
            start_position = (from_direction === 'right') ? ( base.rand((base.window_width * 1.1), (base.window_width * 2)) ) : ( start_position = -1 * base.rand((base.window_width * 1.1), (base.window_width * 2)) ), 
            fly_to = (from_direction === 'right') ? (base.left - base.settings.overshot) : (base.left + base.settings.overshot);

            //set start position
            base.$el.css('left', start_position );

            setTimeout(function(){

                //fly in
                base.$el.show().animate({'left': fly_to}, base.rand(200,500 ), function(){

                    //hit the 'wall'
                    base.$el.animate(
                        {
                        'height': (base.height * base.rand(1,2)), 
                        'width': base.width * base.rand(.3, .7), 
                        'margin-top': -(base.height * base.rand(.2,.4))
                    }, base.max_anim_speed, function(){

                        //bounce back
                        base.$el.animate(
                            { 
                            'height': base.height, 
                            'width': base.width, 
                            'margin-top':0, 
                            'left':base.left
                        }, ( base.max_anim_speed * 1.75));
                    });
                });
            }, base.rand(500,1500));      
        },

        //returns float
        rand: function(min, max){
            return Math.random() * (max - min) + min;
        }

    }


    /* PLUGIN DEFINITION
    * ======================= */

    $.fn.smushIn = function (custom_options) {
        return this.each(function () {
            var 
            $el = $(this),
            options = $.extend({}, $.fn.smushIn.defaults, custom_options);
            new SmushIn($el, options)
        })
    }

    $.fn.smushIn.defaults = {
        'overshot'        : 0,
        'speed'           : 'slow',
        'from_direction'  : 'left'      
    }

    $.fn.smushIn.Constructor = SmushIn


})(window.jQuery);
