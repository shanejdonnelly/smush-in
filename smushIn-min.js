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
;(function(e){"use strict";var t=function(e,t){this.settings=t;this.$el=e;this.setup()};t.prototype={constructor:t,setup:function(){this.height=this.$el.height();this.width=this.$el.width();this.left=parseInt(this.$el.css("left"));this.top=parseInt(this.$el.css("top"));this.font_size=parseInt(this.$el.css("font-size"));this.window_width=e(window).width();this.window_height=e(window).height();this.max_anim_speed=this.settings.speed==="slow"?130:75;if(this.settings.overshot===0){this.settings.overshot=this.rand(10,70)}if(this.settings.from_direction==="random"){var t=this.rand(0,20)<10?"left":"right";this.horzAnim(t)}else{this.horzAnim(this.settings.from_direction)}},horzAnim:function(e){var t=this,n=e==="right"?t.rand(t.window_width*1.1,t.window_width*2):n=-1*t.rand(t.window_width*1.1,t.window_width*2),r=e==="right"?t.left-t.settings.overshot:t.left+t.settings.overshot;t.$el.css("left",n);setTimeout(function(){t.$el.show().animate({left:r},t.rand(200,500),function(){t.$el.animate({height:t.height*t.rand(1,2),width:t.width*t.rand(.3,.7),"margin-top":-(t.height*t.rand(.2,.4))},t.max_anim_speed,function(){t.$el.animate({height:t.height,width:t.width,"margin-top":0,left:t.left},t.max_anim_speed*1.75)})})},t.rand(500,1500))},rand:function(e,t){return Math.random()*(t-e)+e}};e.fn.smushIn=function(n){return this.each(function(){var r=e(this),i=e.extend({},e.fn.smushIn.defaults,n);new t(r,i)})};e.fn.smushIn.defaults={overshot:0,speed:"slow",from_direction:"left"};e.fn.smushIn.Constructor=t})(window.jQuery)
