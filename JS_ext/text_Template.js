var initTemplates = function() { //初始化模板
	getTemplate('default', 'test_template.html');
};
var templates = new  Array;
var getTemplate = function(name, header, content) {
	var template = templates[name];
	if(!template) {
		//预加载共用父模板；
		var headerWebview = mui.preload({
			url: header,
			id: name + "-main",
			styles: {
				popGesture: "hide",
			}
		});
		//		//预加载共用子webview
		//		var subWebview = mui.preload({
		//			url: "",
		//			id: name + "-sub",
		//			styles: {
		//				top: '45px',
		//				bottom: '0px',
		//			},
		//			extras: {
		//				mType: 'sub'
		//			}
		//		});
		//		subWebview.addEventListener('titleUpdate', function() {
		//			setTimeout(function() {
		//				subWebview.show();
		//			}, 50);
		//		});
		//		subWebview.hide();
		//		headerWebview.append(subWebview);
		//iOS平台支持侧滑关闭，父窗体侧滑隐藏后，同时需要隐藏子窗体；
		if(mui.os.ios) { //5+父窗体隐藏，子窗体还可以看到？不符合逻辑吧？
			headerWebview.addEventListener('hide', function() {
				headerWebview.children().hide("none");
			});
		}
		templates[name] = template = {
			name: name,
			header: headerWebview,
			content: "",
		};
	}
	return template;
	
};

function initShowContent(name, content) //将模板与内容页凭借完成
{
	var template = templates[name];
	console.log('template has '+template);
	if(!template) {
		var tempView = templates["default"];
		var template = {
			name:name,
			header:tempView.header
		}
		var subWebview = null;
		if(content) {
			subWebview = plus.webview.getWebviewById(content);
		}
		console.log((subWebview == null ? "isNull" : subWebview.getURL()))
		if(subWebview == null) {
			subWebview = mui.preload({
				url: content + ".html",
				id: content,
				styles: {
					top: '45px',
					bottom: '0px',
				},
				createNew: false
			});
		}
		var headerWebview = template.header;
		//var oldContentWebview = template.content;
		headerWebview.onloaded = headerLoading(subWebview);
		console.log("before remove,number of children is " + headerWebview.children().length)
		//headerWebview.remove(oldContentWebview);
		console.log("after remove, number of children is " + headerWebview.children().length)
		headerWebview.append(subWebview); //两个webview合并
		//headerWebview.reload();
		template.content = subWebview;
		console.log("childrenview Url:" + headerWebview.children()[0].getURL())
		//oldContentWebview.hide();
		console.log("newview : " + subWebview.getURL())
		templates[name] = template;
	}
	return template;
};

function headerLoading(subWebview) {
	subWebview.onloaded = subLoading(subWebview);
}

function subLoading(subWebview) {
	console.log(subWebview.getURL())
	subWebview.show();
}
var hrefList = document.querySelectorAll(".mui-navigate-right")
var _len = hrefList.length;
for(var i = 0; i < _len; i++) {
	hrefList[i].addEventListener("tap", function(e) {
		//使用父子模板方案打开的页面
		var optid = e.currentTarget.getAttribute("data-id");
			//获得共用模板组
			//var template = getTemplate('myAttendance', 'myAttendance.html', 'myAttendance'); //获取模板对象
		var template = initShowContent(optid, optid);
		//获得共用父模板
		var headerWebview = template.header; //模板头
		//获得共用子webview
		var contentWebview = template.content; //模板内容页
		var title = "测试标题" //获得标题头的内容
			//通知模板修改标题，并显示隐藏右上角图标；
		mui.fire(headerWebview, 'updateHeader', { //触发内容页的事件
			title: title,
			target: optid + ".html",
			subWebId: optid
		});
		if(mui.os.ios || (mui.os.android && parseFloat(mui.os.version) < 4.4)) { //判断机型
			var reload = true;
			//			if(!template.loaded) { //加载完成事件
			//				if(contentWebview.getURL() != this.href) { //如果隐藏的view不是当前的子页面路径则将页面重新加载
			//					contentWebview.loadURL(this.href);
			//				} else {
			//					reload = false;
			//				}
			//			} else {
			//				reload = false;
			//			}
			(!reload) && contentWebview.show(); //如果为已加载，则在模板页里实现如果没有，则显示
			headerWebview.show("pop-in", 150); //头部显示
		}
	})
}