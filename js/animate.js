function animate(element,target) {
		if(element.timerId) {
			clearInterval(element.timerId);
			element.timerId = null;
		}
		var step = 10;
		var time = 60;
		var current = element.offsetLeft;
		if(current > target) {
			step = -Math.abs(step);
		}
		element.timerId = setInterval(function(){
		 	step += step;
		 	element.style.left = current + step + 'px';
		 	if(Math.abs(current - target) < Math.abs(step)) {
		 		element.style.left = target + 'px';
		 		return;
		 	}
		},time)
}