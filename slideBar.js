$.fn.extend({
	slideBar:function(opt) {
		//
		// opt:{
		// 		BGColor: the color of bottom bar
		//		color: the color of active bar
		//		pointCss: the point's css
		//		width: the bar width(or get from the other css file)
		//		change: when slide the bar will active this function
		//		done: after user mouseup will active this function
		// }
		//

		opt = opt || {};
		var t = this;
		var color = opt.color || "#090";
		var BGColor = opt.BGColor || "#999";
		if(t.children("shelSlide").length < 1) {
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
		p.css({"top": -(p.height() - t.height()) / 2 * 3, "left": -p.width() / 2});

		var tw = t.width() - p.width();

		t.css("background-color", BGColor);
		t.on("mousedown", ".shelSlidePoint", function(e) {
			$("body").on("mousemove", pointMove)
				.on("mouseup", mouseUp);
		});

		function pointMove(e) {
			var pos = e.pageX - t.offset().left - p.width() / 2;
			pos = Middle(0, pos, tw);
			p.css("left", pos);
			var val = pos / tw * 100;
			t.attr("data-slide", val);
			// t.css("background-image", "linear-gradient(to right, " + color + " " + val + "%, " + BGColor + " " + val + "%)");
			b.width(pos + p.width() / 2);
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
