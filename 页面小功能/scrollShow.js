function scrollShow() {
    var oRightNav = document.querySelector('.right-nav'),
        oRightNavLabel = document.querySelectorAll('.right-nav a');
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        if ((document.documentElement.clientWidth + 17) >= 768) {
            if(scrollTop > 650) {
                oRightNav.style.display = "block";
            }else {
                oRightNav.style.display = "none";
            }
        }
    }
    for(var i = 0; i < oRightNavLabel.length - 1; i++) {
        (function(i) {
            oRightNavLabel[i].onmouseover = function () {
               change(i);
            }
            oRightNavLabel[i].onmouseout = function () {
                removeClass(i)
            }
        })(i);
    }
    oRightNavLabel[oRightNavLabel.length - 1].onclick = function () {
        document.body.scrollTop = 0;
    }
    function change(i) {
        if(i== 0)
        oRightNavLabel[i].classList.add("g-personalCenter");
        if(i== 1)
        oRightNavLabel[i].classList.add("g-shoppingCar");
        if(i== 2)
        oRightNavLabel[i].classList.add("g-myOrder");
        if(i== 3)
        oRightNavLabel[i].classList.add("g-myCoupon");
        if(i== 4)
        oRightNavLabel[i].classList.add("g-discount");
        if(i== 5)
        oRightNavLabel[i].classList.add("g-history");
        if(i== 6)
        oRightNavLabel[i].classList.add("g-myCollect");
        if(i== 7)
        oRightNavLabel[i].classList.add("g-service");
    }
    function removeClass(i) {
        if(i== 0)
        oRightNavLabel[i].classList.remove("g-personalCenter");
        if(i== 1)
        oRightNavLabel[i].classList.remove("g-shoppingCar");
        if(i== 2)
        oRightNavLabel[i].classList.remove("g-myOrder");
        if(i== 3)
        oRightNavLabel[i].classList.remove("g-myCoupon");
        if(i== 4)
        oRightNavLabel[i].classList.remove("g-discount");
        if(i== 5)
        oRightNavLabel[i].classList.remove("g-history");
        if(i== 6)
        oRightNavLabel[i].classList.remove("g-myCollect");
        if(i== 7)
        oRightNavLabel[i].classList.remove("g-service");
    }
}
addLoadEvent(scrollShow);