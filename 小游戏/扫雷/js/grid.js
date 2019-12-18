(function(window,undefined){
	var elements = [];
	var that;
	function Grid(option) {
		that = this;
		option = option || {};
		this.map = option.map;
		this.width = option.width || 20;
		this.height = option.height || 20;
		this.gridData = [];//坐标，状态
	}
	Grid.prototype.render = function () {
		for(var i = 0; i < elements.length; i++) {
			var div = elements[i];
			this.map.removeChild(div);
		}
		this.gridData = [];
		elements = []; 
		gridInitialize();
		for(var i = 0; i < this.gridData.length; i++) {
			switch (this.gridData[i].state) {
				case 'blank': 
				creatElement.call(this,this.map,i,'url(./image/blank.gif)');
				break;
				case 'error':
				creatElement.call(this,this.map,i,'url(./image/error.gif)');
				break;
				case 'mine':
				creatElement.call(this,this.map,i,'url(./image/mine.gif)');
				break;
			}
		}
		getMine();
		getRoundMines();
		getFunction();
	}
	Grid.prototype.clearRightChange=function () {//清除旗子问号
		for(var i = 0; i < elements.length; i++){
			elements[i].onOff = 3;
			rightChange.call(elements[i],'blank');
		}
	}
	function gridInitialize() {//格子初始化
		that.gridData = [];
		var gridXs = that.map.offsetWidth / that.width;//横向最大格子数
		var gridYs = that.map.offsetHeight / that.height;//纵向最大格子数
		for(var i = 0; i < gridXs; i++) {
			for(var j = 0; j < gridYs; j++) {
				var obj = {x: i, y: j, state: 'blank', lclick: 0};//state:状态，有空白blank、错误error；lclick：显示的是格子的数字或者mine
				that.gridData.push(obj);
			}
		}
		for(var i = 0; i < that.gridData.length; i++) {
			that.gridData[i].isOpened = false;
		}
	}
	function creatElement(map,i,url) {
		var div = document.createElement('div');
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.left = this.gridData[i].x * this.width + 'px';
		div.style.top = this.gridData[i].y * this.height + 'px';
		div.style.backgroundImage = url;
		div.style.backgroundSize = '20px 20px';
		div.style.position = 'absolute';
		map.appendChild(div);
		elements.push(div);
	}
	function getFunction () {//为每个格子绑定事件
		for(var i = 0; i < elements.length;i++) {
			var div = elements[i];
			div.onOff = 1; //开关，控制右键显示旗子，问号，空白
			div.oncontextmenu = rightClick;
			div.onclick = leftClick;
		}
	}
	function rightClick(e) {
		if (e.button == 2) {
			if(this.onOff == 1) {//onOff为1显示旗子
				rightChange.call(this,'flag');
				this.onOff = 2;
			}else if (this.onOff == 2) {//onOff为2显示问号
				rightChange.call(this,'ask');
				this.onOff = 3;
			}else if (this.onOff == 3) {//onOff为3显示空白
				rightChange.call(this,'blank');
				this.onOff = 1;
			}
			return false;
		}
	}
	function rightChange(state) {
		this.style.backgroundImage = 'url(./image/'+ state +'.gif)';
		var x = Number(this.style.left.replace('px','')) / that.width;
		var y = Number(this.style.top.replace('px','')) / that.height;
		for(var i = 0; i < that.gridData.length; i++) {
			if(x == that.gridData[i].x && y == that.gridData[i].y ) {
				that.gridData[i].state = state;
			}
		}
	}
	function leftClick() {
		var x = Number(this.style.left.replace('px','')) / that.width;
		var y = Number(this.style.top.replace('px','')) / that.height;
		for(var i = 0; i < that.gridData.length; i++) {
			that.gridData[i].index = i;
			if(x == that.gridData[i].x && y == that.gridData[i].y ) {
				switch (that.gridData[i].lclick) {
					case 0:
					this.style.backgroundImage = 'url(./image/0.gif)';
					break;
					case 1:
					this.style.backgroundImage = 'url(./image/1.gif)';
					break;
					case 2:
					this.style.backgroundImage = 'url(./image/2.gif)';
					break;
					case 3:
					this.style.backgroundImage = 'url(./image/3.gif)';
					break;
					case 4:
					this.style.backgroundImage = 'url(./image/4.gif)';
					break;
					case 5:
					this.style.backgroundImage = 'url(./image/5.gif)';
					break;
					case 6:
					this.style.backgroundImage = 'url(./image/6.gif)';
					break;
					case 7:
					this.style.backgroundImage = 'url(./image/7.gif)';
					break;
					case 8:
					this.style.backgroundImage = 'url(./image/8.gif)';
					break;
					case 'mine':
					this.style.backgroundImage = 'url(./image/mine.gif)';
					break;
				}
			}
		}
		getSafeArea.call(this);
	}
	function getRandom(min,max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function getMine() {
		var n = 1;
		// var arr = [];
		do{	
			var x = getRandom(0,29);
			var y = getRandom(0,15);
			for(var j = 0; j < that.gridData.length; j++) {
				if(x == that.gridData[j].x && y == that.gridData[j].y) {
					if(!that.gridData[j].isMine) {//去重
						that.gridData[j].isMine = true;
						that.gridData[j].lclick = 'mine';
						n++;//保证循环99次
					}
				}
			}
		}while(n <= 99)
	}
	function getRoundMines() {
		for(var i = 0; i < that.gridData.length; i++) {
			if (!that.gridData[i].isMine) {
				if (that.gridData[i].x == 0 && that.gridData[i].y == 0) {
					//a=1是指下一个格子，a=16是指从右边的第一个格子，a=17是指右下方第一个格子
					quadrangle(i,1);
					quadrangle(i,16);
					quadrangle(i,17);
				}
				else if (that.gridData[i].x == 0 && that.gridData[i].y == 15) {
					quadrangle(i,-1);
					quadrangle(i,15);
					quadrangle(i,16);
				}
				else if (that.gridData[i].x == 29 && that.gridData[i].y == 15) {
					quadrangle(i,-1);
					quadrangle(i,-16);
					quadrangle(i,-17);
				}
				else if(that.gridData[i].x == 29 && that.gridData[i].y == 0) {
					quadrangle(i,1);
					quadrangle(i,-16);
					quadrangle(i,-15);
				}
				else if (i - 16 < 0 && (i !== 0 || i !== 15)) {
					quadrangle(i,-1);
					quadrangle(i,1);
					quadrangle(i,15);
					quadrangle(i,16);
					quadrangle(i,17);
				}
				else if (i % 16 == 0 && (i !== 0 || i !== 29 * 16)) {
					quadrangle(i,-16);
					quadrangle(i,-15);
					quadrangle(i,1);
					quadrangle(i,16);
					quadrangle(i,17);
				}
				else if ((i + 1) % 16 == 0 && (i !== 15 || i !== 29 * 16 + 15)) {
					quadrangle(i,-16);
					quadrangle(i,-17);
					quadrangle(i,-1);
					quadrangle(i,15);
					quadrangle(i,16);
				}
				else if (i + 16 > 30 * 16 && i !== 29 * 16 + 15) {
					quadrangle(i,-17);
					quadrangle(i,-16);
					quadrangle(i,-15);
					quadrangle(i,-1);
					quadrangle(i,1);
				}
				else if (!(i - 16 < 0) && !(i % 16 == 0) && !((i + 1) % 16 == 0) && !(i + 16 >= 480)) {
					quadrangle(i,-17);
					quadrangle(i,-1);
					quadrangle(i,15);
					quadrangle(i,-16);
					quadrangle(i,16);
					quadrangle(i,-15);
					quadrangle(i,1);
					quadrangle(i,17);
				}
			}
		}
	}
	function quadrangle(i,a) {//i所在的格子的下标，周围的位置a
		if(that.gridData[i + a].isMine) {
			that.gridData[i].lclick += 1;
		}
	}
	function getSafeArea() {
		var x = Number(this.style.left.replace('px','')) / that.width;
		var y = Number(this.style.top.replace('px','')) / that.height;
		for(var j = 0; j < that.gridData.length; j++) {
			if(x == that.gridData[j].x && y == that.gridData[j].y) {
				if(that.gridData[j].lclick == 0) {
					scan(j);
				}
			}
		}
	}
	function scan(i) {
		if(!that.gridData[i].isOpened){
			if(that.gridData[i].lclick !== 0 && that.gridData[i].lclick !== 'mine') {
				return;//设置递归的结束条件
			}
			var arr =[]
			that.gridData[i].isOpened = true;
			switch (i) {
				case 0:
					arr.push(that.gridData[i + 1]);
					arr.push(that.gridData[i + 16]);
					break;
				case 15:
					arr.push(that.gridData[i - 1]);
					arr.push(that.gridData[i + 16]);
					break;
				case 464:
					arr.push(that.gridData[i - 16]);
					arr.push(that.gridData[i + 1]);
					break;
				case 479:
					arr.push(that.gridData[i - 1]);
					arr.push(that.gridData[i - 16]);
					break;
			}
			if(i - 16 < 0 && (i !== 0 && i !== 15)) {
				arr.push(that.gridData[i - 1]);
				arr.push(that.gridData[i + 16]);
				arr.push(that.gridData[i + 1]);
			}
			if(i % 16 == 0 && (i !== 0 && i !== 464)) {
				arr.push(that.gridData[i - 16]);
				arr.push(that.gridData[i + 1]);
				arr.push(that.gridData[i + 16]);
			}
			if((i + 1) % 16 == 0 && (i !== 15 && i !== 479)) {
				arr.push(that.gridData[i - 16]);
				arr.push(that.gridData[i + 16]);
				arr.push(that.gridData[i - 1]);
			}
			if(i + 16 > 480 && i !== 479) {
				arr.push(that.gridData[i - 1]);
				arr.push(that.gridData[i - 16]);
				arr.push(that.gridData[i + 1]);
			}
			if(!(i - 16 < 0) && !(i % 16 == 0) && !((i + 1) % 16 == 0) && !(i + 16 >= 480)) {
				arr.push(that.gridData[i - 1]);
				arr.push(that.gridData[i + 16]);
				arr.push(that.gridData[i + 1]);
				arr.push(that.gridData[i - 16]);
			}
			check(arr);
		}
	}
	function check(arr) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].lclick !== 'mine') {
				elements[arr[i].index].style.backgroundImage = 'url(./image/' + arr[i].lclick + '.gif)';
			}
			scan(arr[i].index);
		}
	}
	window.Grid = Grid;
})(window,undefined);
//测试
// var map = document.querySelector('.map');
// var g = new Grid({map:map});
// g.render();
// var playAgain = document.querySelector('.restart');
// playAgain.onclick = function () {
// 	g.render();
// }
