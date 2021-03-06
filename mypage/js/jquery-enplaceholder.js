(function(a) {
	a.fn.extend({
		placeholder: function(b) {
			b = a.extend({
				placeholderColor: "#ACA899",
				isUseSpan: false,
				onInput: true
			},
			b);
			a(this).each(function() {
				var h = this;
				var e = "placeholder" in document.createElement("input");
				if (!e) {
					var c = a(h).attr("placeholder");
					var f = a(h).css("color");
					if (b.isUseSpan == false) {
						a(h).focus(function() {
							var i = new RegExp("^" + c + "$|^$");
							i.test(a(h).val()) && a(h).val("").css("color", f)
						}).blur(function() {
							if (a(h).val() == c) {
								a(h).css("color", f)
							} else {
								if (a(h).val().length == 0) {
									a(h).val(c).css("color", b.placeholderColor)
								}
							}
						}).trigger("blur")
					} else {
						var d = a('<span class="wrap-placeholder" style="position:absolute; display:inline-block; overflow:hidden; color:' + b.placeholderColor + "; width:" + a(h).outerWidth() + "px; height:" + a(h).outerHeight() + 'px;">' + c + "</span>");
						d.css({
							"margin-left": a(h).css("margin-left"),
							"margin-top": a(h).css("margin-top"),
							"font-size": a(h).css("font-size"),
							"font-family": a(h).css("font-family"),
							"font-weight": a(h).css("font-weight"),
							"padding-left": parseInt(a(h).css("padding-left")) + 2 + "px",
							"line-height": h.nodeName.toLowerCase() == "textarea" ? a(h).css("line-weight") : a(h).outerHeight() + "px",
							"padding-top": h.nodeName.toLowerCase() == "textarea" ? parseInt(a(h).css("padding-top")) + 2 : 0
						});
						a(h).before(d.click(function() {
							a(h).trigger("focus")
						}));
						a(h).val().length != 0 && d.hide();
						if (b.onInput) {
							var g = typeof(h.oninput) == "object" ? "input": "propertychange";
							a(h).bind(g,
							function() {
								d[0].style.display = a(h).val().length != 0 ? "none": "inline-block"
							})
						} else {
							a(h).focus(function() {
								d.hide()
							}).blur(function() { / ^$ / .test(a(h).val()) && d.show()
							})
						}
					}
				}
			});
			return this
		}
	})
})(jQuery);