window.onload = function() {
	var $ = document,
		moveItem = $.getElementById('move-item'),
		items = moveItem.getElementsByTagName('li'),
		len = items.length;
	
	// 对按钮添加click事件，切换选中高亮
	while(len--) {
			(function (index){
				var node = items[len];
				if (node.addEventListener) {
					node.addEventListener('click',function(event) {
						return handlerNavList(node);
					}, false);
				} else if (node.attachEvent) {
					node.attachEvent('onclick',function(event) {
						return handlerNavList(node);
					});
				} else {
					node.onclick = function(event) {
						return handlerNavList(node);
					};
				}
			})(len);
		}
	// 处理每个项的点击事件
	function handlerNavList (node) {
		var nodeParent = node.parentNode,
			childNodes = nodeParent.childNodes,
			childLen = childNodes.length,
			replaceNode;
			while(childLen--) {
				if (childNodes[childLen].nodeType == 1) {
					var a = childNodes[childLen];
					if (hasClass(a, 'move-item-selected')) {
						removeClass(a, 'move-item-selected');
					}
				}
			}
		addClass(node, 'move-item-selected');
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
};