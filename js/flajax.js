function ajax(obj) {
	if (typeof obj !== 'object') {
		console.error("parameter of function is not a object!");
		return;
	}
	var defaults = {
		type: 'get',
		data: {},
		url: '#',
		dataType: 'text',
		async: true,
		success: function(data) {
			console.log(data);
		}
	}
	for (var key in obj) {
		defaults[key] = obj[key];
	}
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	var param = '';
	for (var attr in defaults.data) {
		param += attr + '=' + defaults.data[attr] + '&';
	}
	if (param) {
		param = param.substring(0,param.length-1)
	}
	if (defaults.type == 'get') {
		defaults.url += '?' + encodeURI(param);
	}
	xhr.open(defaults.type, defaults.url, defaults.async);
	var data = null;
	if (defaults.type == 'post') {
		data = param;
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	xhr.send(data);
	if (!defaults.async) {
		if (defaults.dataType == 'json') {
			return JSON.parse(xhr.responseText);
		}
		return xhr.responseText;
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = xhr.responseText;
				console.log(data);
				if (defaults.dataType == 'json') {
					// data = eval("("+ data +")");
					data = JSON.parse(data);
				}
				defaults.success(data);
			}
		}
	}
}