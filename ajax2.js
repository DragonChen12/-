function ajax(obj) {
	//jsonp仅仅支持get请求
	var defaults = {
		url : '#',
		dataType : 'jsonp',
		jsonp : 'callback'
	}

	for(var key in obj) {
		defaults[key]= obj[key];
	}
	//这里是默认的回调函数名称
	var cbName = 'jQuery13040809_22333';
	if(defaults.jsonpCallback){
		cbName = jsonpCallback;
	}
	//这里就是回调函数，调用方式；服务器响应内容来调用
	//向window对象中添加了一个方法，方法名称是cbName
	window[cbName] = function(data){
		obj.success(data);
	}
	

	var script = document.creatElement('script');
	script.src = defaults.url + '?' + defaults.jsonp + '=' + cbName;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}