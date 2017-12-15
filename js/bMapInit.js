function mapInit(type, zoom, maxZo, minZo, themeStyle, center) {
	var type=type?type:BMAP_NORMAL_MAP;
	var zoom=zoom?zoom:17;
	var max = maxZo ? maxZo : 19;
	var min = minZo ? minZo : 6;
	var themeStyle = themeStyle ? themeStyle : 'light';
	//var mapType1 = new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP] });//, BMAP_HYBRID_MAP
	var center=center?center:'121.191705, 31.166028';
	    map=new BMap.Map("map",{mapType: type,maxZoom: max,minZoom:min});
	    map.centerAndZoom(new BMap.Point(center.split(',')[0],center.split(',')[1]),zoom);
		map.enableScrollWheelZoom();
		map.setMapStyle({ style: themeStyle });
		//map.addControl(mapType1);

		

}


