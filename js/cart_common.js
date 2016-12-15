if (typeof JSON !== "object") {
	JSON = {}
} (function() {
	var rx_one = /^[\],:{}\s]*$/;
	var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
	var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	function f(n) {
		return n < 10 ? "0" + n: n
	}
	function this_value() {
		return this.valueOf()
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
		};
		Boolean.prototype.toJSON = this_value;
		Number.prototype.toJSON = this_value;
		String.prototype.toJSON = this_value
	}
	var gap;
	var indent;
	var meta;
	var rep;
	function quote(string) {
		rx_escapable.lastIndex = 0;
		return rx_escapable.test(string) ? '"' + string.replace(rx_escapable,
		function(a) {
			var c = meta[a];
			return typeof c === "string" ? c: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
		}) + '"': '"' + string + '"'
	}
	function str(key, holder) {
		var i;
		var k;
		var v;
		var length;
		var mind = gap;
		var partial;
		var value = holder[key];
		if (value && typeof value === "object" && typeof value.toJSON === "function") {
			value = value.toJSON(key)
		}
		if (typeof rep === "function") {
			value = rep.call(holder, key, value)
		}
		switch (typeof value) {
		case "string":
			return quote(value);
		case "number":
			return isFinite(value) ? String(value) : "null";
		case "boolean":
		case "null":
			return String(value);
		case "object":
			if (!value) {
				return "null"
			}
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === "[object Array]") {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || "null"
				}
				v = partial.length === 0 ? "[]": gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]": "[" + partial.join(",") + "]";
				gap = mind;
				return v
			}
			if (rep && typeof rep === "object") {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === "string") {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": ": ":") + v)
						}
					}
				}
			} else {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": ": ":") + v)
						}
					}
				}
			}
			v = partial.length === 0 ? "{}": gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}": "{" + partial.join(",") + "}";
			gap = mind;
			return v
		}
	}
	if (typeof JSON.stringify !== "function") {
		meta = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		};
		JSON.stringify = function(value, replacer, space) {
			var i;
			gap = "";
			indent = "";
			if (typeof space === "number") {
				for (i = 0; i < space; i += 1) {
					indent += " "
				}
			} else {
				if (typeof space === "string") {
					indent = space
				}
			}
			rep = replacer;
			if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
				throw new Error("JSON.stringify")
			}
			return str("", {
				"": value
			})
		}
	}
	if (typeof JSON.parse !== "function") {
		JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k;
				var v;
				var value = holder[key];
				if (value && typeof value === "object") {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v
							} else {
								delete value[k]
							}
						}
					}
				}
				return reviver.call(holder, key, value)
			}
			text = String(text);
			rx_dangerous.lastIndex = 0;
			if (rx_dangerous.test(text)) {
				text = text.replace(rx_dangerous,
				function(a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice( - 4)
				})
			}
			if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
				j = eval("(" + text + ")");
				return (typeof reviver === "function") ? walk({
					"": j
				},
				"") : j
			}
			throw new SyntaxError("JSON.parse")
		}
	}
} ());
var getCookie = function(b) {
	var a = $.cookie(b);
	if (a == null || typeof(a) == "undefined" || a.length == 0) {
		return ""
	}
	return a
};
var cartDomain = "http://cart.1yyg.com";
var apiUrl = "http://api.1yyg.com";
var _UserID = getCookie("_uid") == "" ? 0 : parseInt(getCookie("_uid"));
var _CartDataKey = "_CartData_" + _UserID;
var getObject = function(a) {
	if (a == null || typeof(a) == "undefined" || a.length == 0) {
		return null
	}
	return a
};
var strToJson = function(a) {
	return JSON.parse(a)
};
var jsonToStr = function(a) {
	return JSON.stringify(a)
};
var _Ptn = /^\d+$/;
var $CartComm = function() {
	var g = null,
	k = null;
	this.addShopCart = function(v, t, u) {
		if (g != null) {
			console.log("add too fast！！");
			return
		}
		g = setTimeout(function() {
			g = null
		},
		200);
		var s = h( - 3, 0, "0.00");
		if (v < 1 || t < 1) {
			s = h( - 1, 0, "0.00");
			u(s)
		} else {
			var r = p(v);
			if (r != null) {
				r.num = r.num + parseInt(t) >= r.stock ? r.stock: r.num + parseInt(t);
				l(r, function(w) {
					if (w == 0) {
						var x = new $CartComm();
						x.getShopCartNum(function(y) {
							s = h(0, y.num, y.str + ".00");
							u(s);
							return false
						})
					} else {
						s = h(1, 0, "0.00");
						u(s);
						return false
					}
				})
			} else {
				i(v,
				function(y) {
					if (y != null) {
						var w = y.codeQuantity - y.codeSales;
						if (w > 0) {
							var A = y.codeType;
							var x = y.codeLimitBuy;
							var B = A == 3;
							var z = 0;
							if (B) {
								z = y.myLimitSales;
								if (z >= x) {
									s = h(3, 0, "0.00");
									u(s);
									return false
								}
							}
							if (B) {
								if (z + t >= x) {
									t = x - z >= w ? w: x - z
								}
							} else {
								if (t > w) {
									t = w
								}
							}
							q(y.codeID, w, t,
							function(C) {
								if (C == 0) {
									var D = new $CartComm();
									D.getShopCartNum(function(E) {
										s = h(0, E.num, E.str + ".00");
										u(s);
										return false
									})
								} else {
									if (C == 2) {
										s = h(2, 0, "0.00");
										u(s);
										return false
									} else {
										s = h( - 1, 0, "0.00");
										u(s);
										return false
									}
								}
							})
						} else {
							if (y.goodsID > 0) {
								b(y.goodsID,
								function(C) {
									if (C != null) {
										s = h(1, 1, C);
										u(s);
										return false
									} else {
										s = h(1, 0, "0.00");
										u(s);
										return false
									}
								})
							} else {
								s = h(1, 0, "0.00");
								u(s);
								return false
							}
						}
					} else {
						s = h( - 1, 0, "0.00");
						u(s);
						return false
					}
				})
			}
		}
	};
	this.delShopCart = function(A, x) {
		var z = h( - 3);
		var w = A.split(",");
		if (w.length > 0) {
			var B = f();
			if (B != null) {
				var y = "";
				var s = 0,
				v = 0;
				if (B.data.length > 0) {
					for (var t = 0; t < B.data.length; t++) {
						var r = B.data[t];
						if ($.inArray(r.codeID.toString(), w) > -1) {
							continue
						}
						var u = a(r.codeID, r.stock, r.num);
						if (u != "") {
							s += 1;
							v += parseInt(r.num);
							y += u + "|"
						}
					}
					if (y != "" && y.substr(y.length - 1, 1) == "|") {
						y = y.substring(0, y.length - 1)
					}
				}
				n(m(s, v, y));
				z = h(0, s, v);
				x(z);
				return false
			}
		}
		x(z)
	};
	this.updateShopCart = function(v, t, u) {
		if (k != null) {
			console.log("update too fast！");
			return
		}
		k = setTimeout(function() {
			k = null
		},
		100);
		var s = h( - 3);
		var r = p(v);
		if (r != null) {
			r.num = parseInt(t) >= r.stock ? r.stock: parseInt(t);
			l(r,
			function(w) {
				s = h(w);
				u(s)
			})
		} else {
			u(s)
		}
	};
	this.getShopCart = function(s) {
		var r = f();
		if (r != null) {
			o(function(t) {
				s(t)
			})
		} else {
			s(1)
		}
	};
	this.getShopCartNum = function(s) {
		var u = 0,
		t = 0;
		var r = f();
		if (r != null) {
			u = r.count;
			t = r.money
		}
		_Result = h(0, u, t);
		s(_Result)
	};
	this.setSelValue = function(t, r, s) {
		j();
		$.cookie("_CartDataSel", t + "|" + r, {
			domain: "1yyg.com",
			path: "/",
			expires: 1
		});
		if (s) {
			s()
		}
	};
	var h = function(t, s, u) {
		var r = '{"code":-3}';
		if (arguments.length == 1) {
			r = '{"code":' + t + "}"
		} else {
			if (arguments.length == 2) {
				r = '{"code":' + t + ',"num":' + s + "}"
			} else {
				if (arguments.length == 3) {
					r = '{"code":' + t + ',"num":' + s + ',"str":"' + u + '"}'
				}
			}
		}
		return strToJson(r)
	};
	var i = function(s, r) {
		GetJPData(cartDomain, "getBarcodeInfoByID", "codeID=" + s,
		function(t) {
			if (t.code == 0) {
				var u = t.listItems;
				if (u.length > 0) {
					r(u[0])
				} else {
					r(null)
				}
			} else {
				r(null)
			}
		})
	};
	var o = function(x) {
		var u = h( - 3);
		var r = f();
		if (r != null) {
			var w = "",
			t = "";
			for (var v = 0; v < r.data.length; v++) {
				var s = r.data[v];
				w += s.codeID + ",";
				t += s.num + ","
			}
			if (w != "" && w.substr(w.length - 1, 1) == ",") {
				w = w.substring(0, w.length - 1)
			}
			if (t != "" && t.substr(t.length - 1, 1) == ",") {
				t = t.substring(0, t.length - 1)
			}
			if (w != "" && t != "") {
				$cartFun = new $CartComm();
				$cartFun.setSelValue(w, t,
				function() {
					GetJPData(cartDomain, "cartlabel", "",
					function(y) {
						if (y.code == 0) {
							var z = y.unvalid;
							if (z != "") {
								$cartFun = new $CartComm();
								$cartFun.delShopCart(z,
								function(A) {})
							}
							n(c(y.listCart, y.listUpdate, y.listOutDate))
						}
						x(y);
						return false
					})
				})
			} else {
				x(u)
			}
		} else {
			x(u)
		}
	};
	var b = function(r, s) {
		GetJPData(cartDomain, "getGoodsSalingByGoodsID", "goodsID=" + r,
		function(t) {
			if (t.code == 0) {
				s(t.NewCodeInfo)
			} else {
				s(null)
			}
		})
	};
	var q = function(t, A, v, y) {
		var B = f();
		if (B != null) {
			var s = 0,
			x = 0;
			s += 1;
			x += parseInt(v);
			var z = a(t, A, v);
			for (var u = 0; u < B.data.length; u++) {
				var r = B.data[u];
				if (parseInt(r.codeID) == parseInt(t)) {
					continue
				}
				var w = a(r.codeID, r.stock, r.num);
				if (w != "") {
					s += 1;
					x += parseInt(r.num);
					z = z + "|" + w
				}
			}
			if (z != "" && z.substr(z.length - 1, 1) == "|") {
				z = z.substring(0, z.length - 1)
			}
			if (s < 100) {
				n(m(s, x, z));
				if (y) {
					y(0)
				}
				return false
			} else {
				if (y) {
					y(2)
				}
				return false
			}
		} else {
			n(m(1, v, a(t, A, v)));
			if (y) {
				y(0)
			}
			return false
		}
		if (y) {
			y(1)
		}
	};
	var l = function(s, v) {
		if (getObject(s) != null) {
			var r = f();
			if (r != null) {
				for (var u = 0; u < r.data.length; u++) {
					var t = r.data[u];
					if (parseInt(t.codeID) == parseInt(s.codeID)) {
						t.num = _Ptn.test(s.num) ? s.num: 1;
						break
					}
				}
				n(d(r.data));
				if (v) {
					v(0);
					return false
				}
			}
		}
		if (v) {
			v(1)
		}
	};
	var p = function(v) {
		var s = null;
		var r = f();
		if (r != null) {
			for (var u = 0; u < r.data.length; u++) {
				var t = r.data[u];
				if (parseInt(t.codeID) == parseInt(v)) {
					s = t;
					break
				}
			}
		}
		return s
	};
	var n = function(r) {
		$.cookie(_CartDataKey, r, {
			domain: "1yyg.com",
			path: "/",
			expires: 7
		})
	};
	var f = function() {
		var r = null;
		var s = getCookie(_CartDataKey);
		if (s.length > 0) {
			r = e(s)
		}
		return r
	};
	var a = function(t, u, r) {
		var s = "";
		r = _Ptn.test(r) ? r: 1;
		if (_Ptn.test(t) && _Ptn.test(u)) {
			s = t + "," + u + "," + r
		}
		return s
	};
	var m = function(t, r, u) {
		var s = "";
		if (_Ptn.test(t) && _Ptn.test(r) && u != "") {
			s = t + "|" + r + "|" + u
		}
		return s
	};
	var e = function(u) {
		var s = null;
		if (u.length > 0) {
			var y = 0,
			x = 0;
			var w = "";
			var r = u.split("|");
			for (var v = 0; v < r.length; v++) {
				if (v == 0) {
					y = r[v]
				} else {
					if (v == 1) {
						x = r[v]
					} else {
						var t = r[v].split(",");
						if (t.length == 3) {
							if (_Ptn.test(t[0]) && _Ptn.test(t[1]) && _Ptn.test(t[2])) {
								w += '{"codeID":' + t[0] + ',"stock":' + t[1] + ',"num":' + t[2] + "},"
							}
						}
					}
				}
			}
			if (w != "" && w.substr(w.length - 1, 1) == ",") {
				w = w.substring(0, w.length - 1)
			}
			if (_Ptn.test(y) && _Ptn.test(x) && w != "") {
				s = strToJson('{"count":' + y + ',"money":' + x + ',"data":[' + w + "]}")
			}
		}
		return s
	};
	var c = function(x, z, s) {
		var y = "";
		var r = 0,
		w = 0;
		if (x.length > 0) {
			for (var u = 0; u < x.length; u++) {
				var t = x[u];
				var v = a(t.codeID, t.codeQuantity - t.codeSales, t.shopNum);
				if (v != "") {
					r += 1;
					w += parseInt(t.shopNum);
					y += v + "|"
				}
			}
		}
		if (z.length > 0) {
			for (var u = 0; u < z.length; u++) {
				var t = z[u];
				var v = a(t.codeID, t.codeQuantity - t.codeSales, t.shopNum);
				if (v != "") {
					r += 1;
					w += parseInt(t.shopNum);
					y += v + "|"
				}
			}
		}
		if (s.length > 0) {
			for (var u = 0; u < s.length; u++) {
				var t = s[u];
				var v = a(t.codeID, t.codeQuantity - t.codeSales, t.shopNum);
				if (v != "") {
					r += 1;
					y += v + "|"
				}
			}
		}
		if (y != "" && y.substr(y.length - 1, 1) == "|") {
			y = y.substring(0, y.length - 1)
		}
		return m(r, w, y)
	};
	var d = function(w) {
		var t = "";
		var v = 0,
		u = 0;
		if (w.length > 0) {
			for (var s = 0; s < w.length; s++) {
				var r = w[s];
				var x = a(r.codeID, r.stock, r.num);
				if (x != "") {
					v += 1;
					u += parseInt(r.num);
					t += x + "|"
				}
			}
		}
		if (t != "" && t.substr(t.length - 1, 1) == "|") {
			t = t.substring(0, t.length - 1)
		}
		return m(v, u, t)
	};
	var j = function() {
		if (_UserID > 0) {
			var r = getCookie("_CartData_0");
			if (r.length > 0) {
				$.cookie("_CartData_0", null, {
					domain: "1yyg.com",
					path: "/",
					expires: 7
				});
				$.cookie(_CartDataKey, r, {
					domain: "1yyg.com",
					path: "/",
					expires: 7
				})
			}
		}
	};
	j()
};