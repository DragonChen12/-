(function(window,undefined) {
	var that;
	var onOff = false;
	var timeId;
	var countNum;
	function Game(map,restart,time,flagNum) {
		that =this;
		this.map = map;
		this.restart = restart;
		this.time = time;
		this.flagNum = flagNum;
		this.grid = new Grid({
			map: this.map
		});
	}
	Game.prototype.start = function () {
		this.grid.render();
		getFlagNum();
		over();
		this.restart.addEventListener('click',playAgain);
	}
	function over() {//游戏结束
		//1、踩到雷,游戏结束显示所有雷,并且鼠标不能点击
		//2、开完全部数字，弹出弹框显示you win
		for(var i = 0; i < that.map.children.length; i++) {
			var div = that.map.children[i];
			div.addEventListener('click',divClick);
		}
	}
	function divClick() {
		clearInterval(timeId);
		countDown(countNum);
		var count = 0;
		var x = Number(this.style.left.replace('px','')) / that.grid.width; 
		var y = Number(this.style.top.replace('px','')) / that.grid.height;
		for(var i = 0; i < that.grid.gridData.length; i++) {//检测踩到雷
			if(x == that.grid.gridData[i].x && y == that.grid.gridData[i].y) {//检测当前格子的是否是雷
				if(that.grid.gridData[i].isMine) {//是雷改变表情
					that.restart.children[0].src = './image/face_fail.gif';
					for(var j = 0; j < that.grid.gridData.length; j++) {//找出其他的雷
						if(that.grid.gridData[j].isMine) {
							that.map.children[j].style.backgroundImage = 'url(./image/mine.gif)';
							that.map.children[i].style.backgroundImage = 'url(./image/blood.gif)';
							console.log(1);
							for(var k = 0; k < that.grid.gridData.length; k++) {//判断标注错旗子的格子
								if(that.grid.gridData[k].state == 'flag' && that.grid.gridData[k].isMine !== true) {
									that.map.children[k].style.backgroundImage = 'url(./image/error.gif)';
								}
							}
						}
					}
					for(var k = 0; k < that.map.children.length; k++) {// 让格子不能点击
						var div = that.map.children[k];
						div.removeEventListener('click',divClick);// 解除div的绑定的div
						div.onclick = null;// 解除div绑定的剩余类型，leftClick
						clearInterval(timeId);// 停止计时
					}
				} // else {//测试
				// 	for(var j = 0; j < that.grid.gridData.length; j++) {
				// 		if(that.grid.gridData[j].isMine) {
				// 			that.map.children[j].style.backgroundImage = 'url(./image/mine.gif)';
				// 		}
				// 	}
				// }
			}
		}
		var reg = /^url\(\".\/image\/\d.gif\"\)$/;//检测全部掀开数字
		for(var i = 0; i < that.map.children.length; i++) {
			var str = that.map.children[i].style.backgroundImage;
			if(reg.test(str)) {
				count++
			}
		}
		if(count >= 381) {//380=479 - 99 
			for(var k = 0; k < that.map.children.length; k++) {
					var div = that.map.children[k];
					div.onclick = null;
				}
			setTimeout(alert('you win'),0);
			clearInterval(timeId);
		}
	}
	function getFlagNum() {
		for(var i = 0; i < that.map.children.length; i++) {
			var div = that.map.children[i];
			div.addEventListener('contextmenu',rightClick);
		}
	}
	function rightClick(e) {
		clearInterval(timeId);
		countDown(countNum);
		var count = 0;
		if(e.button == 2) {
			for(var i = 0; i < that.grid.gridData.length; i++) {
				if(that.grid.gridData[i].state == 'flag') {
					count++;
				}
			}
		}
		if (count < 10) {
			var oneBit = 9 - count;
			that.flagNum.children[2].src = './image/d'+ oneBit +'.gif';
		}else if (count >= 10){
			oneBit = 9 - count % 10;
			var tenBit = 9 - parseInt(count / 10);
			that.flagNum.children[2].src = './image/d'+ oneBit +'.gif';
			that.flagNum.children[1].src = './image/d' + tenBit + '.gif';
		}
	}
	function countDown(a) {
		var count = a || 0;
		timeId = setInterval(function () {
			count++;
			countNum = count;
			if (count < 10) {
				var oneBit = count;
				that.time.children[2].src = './image/d'+ oneBit +'.gif';
			}else if (count >= 10 && count < 100) {
				oneBit = count % 10;
				var tenBit = parseInt(count / 10);
				var hundredBit = parseInt(count / 100);
				that.time.children[2].src = './image/d'+ oneBit +'.gif';
				that.time.children[1].src = './image/d' + tenBit + '.gif';
				that.time.children[0].src = './image/d' + hundredBit + '.gif';
			}else if (count >= 100) {
				oneBit = count % 10;
				var tenBit = parseInt((count % 100) / 10);
				var hundredBit = parseInt(count / 100);
				that.time.children[2].src = './image/d'+ oneBit +'.gif';
				that.time.children[1].src = './image/d' + tenBit + '.gif';
				that.time.children[0].src = './image/d' + hundredBit + '.gif';
			}
		},1000)
	}
	function playAgain() {
		//重置时间
		clearInterval(timeId);
		countNum = 0;
		that.restart.children[0].src = './image/face_normal.gif';
		that.time.children[0].src='./image/d0.gif';
		that.time.children[1].src='./image/d0.gif';
		that.time.children[2].src='./image/d0.gif';
		//重置旗子
		that.flagNum.children[1].src = './image/d9.gif';
		that.flagNum.children[2].src = './image/d9.gif';
		//重新渲染
		that.grid.clearRightChange();
		that.grid.render();
		getFlagNum();
		over();
	}
	window.Game = Game;
})(window,undefined);
var map = document.querySelector('.map');
var restart = document.querySelector('.restart');
var time = document.querySelector('.time');
var flagNum = document.querySelector('.flagNum');
var game = new Game(map,restart,time,flagNum);
game.start();
