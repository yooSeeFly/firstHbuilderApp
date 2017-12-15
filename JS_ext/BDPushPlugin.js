document.addEventListener("plusready", function() {
	if(mui.os.ios) {
		var _BARCODE = 'BDPush',
			B = window.plus.bridge;
		var BDPush = {
			PluginTestFunction: function(successCallback, errorCallback) {
				var success = typeof successCallback !== 'function' ? null : function(args) {
						successCallback(args);
					},
					fail = typeof errorCallback !== 'function' ? null : function(code) {
						errorCallback(code);
					};
				callbackID = B.callbackId(success, fail);

				return B.exec(_BARCODE, "PluginTestFunction", [callbackID]);
			}
		};
		window.plus.BDPush = BDPush;
	} else {
	  var _BARCODE = 'Location',
		B = window.plus.bridge;
		var plugintest = {
			GetChannelId: function(Argus, successCallback, errorCallback) {
				var success = typeof successCallback !== 'function' ? null : function(args) {
						successCallback(args);
					},
					fail = typeof errorCallback !== 'function' ? null : function(code) {
						errorCallback(code);
					};
				callbackID = B.callbackId(success, fail);
				return B.exec(_BARCODE, "GetChannelId", [callbackID, Argus]);
			},
		};
		window.plus.Location = plugintest;
	}
}, true);