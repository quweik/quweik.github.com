window.onload = function() {
	var $ = document,
		common = $.getElementById('common-middle'),
		nav = $.getElementById('nav'),
		items = common.getElementsByTagName('a'),
		navlist = nav.getElementsByTagName('li'),
		len = items.length,
		navlistLen = navlist.length;
		while(len--) {
			(function (index){
				var node = items[len];
				if (node.addEventListener) {
					node.addEventListener('mouseover',function(event) {
						return handlerMouseover(node);
					}, false);
				} else if (node.attachEvent) {
					node.attachEvent('onmouseover',function(event) {
						return handlerMouseover(node);
					});
				} else {
					node.onmouseover = function(event) {
						return handlerMouseover(node);
					};
				}
			})(len);
		}
	
	// 对按钮添加click事件，将选中的选项移到最前面
	while(navlistLen--) {
			(function (index){
				var node = navlist[navlistLen];
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
			})(navlistLen);
		}
	// 切换状态
	function handlerMouseover (node) {
		var nodeParent = node.parentNode.parentNode,
			childNodes = nodeParent.childNodes,
			childLen = childNodes.length;
			while(childLen--) {
				if (childNodes[childLen].nodeType == 1) {
					var a = childNodes[childLen].childNodes[0];
					if (a.nodeType != 1) {
						a = a.nextSibling();
					}
					if (hasClass(a, 'selected')) {
						removeClass(a, 'selected');
					}
				}
			}
		addClass(node, 'selected');
	}

	// 处理导航的点击事件，将被点击选中的导航项高亮显示并且位置移到最前面
	function handlerNavList (node) {
		var nodeParent = node.parentNode,
			childNodes = nodeParent.childNodes,
			childLen = childNodes.length,
			replaceNode;
			while(childLen--) {
				if (childNodes[childLen].nodeType == 1) {
					var a = childNodes[childLen];
					if (hasClass(a, 'nav-item-selected')) {
						removeClass(a, 'nav-item-selected');
					}
				}
			}
		addClass(node, 'nav-item-selected');
		if (node != nodeParent.firstChild && nodeParent.firstChild) {
			replaceNode = nodeParent.removeChild(nodeParent.firstChild);
			nodeParent.insertBefore(node, nodeParent.firstChild);
			nodeParent.appendChild(replaceNode);
		}
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