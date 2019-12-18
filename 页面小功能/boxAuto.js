  function boxAuto() {
	var oLableA = document.querySelectorAll('.nb-container a'),
		vWidthSum = 0,
		oContainerBox = document.querySelector('.nb-container');
	for(var i = 0; i < oLableA.length; i++) {
		vWidthSum += oLableA[i].offsetWidth + 10;
	}
	oContainerBox.style.minWidth = vWidthSum + 'px';
}
addLoadEvent(boxAuto);