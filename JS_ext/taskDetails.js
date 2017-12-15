mui.plusReady(function() {
	plus.webview.currentWebview().setStyle({
		scrollIndicator: 'none'
	});
});

window.addEventListener("reloadwview", function() {
	var wobj = plus.webview.getWebviewById("TaskDetails");
	wobj.reload(true);
})
window.addEventListener("preAct", function() {
	var extdata = event.detail.extdata;
	var obj = new Object();
	obj.ShipperCode = extdata;
	$.ActionFn.sendData("GetMyMissionDetail", obj, StateSuccess);
})
mui.init({
	//下拉刷新、上拉加载
	pullRefresh: {
		//...
	},
	//手势配置
	gestureConfig: {
		//...
	},
	//侧滑关闭
	swipeBack: true, //Boolean(默认false)启用右滑关闭功能

	//监听Android手机的back、menu按键
	keyEventBind: {
		backbutton: true, //Boolean(默认true)关闭back按键监听
		menubutton: false //Boolean(默认true)关闭menu按键监听
	},
	//处理窗口关闭前的业务
	beforeback: function() {

	},
	preloadPages: [{
		url: "State.html",
		id: "State"
	}]
})

function StateSuccess(returnData) {
	if(returnData.Rtn_Code == 0) {
		var _len = returnData.Content.RtnList.length;
		var dataBase = returnData.Content.RtnList;
		var actFlag = 0; //操作标示
		var htmlStr = "" //拼接变量
		var _index = 0; //标示目的站的索引
		$("#fachedanhao").text(dataBase[0].ShipperCode);
		$("#shifazhongxin").text(dataBase[0].Origin);
		$("#mudizhongxin").text(dataBase[0].Destination);
		$("#banxianmingcheng").text(dataBase[0].RouteName);
		$("#renwuleixing").text(dataBase[0].ShipperTypeStr);
		$("#diaodurenyuan").text(dataBase[0].SchedulingPerson);
		for(var j = 1; j < _len; j++) {
			if(dataBase[0].Destination == dataBase[j].NodeName) {
				_index = j;
				break;
			}
		}

		var swperContent = document.querySelector(".swiper-wrapper");
		swperContent.innerHTML = "";
		for(var i = 0; i < _len; i++) {
			var evediv = document.createElement("div");
			evediv.classList.add("swiper-slide");
			var contentStr = "";
			if(i == 0) { //首站
				contentStr = '<table style="width:80%"  class="swp-evetable">';
				contentStr += '<tr><td style="width:10%"> <img src="../Images/State/zd(2).png" class ="swp-evetable-imgicon"></td><td style="width:20%"><span class="mui-h5">始发站:</span></td><td style="width:50%">' + dataBase[i].NodeName + '</td></tr>';
				contentStr += '<tr><td><img src="../Images/State/qd.png" class="swp-evetable-imgicon"></td><td><span class="mui-h5">发车时间:</span></td><td class="swp-evetable-stime"><span class="sendTime">' + dataBase[i + 1].SendDateTime + '</span></td ></tr>';
				if(dataBase[i + 1].SendDateTime == "") {
					actFlag = -1;
					contentStr += '<tr><td colspan="3"><input type="button" class="send-btn enablebtn" infotype = "0" index = "1" nodename ="' + dataBase[i].NodeName + '" Cid="' + dataBase[i + 1].ID + '" value="发车" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto"/></td></tr>';
				} else {
					contentStr += '<tr><td colspan="3"><input  disabled="disabled" type="button" value="已发车" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto"/></td></tr>';
				}
			} else if(i == _len - 1) { //末站
				contentStr = '<table style="width:80%" class="swp-evetable">';
				contentStr += '<tr><td style="width:10%"><img src="../Images/State/zd(2).png" class ="swp-evetable-imgicon"></td><td style="width:20%"><span class="mui-h5">终点站:</span></td><td style="width:50%">' + dataBase[i].NodeName + '</td></tr>';
				contentStr += '<tr><td><img src="../Images/State/qd.png" class="swp-evetable-imgicon"></td><td><span class="mui-h5">到达时间:</span></td><td class="swp-evetable-stime"><span class="reachTime">' + dataBase[i].ReachDateTime + '</span></td ></tr>';
				if(dataBase[i].ReachDateTime == "") {
					contentStr += '<tr><td colspan="3"><input type="button"  class=" classtype reach-btn" infotype = "1" index = "4" nodename ="' + dataBase[i].NodeName + '" Cid="' + dataBase[i].ID + '" value="到达" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto"  /></td></tr>';
					contentStr += '<tr><td colspan="3"><input  disabled="disabled" type="button" value="已到达" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto;display:none" /></td></tr>';
					if(actFlag == -1) { //判断之前操作是否有未操作的
						contentStr = contentStr.replace("classtype", "disablebtn");

					}
				} else {
					contentStr += '<tr><td colspan="3"><input  disabled="disabled" type="button" value="已到达" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto" /></td></tr>';
				}
			} else { //途径站
				contentStr = '<table style="width:80%" class="swp-evetable">';
				contentStr += '<tr><td style="width:10%"> <img src="../Images/State/zd(2).png" class ="swp-evetable-imgicon"></td><td style="width:20%"><span class="mui-h5">站点:</span></td><td style="width:50%">' + dataBase[i].NodeName + '</td></tr>';
				contentStr += '<tr><td><img src="../Images/State/zd.png" class="swp-evetable-imgicon"></td><td><span class="mui-h5">到达时间:</span></td><td class="swp-evetable-stime"><span class="reachTime">' + dataBase[i].ReachDateTime + '</span></td></tr>';
				contentStr += '<tr><td><img src="../Images/State/qd.png" class="swp-evetable-imgicon"></td><td><span class="mui-h5">发车时间:</span></td><td class="swp-evetable-stime"><span class="sendTime">' + dataBase[i + 1].SendDateTime + '</span></td></tr>';
				if(dataBase[i].ReachDateTime == "") {
					contentStr += '<tr><td colspan="3"><input type="button"  class=" classtype reach-btn" infotype = "2" index = "inftyper" nodename ="' + dataBase[i].NodeName + '" Cid="' + dataBase[i].ID + '" value="到达" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto"  /></td></tr>';
					contentStr += '<tr><td colspan="3"><input type="button"  class=" classtype send-btn" infotype = "2" index = "inftypes" nodename ="' + dataBase[i].NodeName + '" Cid="' + dataBase[i + 1].ID + '" value="发车" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto;display: none;"/></td></tr>';
					if(actFlag == -1) { //判断之前操作是否有未操作的
						contentStr = contentStr.replace("classtype", "disablebtn");
					}
					actFlag = -1;
				} else if(dataBase[i + 1].SendDateTime == "") {
					contentStr += '<tr><td colspan="3"><input type="button" class="enablebtn send-btn" infotype = "2" nodename ="' + dataBase[i].NodeName + '" Cid="' + dataBase[i + 1].ID + '" index = "inftypes" value="发车" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto"/></td></tr>';
				} else {
					contentStr += '<tr><td colspan="3"><input class = "disablebtn" type="button"  value="已到达" style="height: 35px; width: 180px; background-color: #03a2f5; color:white; margin:auto"  /></td></tr>';
				}
				var inftypes = 0,
					inftyper = 0; //判断回写的状态
				if(i < _index) {
					inftyper = 1;
					inftypes = 1;
				} else if(i == _index) {
					inftyper = 2;
					inftypes = 3;
				} else if(i > _index) {
					inftyper = 3;
					inftypes = 3;
				}
				contentStr = contentStr.replace("inftyper", inftypes); //到达索引
				contentStr = contentStr.replace("inftypes", inftyper); //发车索引
			} //运输状态 0 未执行 1 运输中 2 已到达 3返程中  4运输完成 5补单
			contentStr += "</table>";
			evediv.innerHTML = contentStr;
			swperContent.appendChild(evediv);
		}
		//预加载发现会出现状态保留，那么在这里我们会出现html样式保留，所以需要重新渲染或者重新加载。
		var mainSwper = document.querySelector(".swiper-container");
		$(".swiper-container").remove(".swiper-pagination").remove(".swiper-button-next").remove(".swiper-button-prev");
		$(".swiper-container>div").not(".swiper-wrapper ").each(function(b) {
			$(b).remove();
		})
		var swiper = new Swiper('.swiper-container', {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			pagination: '.swiper-pagination',
			paginationType: 'progress',
			autoHeight: true, //enable auto height
		});
		_attachEvent();
	}
}

function _attachEvent() {
	var sendBtnList = document.querySelectorAll(".send-btn")
	var _lensendBtnList = sendBtnList.length;
	for(var k = 0; k < _lensendBtnList; k++) {
		sendBtnList[k].addEventListener("tap", function(e) { //// 注册事件  for 发车按钮
			if(e.currentTarget.classList.contains("disablebtn")) {
				mui.toast('当前站点无法操作。');
				return;
			}
			alert(1)
			var userinfo = $.ActionFn.GetlocalStorage("userInfo");
			var objectData = new Object();
			objectData.InfoType = e.currentTarget.getAttribute("infotype");
			objectData.ShipperCode = document.querySelector("#fachedanhao");
			objectData.ShipperState = e.currentTarget.getAttribute("index");
			objectData.OperUserName = userinfo.RtnLoginList[0].DriName;
			objectData.OperCompanyID = userinfo.RtnLoginList[0].UnitID;
			objectData.OperBranchID = userinfo.RtnLoginList[0].UnitBranch;
			objectData.SendCompanyName = userinfo.RtnLoginList[0].UnitName;
			objectData.NodeName = e.currentTarget.getAttribute("nodename");
			objectData.X = "112.5";
			objectData.Y = "31.5";
			objectData.ID = e.currentTarget.getAttribute("Cid");
			objectData.DriType = userinfo.RtnLoginList[0].DriType;
			objectData.HRCode = userinfo.RtnLoginList[0].HRCode;
			//$.ActionFn.SetlocalStorage("temporaryData", objectData);
			$.ActionFn.sendData("SendAndArriveBySend", objectData, SendSuccess, SendDefeated);
		})
	}
	var reachBtnList = document.querySelectorAll(".reach-btn");
	var _lenreachBtnList = reachBtnList.length;
	for(var k = 0; k < _lensendBtnList; k++) {
		reachBtnList[k].addEventListener("tap", function(e) { //// 注册事件  for 到达按钮
			if(e.currentTarget.classList.contains("disablebtn")) {
				mui.toast('当前站点无法操作。');
				return;
			}
			var userinfo = $.ActionFn.GetlocalStorage("userInfo");
			var objectData = new Object();
			objectData.InfoType = e.currentTarget.getAttribute("infotype");
			objectData.ShipperCode = document.querySelector("#fachedanhao");
			objectData.ShipperState = e.currentTarget.getAttribute("index");
			objectData.OperUserName = userinfo.RtnLoginList[0].DriName;
			objectData.OperCompanyID = userinfo.RtnLoginList[0].UnitID;
			objectData.OperBranchID = userinfo.RtnLoginList[0].UnitBranch;
			objectData.SendCompanyName = userinfo.RtnLoginList[0].UnitName;
			objectData.NodeName = e.currentTarget.getAttribute("nodename");
			objectData.X = "112.5";
			objectData.Y = "31.5";
			objectData.ID = e.currentTarget.getAttribute("Cid");
			objectData.DriType = userinfo.RtnLoginList[0].DriType;
			objectData.HRCode = userinfo.RtnLoginList[0].HRCode;
			$(".enablebtn").parents("table.swp-evetable").find(".reachTime").text($.ActionFn.timeFormat((new Date()), "yyyy-MM-dd hh:mm:ss"));
			$(".enablebtn").parents("tr").next().find("input").addClass("enablebtn").removeClass("disablebtn").show();
			$(".enablebtn:eq(0)").addClass("disablebtn").removeClass("enablebtn").hide();
			$.ActionFn.sendData("SendAndArriveByArrive", objectData, ArriveSuccess, ArriveDefeated);
		})
	}
}

function SendSuccess(returnData) {
	if(returnData.Rtn_Code == "0") {
		$(".enablebtn").parents("table.swp-evetable").find(".sendTime").text($.ActionFn.timeFormat((new Date()), "yyyy-MM-dd hh:mm:ss"));
		$(".enablebtn").parents("div.swiper-slide").next().find("input:eq(0)").addClass("enablebtn").removeClass("disablebtn");
		$(".enablebtn:eq(0)").addClass("disablebtn").removeClass("enablebtn");
		mui.toast("发车成功");
	} else {
		mui.toast(msg.Rtn_Msg);
	}
}

function SendDefeated() {
	mui.toast("当前网络环境差，任务已被离线存储，请在离线任务中操作");
	var objectData = $.ActionFn.GetlocalStorage("temporaryData");
	var userinfo = $.ActionFn.GetlocalStorage("userInfo");
	//操作信息对象
	var OperateObj = new Object();
	OperateObj.Content = objectData;
	OperateObj.OperDate = $.ActionFn.timeFormat((new Data()), "yyyy-MM-dd hh:mm:ss"); //操作时间
	OperateObj.infoType = objectData.InfoType;
	OperateObj.OperateType = 0; //操作类型  0是发车 1是到车
	OperateObj.shipperCode = objectData.ShipperCode;
	OperateObj.indexid = OperateObj.ID
	OperateObj.OperateContent = objectData.NodeName + "做发车操作";
	//获取司机本地离线缓存
	var offLineInfo = $.ActionFn.GetlocalStorage("offline" + userinfo.RtnLoginList[0].ID);
	//如果缓存文件为空则新建
	if(offLineInfo == "" || offLineInfo == null) {
		//每一条操作记录保存到数组里面
		var OffLine = new Array();
		OffLine = offLineInfo;
		var length = OffLine.length;
		OffLine[0] = OperateObj;
		//重新向本地缓存写入数据
		$.ActionFn.SetlocalStorage("offline" + userinfo.RtnLoginList[0].ID, OffLine);

	}
	//否则获取缓存文件，继续添加数据
	else {
		var OffLine = new Array();
		OffLine = offLineInfo;
		var length = OffLine.length;
		var state = true;
		for(var i = 0; i < length; i++) {
			if(OperateObj.ID == OffLine[i].indexid && OperateObj.OperateType == OffLine[i].OperateType) {
				state = false;
			}
		}
		if(!state) {
			mui.alert('当前站点已经进行了离线发车操作！', '提示');
		} else {
			//重新向本地缓存文件写入数据
			OffLine[length] = OperateObj;
			$.ActionFn.SetlocalStorage("offline" + userinfo.RtnLoginList[0].ID, OffLine);
		}
	}
	mui.toast("离线到车操作保存成功！");
	$(".enablebtn").parents("table.swp-evetable").find(".sendTime").text($.ActionFn.timeFormat((new Date()), "yyyy-MM-dd hh:mm:ss"));
	$(".enablebtn").parents("div.swiper-slide").next().find("input:eq(0)").addClass("enablebtn").removeClass("disablebtn");
	$(".enablebtn:eq(0)").addClass("disablebtn").removeClass("enablebtn");
} //到站失败结尾

function ArriveSuccess(returnData) {
	if(returnData.Rtn_Code == "0") {
		mui.toast("到达成功");
	} else {
		mui.toast(msg.Rtn_Msg);
	}
}

function ArriveDefeated() {
	mui.toast("当前网络环境差，任务已被离线存储，请在离线任务中操作");
	var userinfo = $.ActionFn.GetlocalStorage("userInfo");
	var objectData = $.ActionFn.GetlocalStorage("temporaryData");
	//操作信息保存
	var OperateObj = new Object();
	OperateObj.Content = objectData;
	OperateObj.OperDate = $.ActionFn.timeFormat((new Data()), "yyyy-MM-dd hh:mm:ss"); //操作时间
	OperateObj.infoType = objectData.InfoType;
	OperateObj.OperateType = 1; //操作类型  0是发车 1是到车
	OperateObj.shipperCode = objectData.ShipperCode;
	OperateObj.indexid = OperateObj.ID
	OperateObj.OperateContent = objectData.NodeName + "做到达操作";
	//获取司机本地离线缓存
	var offLineInfo = $.ActionFn.GetlocalStorage("offline" + userinfo.RtnLoginList[0].ID);
	//如果缓存文件为空则新建
	if(offLineInfo == "" || offLineInfo == null) {
		//每一条操作记录保存到数组里面
		var OffLine = new Array();
		OffLine[0] = OperateObj;
		//重新向本地缓存写入数据
		$.ActionFn.SetlocalStorage(OffLine, "offline" + userinfo.RtnLoginList[0].ID);
	} else { //否则获取缓存文件，继续添加数据
		var OffLine = new Array();
		OffLine = offLineInfo;
		var length = OffLine.length;
		var state = true;
		for(var i = 0; i < OffLine.length; i++) {
			if(OperateObj.ID == OffLine[i].indexid && OperateObj.OperateType == OffLine[i].OperateType) {
				state = false;
			}
		}
		if(!state) {
			mui.alert('当前站点已经进行了离线发车操作！', '提示');
		} else {
			//重新向本地缓存文件写入数据
			OffLine[length] = OperateObj;
			$.ActionFn.SetlocalStorage(OffLine, "offline" + userinfo.RtnLoginList[0].ID);
		}
	}
	mui.toast("离线到车操作保存成功！");
	$(".enablebtn").parents("table.swp-evetable").find(".reachTime").text($.ActionFn.timeFormat((new Date()), "yyyy-MM-dd hh:mm:ss"));
	$(".enablebtn").parents("tr").next().find("input").addClass("enablebtn").removeClass("disablebtn").show();
	$(".enablebtn:eq(0)").addClass("disablebtn").removeClass("enablebtn").hide();
} //到站失败结尾

function toLocation() {
	var data = $("#fachedanhao").text();
	$.ActionFn.selfFireFunction("State", "preAct", data);
	$.ActionFn.selfOpenWindow("State", "State.html");
}