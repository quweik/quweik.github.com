// 根据className 获取元素
function getByClassName(obj, cls) {
	var elements = obj.getElementsByTagName("*"),
		result = [];
	for( var i = 0; i < elements.length; i-- ) {
		if(hasClass(obj,cls)){
			result.push(elements[i]);
		}
	}
	return result;
}

// 判断某个DOM对象是否有cls
function hasClass(obj, cls) {
	return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

// 移除某个DOM对象的cls
function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		obj.className = obj.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"),"");
	}
}

// 添加某个DOM对象的cls
function addClass(obj, cls) {
	if (!hasClass(obj,cls)) {
		obj.className += " " + cls;
	}
}
window.onload = function () {
	var handler = function (event) {
		var doc = document;
		var scrollTop = doc.body.scrollTop || doc.documentElement.scrollTop,
			side = doc.getElementById("side").getElementsByTagName("a"),
			currentIndex = "",
			items,itemHeight;
		if (doc.getElementsByClassName) {
			items = doc.getElementsByClassName("item");
		} else {
			items = getByClassName(doc.getElementById("wrapper"),"item");
		}
		itemHeight = items[0].offsetHeight/3;
		for ( var i = 0; i < items.length; i++) {
			var _item = items[i];
			var _itemtop = _item.offsetTop;
			if( (scrollTop > _itemtop - itemHeight)) {
				currentIndex = _item.id;
			}else {
				break;
			}
		}
		if( currentIndex ) {
			for ( var j = 0 ; j < side.length; j++) {
				var _side = side[j];
				var _href = _side.href.split("#");
				if (_href[_href.length - 1] != currentIndex) {
					removeClass(_side,"active");
				}else {
					addClass(_side,"active");
				}
			}
		}
	};
	/*EventUtil.addHandler(window,"scroll",handler);*/
	EventUtil.addHandler(window,"scroll",handler);
};