//二级导航栏
(function() {
    var oLis = document.querySelectorAll('#nav .secondNav')
    for (let i = 0; i < oLis.length; i++) {
        oLis[i].onmouseenter = function() {
            oLis[i].children[1].style.display = 'block'
        }
        oLis[i].onmouseleave = function() {
            oLis[i].children[1].style.display = 'none'
        }
    }
})();