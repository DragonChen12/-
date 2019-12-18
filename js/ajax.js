/* get请求*/
//1、创建XMLHttpRequest对象
var xhr = null;
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();//标准
}
//2、准备发送
/*
参数一：请求方式（get获取数据：post提交数据）
参数二：请求地址
参数三：同步或者异步标志位，默认是true表示异步，false表示同步

如果是get请求那么请求参数必须在url中传递
 */
var param = 'username='+uname+'&password='+pw;//uname和pw是变量，这是get方法通过url传值
xhr.open('get','02get.php?'+encodeURI(param),true);//encodeURI()用来对中文参数进行编码，防止乱码
//3、执行发送动作
xhr.send(null);//get请求这里需要添加null参数
//4、指定回调函数
//该函数调用的条件就是readyState状态发生变化（不包括从0变到1）
xhr.onreadystatechange =function() {
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			//执行内容
		}
	}
}



/* post请求*/
//1、创建XMLHttpRequest对象
var xhr = null;
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();//标准
}
//2、准备发送
/*
参数一：请求方式（get获取数据：post提交数据）
参数二：请求地址
参数三：同步或者异步标志位，默认是true表示异步，false表示同步

post请求参数通过send传递，不需要通过encodeURI（）转码
必须设置请求头信息
一般post不使用同步请求
 */
var param = 'username='+uname+'&password='+pw;//uname和pw是变量，这是get方法通过url传值
xhr.open('post','02get.php?',true);//encodeURI()用来对中文参数进行编码，防止乱码
//3、执行发送动作
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(param);//post请求参数在这里传递，并且不需要转码
//4、指定回调函数
xhr.onreadystatechange =function() {
	if(xhr.readyState == 4){
		if(xhr.status == 200){
			//执行内容
		}
	}
}