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
var cartDomain = "http://cart.1yyg.com";
var apiUrl = "http://api.1yyg.com";
var _UserID = getCookie("_uid") == "" ? 0 : parseInt(getCookie("_uid"));
var _CartDataKey = "_CartData_" + _UserID;
var getObject = function(val) {
	if (val == null || typeof(val) == "undefined" || val.length == 0) {
		return null;
	}
	return val;
};

var strToJson = function(a) {
	return JSON.parse(a)
};
var jsonToStr = function(a) {
	return JSON.stringify(a)
};
//匹配是否数字
var _Ptn = /^\d+$/;

var $CartComm = function() {
	var addShopCartTimeOut = null, updateShopCartTimeOut = null;
	/**
	 * 添加购物车
	 * codeId:商品code编号
	 * residueLimitNum:剩余限制的商品数量
	 * 
	 */
	this.addShopCart = function(codeId, residueLimitNum, fun) {
		if (addShopCartTimeOut != null) {
			console.log("add too fast！！");
			return
		}
		addShopCartTimeOut = setTimeout(function() {
			addShopCartTimeOut = null
		}, 200);
		var handlerBackResult = handlerBackResult( - 3, 0, "0.00");
		if (codeId < 1 || residueLimitNum < 1) {
			handlerBackResult = handlerBackResult( - 1, 0, "0.00");
			fun(handlerBackResult)
		} else {
			//查询cookie里是否存在相关商品
			var cookieGood = isExsistGood(codeId);
			if (cookieGood != null) {
				cookieGood.num = cookieGood.num + parseInt(residueLimitNum) >= r.stock ? r.stock: r.num + parseInt(residueLimitNum);
				storeCookie(cookieGood, function(w) {
					if (w == 0) {
						var cartComm = new $CartComm();
						cartComm.getShopCartNum(function(y) {
							handlerBackResult = handlerBackResult(0, y.num, y.str + ".00");
							fun(handlerBackResult);
							return false
						})
					} else {
						handlerBackResult = handlerBackResult(1, 0, "0.00");
						fun(handlerBackResult);
						return false
					}
				})
			} else {
				getGoodByCodeId(codeId, function(y) {
					if (y != null) {
						var residueNum = y.codeQuantity - y.codeSales;
						if (residueNum > 0) {
							var codeType = y.codeType;
							var codeLimitBuy = y.codeLimitBuy;
							var isCodeType = codeType == 3;
							var mylimitSale = 0;
							if (isCodeType) {
								mylimitSale = y.myLimitSales;
								if (mylimitSale >= codeLimitBuy) {
									handlerBackResult = handlerBackResult(3, 0, "0.00");
									fun(handlerBackResult);
									return false
								}
							}
							if (isCodeType) {
								if (mylimitSale + residueLimitNum >= codeLimitBuy) {
									residueLimitNum = codeLimitBuy - mylimitSale >= w ? w: codeLimitBuy - mylimitSale;
								}
							} else {
								if (residueLimitNum > w) {
									residueLimitNum = w
								}
							}
							handlerQueryResult(y.codeID, w, residueLimitNum, function(C) {
								if (C == 0) {
									var cartComm = new $CartComm();
									cartComm.getShopCartNum(function(E) {
										handlerBackResult = handlerBackResult(0, E.num, E.str + ".00");
										fun(handlerBackResult);
										return false
									})
								} else {
									if (C == 2) {
										handlerBackResult = handlerBackResult(2, 0, "0.00");
										fun(handlerBackResult);
										return false
									} else {
										handlerBackResult = handlerBackResult( - 1, 0, "0.00");
										fun(handlerBackResult);
										return false
									}
								}
							})
						} else {
							if (y.goodsID > 0) {
								getGoodsByGoodsId(y.goodsID, function(C) {
									if (C != null) {
										handlerBackResult = handlerBackResult(1, 1, C);
										fun(handlerBackResult);
										return false
									} else {
										handlerBackResult = handlerBackResult(1, 0, "0.00");
										fun(handlerBackResult);
										return false;
									}
								})
							} else {
								handlerBackResult = handlerBackResult(1, 0, "0.00");
								fun(handlerBackResult);
								return false;
							}
						}
					} else {
						handlerBackResult = handlerBackResult( - 1, 0, "0.00");
						fun(handlerBackResult);
						return false;
					}
				})
			}
		}
	};
	this.delShopCart = function(A, fun) {
		var backResultStr = handlerBackResult( - 3);
		var arrData = A.split(",");
		if (arrData.length > 0) {
			var cookieVal = getCookieValFun();
			if (cookieVal != null) {
				var str = "";
				var s = 0, num = 0;
				if (cookieVal.data.length > 0) {
					for (var t = 0; t < cookieVal.data.length; t++) {
						var data = cookieVal.data[t];
						if ($.inArray(data.codeID.toString(), w) > -1) {
							continue
						}
						var packageGoodStr = packageGoodObj(data.codeID, data.stock, data.num);
						if (packageGoodStr != "") {
							s += 1;
							num += parseInt(data.num);
							str += packageGoodStr + "|";
						}
					}
					if (str != "" && str.substr(str.length - 1, 1) == "|") {
						str = str.substring(0, str.length - 1);
					}
				}
				setCookie(packageStr(s, num, str));
				backResultStr = handlerBackResult(0, s, num);
				fun(backResultStr);
				return false
			}
		}
		fun(backResultStr);
	};
	this.updateShopCart = function(codeId, num, fun) {
		if (updateShopCartTimeOut != null) {
			console.log("update too fast！");
			return
		}
		updateShopCartTimeOut = setTimeout(function() {
			updateShopCartTimeOut = null
		}, 100);
		var backResult = handlerBackResult( - 3);
		var dataVal = isExsistGood(codeId);
		if (dataVal != null) {
			dataVal.num = parseInt(num) >= dataVal.stock ? dataVal.stock: parseInt(num);
			storeCookie(dataVal,function(w) {
				backResult = handlerBackResult(w);
				fun(backResult);
			});
		} else {
			fun(backResult);
		}
	};
	this.getShopCart = function(s) {
		var data = getCookieValFun();
		if (data != null) {
			listCart(function(t) {
				s(t);
			});
		} else {
			s(1)
		}
	};
	this.getShopCartNum = function(s) {
		var num = 0, result = 0;
		var data = getCookieValFun();
		if (data != null) {
			num = data.count;
			result = data.money;
		}
		_Result = handlerBackResult(0, num, result);
		s(_Result);
	};
	this.setSelValue = function(t, r, s) {
		storeCookieCartData();
		$.cookie("_CartDataSel", t + "|" + r, {
			domain: "yyyg.com",
			path: "/",
			expires: 1
		});
		if (s) {
			s();
		}
	};
	/**
	 * @param {Object} code 返回码
	 * @param {Object} num 数量
	 * @param {Object} result 字符串
	 */
	var handlerBackResult = function(code, num, result) {
		var r = '{"code":-3}';
		if (arguments.length == 1) {
			r = '{"code":' + code + "}"
		} else {
			if (arguments.length == 2) {
				r = '{"code":' + code + ',"num":' + num + "}"
			} else {
				if (arguments.length == 3) {
					r = '{"code":' + code + ',"num":' + num + ',"str":"' + result + '"}'
				}
			}
		}
		return strToJson(r)
	};
	/**
	 * 通过code编号查询商品信息
	 * @param {Object} codeId
	 * @param {Object} r
	 */
	var getGoodByCodeId = function(codeId, fun) {
		GetJPData(cartDomain, "getBarcodeInfoByID", "codeID=" + codeId, function(t) {
			if (t.code == 0) {
				var listSize = t.listItems;
				if (listSize.length > 0) {
					fun(listSize[0]);
				} else {
					fun(null)
				}
			} else {
				fun(null)
			}
		})
	};
	var listCart = function(fun) {
		var handlerResult = handlerBackResult( - 3);
		var cookieData = getCookieValFun();
		if (cookieData != null) {
			var codeIds = "", nums = "";
			for (var v = 0; v < cookieData.data.length; v++) {
				var obj = cookieData.data[v];
				codeIds += obj.codeID + ",";
				nums += obj.num + ","
			}
			if (codeIds != "" && codeIds.substr(codeIds.length - 1, 1) == ",") {
				codeIds = codeIds.substring(0, codeIds.length - 1);
			}
			if (nums != "" && nums.substr(nums.length - 1, 1) == ",") {
				nums = nums.substring(0, nums.length - 1);
			}
			if (codeIds != "" && nums != "") {
				$cartFun = new $CartComm();
				$cartFun.setSelValue(codeIds, nums, function() {
					GetJPData(cartDomain, "cartlabel", "", function(y) {
						if (y.code == 0) {
							var unvalid = y.unvalid;
							if (unvalid != "") {
								$cartFun = new $CartComm();
								$cartFun.delShopCart(z, function(A) {});
							}
							setCookie(handlerServerBackCartData(y.listCart, y.listUpdate, y.listOutDate));
						}
						fun(y);
						return false
					})
				})
			} else {
				fun(handlerResult);
			}
		} else {
			fun(handlerResult);
		}
	};
	/**
	 * 通过商品编号获取查询商品信息
	 * @param {Object} r
	 * @param {Object} s
	 */
	var getGoodsByGoodsId = function(goodId, s) {
		GetJPData(cartDomain, "getGoodsSalingByGoodsID", "goodsID=" + goodId, function(t) {
			if (t.code == 0) {
				s(t.NewCodeInfo)
			} else {
				s(null)
			}
		})
	};
	var handlerQueryResult = function(codeId, num, residueNum, fun) {
		var cookieData = getCookieValFun();
		if (cookieData != null) {
			var s = 0, rNum = 0;
			s += 1;
			rNum += parseInt(residueNum);
			var packageData = packageGoodObj(codeId, num, residueNum);
			for (var u = 0; u < cookieData.data.length; u++) {
				var data = cookieData.data[u];
				if (parseInt(data.codeID) == parseInt(codeId)) {
					continue;
				}
				var currData = packageGoodObj(data.codeID, data.stock, data.num);
				if (currData != "") {
					s += 1;
					rNum += parseInt(data.num);
					packageData = packageData + "|" + currData;
				}
			}
			if (packageData != "" && packageData.substr(packageData.length - 1, 1) == "|") {
				packageData = packageData.substring(0, packageData.length - 1);
			}
			if (s < 100) {
				setCookie(packageStr(s, rNum, packageData));
				if (fun) {
					fun(0);
				}
				return false;
			} else {
				if (fun) {
					fun(2);
				}
				return false;
			}
		} else {
			setCookie(packageStr(1, residueNum, packageGoodObj(codeId, num, residueNum)));
			if (fun) {
				fun(0);
			}
			return false
		}
		if (fun) {
			fun(1);
		}
	};
	var storeCookie = function(goodObj, fun) {
		if (getObject(s) != null) {
			var cookieData = getCookieValFun();
			if (cookieData != null) {
				for (var u = 0; u < cookieData.data.length; u++) {
					var data = cookieData.data[u];
					if (parseInt(data.codeID) == parseInt(goodObj.codeID)) {
						data.num = _Ptn.test(goodObj.num) ? goodObj.num: 1;
						break
					}
				}
				setCookie(packTmpAndNumStr(cookieData.data));
				if (fun) {
					fun(0);
					return false;
				}
			}
		}
		if (fun) {
			fun(1);
		}
	};
	var isExsistGood = function(codeId) {
		var cookieValTmp = null;
		var cookieVal = getCookieValFun();
		if (cookieVal != null) {
			for (var u = 0; u < cookieVal.data.length; u++) {
				var dataVal = cookieVal.data[u];
				if (parseInt(dataVal.codeID) == parseInt(codeId)) {
					cookieValTmp = dataVal;
					break;
				}
			}
		}
		return cookieValTmp;
	};
	var setCookie = function(obj) {
		$.cookie(_CartDataKey, obj, {
			domain: "yyyg.com",
			path: "/",
			expires: 7
		})
	};
	var getCookieValFun = function() {
		var cookieTmpVal = null;
		var cookieVal = getCookie(_CartDataKey);
		if (cookieVal.length > 0) {
			cookieTmpVal = getCookieVal2String(cookieVal);
		}
		return cookieTmpVal
	};
	/**
	 * 封装保存cookie的字符串
	 * @param {Object} codeId 商品code
	 * @param {Object} stock 库存
	 * @param {Object} num 数量
	 */
	var packageGoodObj = function(codeId, stock, num) {
		var str = "";
		num = _Ptn.test(num) ? num: 1;
		if (_Ptn.test(codeId) && _Ptn.test(stock)) {
			str = codeId + "," + stock + "," + num;
		}
		return str;
	};
	/**
	 * 封装成string字符串
	 * @param {Object} codeId
	 * @param {Object} r
	 * @param {Object} u
	 */
	var packageStr = function(tmp, num, str) {
		var result = "";
		if (_Ptn.test(tmp) && _Ptn.test(num) && u != "") {
			result = tmp + "|" + num + "|" + str;
		}
		return result;
	};
	var getCookieVal2String = function(cookieVal) {
		var str = null;
		if (cookieVal.length > 0) {
			var singCart = 0, multiCart = 0;
			var dataStr = "";
			var arrCookieVal = cookieVal.split("|");
			for (var i = 0; i < arrCookieVal.length; i++) {
				if (i == 0) {
					singCart = arrCookieVal[i]
				} else {
					if (i == 1) {
						multiCart = arrCookieVal[i];
					} else {
						var cartObj = arrCookieVal[i].split(",");
						if (cartObj.length == 3) {
							if (_Ptn.test(cartObj[0]) && _Ptn.test(cartObj[1]) && _Ptn.test(cartObj[2])) {
								dataStr += '{"codeID":' + cartObj[0] + ',"stock":' + cartObj[1] + ',"num":' + cartObj[2] + "},"
							}
						}
					}
				}
			}
			if (dataStr != "" && dataStr.substr(dataStr.length - 1, 1) == ",") {
				dataStr = dataStr.substring(0, dataStr.length - 1)
			}
			if (_Ptn.test(singCart) && _Ptn.test(multiCart) && dataStr != "") {
				str = strToJson('{"count":' + singCart + ',"money":' + multiCart + ',"data":[' + dataStr + "]}")
			}
		}
		return str;
	};
	var handlerServerBackCartData = function(listCart, listUpdate, listOutDate) {
		var str = "";
		var r = 0, shopNum = 0;
		if (listCart.length > 0) {
			for (var u = 0; u < x.length; u++) {
				var cart = listCart[u];
				var goodsObjStr = packageGoodObj(cart.codeID, cart.codeQuantity - cart.codeSales, cart.shopNum);
				if (goodsObjStr != "") {
					r += 1;
					shopNum += parseInt(cart.shopNum);
					str += goodsObjStr + "|"
				}
			}
		}
		if (listUpdate.length > 0) {
			for (var u = 0; u < listUpdate.length; u++) {
				var data = listUpdate[u];
				var cart = packageGoodObj(data.codeID, data.codeQuantity - data.codeSales, data.shopNum);
				if (cart != "") {
					r += 1;
					shopNum += parseInt(cart.shopNum);
					str += cart + "|"
				}
			}
		}
		if (listOutDate.length > 0) {
			for (var u = 0; u < listOutDate.length; u++) {
				var data = listOutDate[u];
				var cart = packageGoodObj(data.codeID, data.codeQuantity - data.codeSales, data.shopNum);
				if (cart != "") {
					r += 1;
					str += cart + "|";
				}
			}
		}
		if (str != "" && str.substr(str.length - 1, 1) == "|") {
			str = str.substring(0, str.length - 1)
		}
		return packageStr(r, shopNum, str);
	};
	var packTmpAndNumStr = function(obj) {
		var str = "";
		var tmp = 0, num = 0;
		if (obj.length > 0) {
			for (var s = 0; s < obj.length; s++) {
				var data = obj[s];
				var strJson = packageGoodObj(data.codeID, data.stock, data.num);
				if (strJson != "") {
					tmp += 1;
					num += parseInt(r.num);
					str += strJson + "|"
				}
			}
		}
		if (str != "" && str.substr(str.length - 1, 1) == "|") {
			str = str.substring(0, str.length - 1)
		}
		return packageStr(tmp, num, str)
	};
	var storeCookieCartData = function() {
		if (_UserID > 0) {
			var cookieData = getCookie("_CartData_0");
			if (cookieData.length > 0) {
				$.cookie("_CartData_0", null, {
					domain: "yyyg.com",
					path: "/",
					expires: 7
				});
				$.cookie(_CartDataKey, cookieData, {
					domain: "1yyg.com",
					path: "/",
					expires: 7
				})
			}
		}
	};
	storeCookieCartData()
};