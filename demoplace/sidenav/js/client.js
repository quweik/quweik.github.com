/* 采用增强模块模式 */
/* 用户代理检测即对浏览器的相关检测 */
var client = function () {
	// 呈现引擎
	var engin = {
		ie : 0,
		gecko : 0,
		webkit: 0,
		khtml : 0,
		opera : 0,

		// 完整的版号
		ver   : null
	};
	// 浏览器
	var browser = {
		// 主要浏览器
		ie	:	0,
		firefox	:	0,
		safari	:	0,
		konq	:	0,
		opera	:	0,
		chrome	:	0,
		// 具体的版本号
		ver		:	null
	};
	// 平台、设备和操作系统
	var system = {
		win		:	false,
		mac		:	false,
		xll		:	false,
		// 移动设备
		iphone	:	false,
		ipad	:	false,
		ipod	:	false,
		ios		:	false,
		android	:	false,
		nokiaN	:	false,
		winMobile	:	false,
		// 游戏系统
		wii		:	false,
		ps		:	false
	};
	// 检测呈现引擎和浏览器
	var ua = navigator.userAgent;
	if(window.opera) {	// opera
		engin.ver = browser.ver = window.opera.version();
		engin.opera = browser.opera = parseFloat(engin.ver);
	}else if (/AppleWebKit\/(\S+)/.test(ua)) {	// webkit 呈现引擎
		engin.ver = RegExp["$1"];
		engin.webkit = parseFloat(engin.ver);

		// 确定是chrome 还是safari
		if(/Chrome\/(\S+)/.test(ua)) {	// Chrome 浏览器
			browser.ver = RegExp["$1"];
			browser.chrome = parseFloat(browser.ver);
		}else if(/Version\/(\S+)/.test(ua)) {	// Safari 浏览器
			browser.ver = RegExp["$1"];
			browser.safari = parseFloat(browser.ver);
		}else {
			// 近似的确定版本号（Safari浏览器代理字符串以前并没有Version）
			var safariVersion = 1;
			if(engin.webkit < 100) {
				safariVersion = 1;
			}else if (engin.webkit < 312) {
				safariVersion = 1.2;
			}else if (engin.webkit < 412) {
				safariVersion = 1.3;
			}else {
				safariVersion = 2.0;
			}
			browser.ver = browser.safari = safariVersion;
		}
	}else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {	// KHTML 呈现引擎，Konqueror浏览器
		engin.ver = browser.ver = RegExp["$1"];
		engin.khtml = browser.konq = parseFloat(engin.ver);
	}else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {	// Gecko 呈现引擎
		engin.ver = RegExp["$1"];
		engin.gecko = parseFloat(engin.ver);
		// 确定是否是Firefox
		if (/Firefox\/(\S+)/.test(ua)) {	// Firefox 浏览器
			browser.ver = RegExp["$1"];
			browser.firefox = parseFloat(browser.ver);
		}
	}else if (/MSIE ([^;]+)/.test(ua)) {	// IE 呈现引擎，IE浏览器
		engin.ver = browser.ver = RegExp["$1"];
		engin.ie = browser.ie = parseFloat(engin.ver);
	}

	// 检测浏览器
	browser.ie = engin.ie;
	browser.opera = engin.opera;

	// 检测平台
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.xll = (p == "Xll") || (p.indexOf("Linux") == 0);

	// 检测Windows操作系统
	if (system.win) {
		// 原正则表达式 /Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/
		if (/Win(?:dows )?(\S{2})\s?(\d+\.\d+)?/.test(ua)) {
			if(RegExp["$1"] == "NT") {
				switch (RegExp["$2"]) {
					case "5.0" :
						system.win = "2000";
						break;
					case "5.1" :
						system.win = "XP";
						break;
					case "6.0" :
						system.win = "Vista";
						break;
					case "6.1" :
						system.win = "7";
						break;
					default:
						system.win = "NT";
						break;
				}
			}else if (RegExp["$1"] == "9x") {
				system.win = "ME";
			} else {
				system.win = RegExp["$1"];
			}
		}
	}

	// 检测移动设备
	system.iphone = ua.indexOf("iphone") > -1;
	system.ipad = ua.indexOf("ipad") > -1;
	system.ipod = ua.indexOf("ipod") > -1;
	system.nokiaN = ua.indexOf("NokiaN") > -1;

	//检测iOS版本
	if (system.mac && ua.indexOf("Mobile") > -1) {
		if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
			system.ios = parseFloat(RegExp.$1.replace("_","."));
		}else {
			system.ios = 2; 	// 不能真正检测出来，所以只能猜测
		}
	}

	// 检测 Android 版本
	if (/Android (\d+\.\d+)/.test(ua)) {
		system.android = RegExp["$1"];
	}

	// 检测Windows Mobile
	if (system.win == "CE") {
		system.winMobile = system.win;
	}else if (system.win == "Ph") {
		if (/Windows Phone OS (\d+\.\d+)/.test(ua)) {
			system.win = "Phone";
			system.winMobile = parseFloat(RegExp["$1"]);
		}
	}

	// 检测游戏系统
	system.wii = ua.indexOf("Wii") > -1; // 任天堂wii
	system.ps = /playstation/i.test(ua); // Playstation 3

	//返回这些对象
	return {
		engin	: engin,
		browser	: browser,
		system	: system
	};
}();