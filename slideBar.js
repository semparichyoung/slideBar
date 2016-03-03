$.fn.extend({
	slideBar:function(opt) {
		//
		// opt:{
		// 		BGColor: the color of bottom bar
		//		color: the color of active bar
		//		pointCss: the point's css
		//		width: the bar width(or get from the other css file)
		//		start: the value of begining
		//		change: when slide the bar will active this function
		//		done: after user mouseup will active this function
		//		disable: true or false
		// }
		//

		opt = opt || {};
		var t = this.addClass("shelSlideBar");
		var color = opt.color || "#090";
		if(t.children(".shelSlide").length < 1) {
			t.append("<div class='shelSlide'></div>")
		}	
		if(t.children(".shelSlidePoint").length < 1) {
			t.append("<div class='shelSlidePoint'></div>");
		}
		if(typeof opt.width != "undefined") t.width(opt.width);
		var p = t.children(".shelSlidePoint").eq(0);
		var b = t.children(".shelSlide").eq(0);
		if(typeof opt.pointCss != "undefined"){
			p.css(opt.pointCss);
		}
		p.css({"left": -p.width() / 2});

		var tw = t.width() - p.width();

		if(typeof opt.BGColor != "undefined") {
			t.css("background-color", opt.BGColor);
		}
		// console.log(opt);
		if(opt.disable) {
			t.css("opacity", "0.5");
			p.css("display", "none");
			b.css("display", "none");
			return t;
		}else {
			t.css("opacity", "");
			p.css("display", "");
			b.css("display", "");
		}
		t.on("mousedown", ".shelSlidePoint", function(e) {
			$("body").on("mousemove", pointMove)
				.on("mouseup", mouseUp);
		});

		if(typeof opt.start != "undefeined") {
			var start = Middle(0, opt.start, 100);
			p.css("left", start + "%");
			t.attr("data-slide", start);
			b.width(start + "%");
		}

		return t;

		function pointMove(e) {
			var pos = e.pageX - t.offset().left - p.width() / 2;
			pos = Middle(0, pos, tw);
			var val = pos / tw * 100;
			p.css("left", val + "%");
			t.attr("data-slide", val);
			// t.css("background-image", "linear-gradient(to right, " + color + " " + val + "%, " + BGColor + " " + val + "%)");
			b.width(val + "%");
			if(typeof opt.change == "function") {
				opt.change(val);
			}
		}
		function mouseUp(e) {
			$("body").off("mousemove", pointMove)
				.off("mouseup", mouseUp);
			if(typeof opt.done == "function") {
				opt.done();
			}
		}
		function Middle(min, t, max) {
			return t < min ? min : t > max ? max : t;
		}
	},
});
