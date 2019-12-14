function turnPage() {
	var oPageNum = document.querySelectorAll('.page-num div'),
		vScreenWidth = document.documentElement.clientWidth + 17,
		index = 0,
		lastIndex,
		vBoxNum,
		oPreBtn = document.querySelector('.pre'),
		oNextBtn = document.querySelector('.next');
	if (vScreenWidth <= 1125) {
		vBoxNum = 3;
	}else {
		vBoxNum = oPageNum.length;
	}
	for(var i = 0; i < vBoxNum; i++) {
		(function(i){
			oPageNum[i].onclick = function () {
				change(function(){
					if (!(i == 0 && index == 0)){
						lastIndex = index;
					}
					index = i;
				})
			}
		})(i)
	}
	oPreBtn.onclick = function () {
		change(function() {
			lastIndex = index;
			index--;
			if (index < 0) {
				index = 0;
				alert("已经是第一页了")
			}
		})
	}
	oNextBtn.onclick = function () {
		change(function() {
			lastIndex = index;
			index++;
			if (index >= vBoxNum) {
				index = vBoxNum - 1;
				alert("已经是最后一页了")
			}
		})
	}
	function change (callback) {
		callback && callback();
		oPageNum[index].className = "current";
		oPageNum[lastIndex].classList.remove("current");
	}
}
addLoadEvent(turnPage);