/*名师、名校、名生的轮播*/
(function() {
    var oLis = document.querySelectorAll('#slider1 li')
    var oSlideTabs = document.querySelectorAll('.slide_tabs li')
    var index = 0

    //下标点击哪个哪个就显示对应的文字
    for (let i = 0; i < oLis.length; i++) {
        oSlideTabs[i].onclick = function() {
            for (var j = 0; j < oLis.length; j++) {
                oLis[j].className = ''
                oSlideTabs[j].classList.remove('slide_here')
            }
            oLis[i].className = 'active'
            oSlideTabs[i].classList.add('slide_here')
            index = i
        }
    }

    //轮播
    //定时器的定时时间为8000
    setInterval(function() {
        ++index > oLis.length - 1 && (index = 0)
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].className = ''
            oSlideTabs[i].classList.remove('slide_here')
        }
        oLis[index].className = 'active'
        oSlideTabs[index].classList.add('slide_here')
    }, 8000)
})();


/*背景轮播图*/
(function() {
    var oBgLis = document.querySelectorAll('.topimg .slick-track li')
    var oLiDots = document.querySelectorAll('.topimg .slick-dots li')
    var index = 0
    var timeId

    //定时器的定时时间为8000，这个为定时器启动函数
    function star() {
        timeId = setInterval(function() {
            ++index > oBgLis.length - 1 && (index = 0)
            for (var i = 0; i < oBgLis.length; i++) {
                oBgLis[i].classList.remove('active')
                oLiDots[i].classList.remove('active')
            }
            oBgLis[index].className = 'active'
            oLiDots[index].className = 'active'
        }, 8000)
    }
    star()

    for (let j = 0; j < oLiDots.length; j++) {
        oLiDots[j].onclick = function() {
            clearInterval(timeId)
            for (var i = 0; i < oBgLis.length; i++) {
                oBgLis[i].classList.remove('active')
                oLiDots[i].classList.remove('active')
            }
            oBgLis[j].className = 'active'
            oLiDots[j].className = 'active'
            index = j
            star()
        }
    }
})();