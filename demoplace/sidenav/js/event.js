var EventUtil = {
	// 添加事件
	addHandler	:	function(element, type, handler) {
		// 使用能力检测DOM2 级事件
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {	// IE 事件处理程序
			element.attachEvent("on" + type, handler);
		}else {	// DOM 0 级事件
			element["on" + type] = handler;
		}
	},
	// 移除事件
	removeHandler	:	function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		}else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		}else {
			element["on" + type] = null;
		}
	},
	// 获取事件对象 event
	getEvent	:	function (event) {
		return event ? event : window.event;
	},
	// 获取事件目标元素
	getTarget	:	function (event) {
		return event.target || event.srcElement;
	},
	// 取消事件的默认行为
	preventDefault	:	function (event) {
		if (event.preventDefault) {	// 能力检测
			event.preventDefault();
		}else {
			event.returnValue = false;	// IE
		}
	},
	// 取消事件的冒泡
	stopPropagation	:	function (event) {
		if (event.stopPropagation) {	// 能力检测
			event.stopPropagation();
		}else {
			event.cancelBubble = true;	// IE
		}
	},
	// 获取与 mouseout、mouseover 事件相关的元素
	getRelatedTarget	:	function (event) {
		if (event.relatedTarget) {	// 非IE8以下浏览器
			return event.relatedTarget;
		}else if (event.fromElement) {	// IE8以下  mouseover事件
			return event.fromElement;
		}else if (event.toElement) {	// IE8以下  mouseout事件
			return event.toElement;
		}else {
			return null;
		}
	},

	// 获取事件的页面坐标位置Point
	getPagePoint	:	function (event) {
		var point = {},
			pageX = event.pageX,
			pageY = event.pageY;
		if (pageX === undefined) {
			pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
		}
		if (pageY === undefined) {
			pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
		}
		point.pageX = pageX;
		point.pageY = pageY;
		return point;
	},

	// 获取鼠标按钮的类型
	getButton	:	function (event) {
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		}else {		// 兼容IE8 及之前版本
			switch(event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},

	// 鼠标滚轮事件，跨浏览器兼容（opera早期版本，firefox)
	getWheelData	:	function (event) {	// 兼容opera早期版本，方向相反
		if (event.wheelDelta) {
			return (client.engin.opera && client.engin.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
		} else {	// 兼容firefox 向前 -3 ，向后 3
			return -event.detail * 40;
		}
	},

	// 发生keypress事件时，获取字符编码
	getCharCode	:	function (event) {
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {	// 兼容IE8之前和opera 在keyCode中保存字符的ASCII编码
			return event.keyCode;
		}
	}
};