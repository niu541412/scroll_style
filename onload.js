document.addEventListener("DOMContentLoaded", function () {
    const config = {
        backgroundColor: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
        opacity: 0.6,
        borderRadius: '3px',
        bar_width: '6px',
        left: '19px',
        top: '20px'
    };

    const rand = Math.floor(config.backgroundColor.length * Math.random());
    const timeoutSec = 500;

    document.body.insertAdjacentHTML('beforeend', '<div class="wsx_fade"></div><div class="wsx_scroll"><div class="wsx_scroll_bar"></div></div>');
    document.querySelector('.wsx_scroll_bar').style.cssText = `
        background-color: ${config.backgroundColor[rand]};
        opacity: ${config.opacity};
        border-radius: ${config.borderRadius};
        width: ${config.bar_width};
        left: ${config.left};
    `;

    document.body.insertAdjacentHTML('beforeend', '<div class="niu_fade"></div><div class="niu_scroll"><div class="niu_scroll_bar"></div></div>');
    document.querySelector('.niu_scroll_bar').style.cssText = `
        background-color: ${config.backgroundColor[rand]};
        opacity: ${config.opacity};
        border-radius: ${config.borderRadius};
        height: ${config.bar_width};
        top: ${config.top};
    `;

    var content = document.documentElement || document.body;
    var change_y = window.innerHeight;
    var scrollShow_y = false;
    var wsx_t;
    var change_x = window.innerWidth;
    var scrollShow_x = false;
    var niu_t;

    function upScrollHeight() {
        var full_win = Array.from(document.querySelectorAll("*")).some(function (el) {
            var cs = getComputedStyle(el);
            return (cs.position === "fixed" || cs.position === "static") &&
                el.type === "application/x-shockwave-flash" &&
                cs.height === window.innerHeight + "px" &&
                parseInt(cs.width, 10) >= window.innerWidth;
        });

        clearTimeout(wsx_t);
        clearTimeout(niu_t);
        var wHeight = document.documentElement.clientHeight;
        var wWidth = document.documentElement.clientWidth;
        var dHeight = document.documentElement.scrollHeight;
        var dWidth = document.documentElement.scrollWidth;
        var tmpScroll_y = document.querySelector('.wsx_scroll');
        var tmpScroll_x = document.querySelector('.niu_scroll');

        if (dHeight <= wHeight || full_win) {
            if (scrollShow_y) {
                tmpScroll_y.style.display = 'none';
            }
            scrollShow_y = false;
        } else {
            tmpScroll_y.style.cssText += `
                display: block;
                opacity: 1;
                pointer-events: none;
            `;
            scrollShow_y = true;
        }
        if (dWidth <= wWidth || full_win) {
            if (scrollShow_x) {
                tmpScroll_x.style.display = 'none';
            }
            scrollShow_x = false;
        } else {
            tmpScroll_x.style.cssText += `
                display: block;
                opacity: 1;
                pointer-events: none;
            `;
            scrollShow_x = true;
        }
        var scrollHeight = Math.max(wHeight / dHeight * wHeight, 30);
        var scrollWidth = Math.max(wWidth / dWidth * wWidth, 30);
        var top = (document.documentElement.scrollTop || document.body.scrollTop) / (dHeight - wHeight) * (wHeight - scrollHeight);
        tmpScroll_y.style.top = top + 'px';
        tmpScroll_y.style.height = scrollHeight + 'px';
        var left = (document.documentElement.scrollLeft || document.body.scrollLeft) / (dWidth - wWidth) * (wWidth - scrollWidth);
        tmpScroll_x.style.left = left + 'px';
        tmpScroll_x.style.width = scrollWidth + 'px';

        wsx_t = setTimeout(function () {
            tmpScroll_y.style.cssText += `
                opacity: 0;
                pointer-events: none;
            `;
            scrollShow_y = false;
        }, timeoutSec);
        niu_t = setTimeout(function () {
            tmpScroll_x.style.cssText += `
                opacity: 0;
                pointer-events: none;
            `;
            scrollShow_x = false;
        }, timeoutSec);
    }

    var init = setInterval(function () {
        if ((change_y !== content.scrollHeight) || (change_x !== content.scrollWidth)) {
            change_y = content.scrollHeight;
            change_x = content.scrollWidth;
            upScrollHeight();
        }
    }, 100);

    window.addEventListener('scroll', function () {
        if (document.documentElement.clientHeight !== document.documentElement.scrollHeight) {
            upScrollHeight();
        }
    });

    window.addEventListener('resize', function () {
        upScrollHeight();
    });

    var always_y;
    var always_x;
    var mousedown_y = false;
    var mousedown_x = false;
    var startY;
    var Y;
    var startX;
    var X;

    window.addEventListener('mousemove', function (event) {
        if ((content.clientWidth - event.clientX) < 40) {
            if (!scrollShow_y) {
                upScrollHeight();
            }
            clearTimeout(wsx_t);
            always_y = true;
        } else {
            if (always_y) {
                always_y = false;
                wsx_t = setTimeout(function () {
                    document.querySelector('.wsx_scroll').style.cssText += `
                        opacity: 0;
                        pointer-events: none;
                    `;
                    scrollShow_y = false;
                }, timeoutSec);
            }
        }
        if ((content.clientHeight - event.clientY) < 40) {
            if (!scrollShow_x) {
                upScrollHeight();
            }
            clearTimeout(niu_t);
            always_x = true;
        } else {
            if (always_x) {
                always_x = false;
                niu_t = setTimeout(function () {
                    document.querySelector('.niu_scroll').style.cssText += `
                        opacity: 0;
                        pointer-events: none;
                    `;
                    scrollShow_x = false;
                }, timeoutSec);
            }
        }
        if (mousedown_y) {
            document.querySelector('.wsx_fade').style.pointerEvents = 'auto';
            var endY = event.clientY;
            var top = endY - startY + Y;
            top = Math.max(0, top);
            var max_height = window.innerHeight - document.querySelector('.wsx_scroll').offsetHeight;
            top = Math.min(max_height, top);
            var scroll_top = top / (window.innerHeight - document.querySelector('.wsx_scroll').offsetHeight) * (document.documentElement.scrollHeight - window.innerHeight);
            document.documentElement.scrollTop = document.body.scrollTop = scroll_top;
        }
        if (mousedown_x) {
            document.querySelector('.niu_fade').style.pointerEvents = 'auto';
            var endX = event.clientX;
            var left = endX - startX + X;
            left = Math.max(0, left);
            var max_width = window.innerWidth - document.querySelector('.niu_scroll').offsetWidth;
            left = Math.min(max_width, left);
            var scroll_left = left / (window.innerWidth - document.querySelector('.niu_scroll').offsetWidth) * (document.documentElement.scrollWidth - window.innerWidth);
            document.documentElement.scrollLeft = document.body.scrollLeft = scroll_left;
        }
    });

    window.addEventListener('mousedown', function (event) {
        startY = event.clientY;
        startX = event.clientX;
        Y = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * (window.innerHeight - document.querySelector('.wsx_scroll').offsetHeight);
        X = (document.documentElement.scrollLeft || document.body.scrollLeft) / (document.documentElement.scrollWidth - window.innerWidth) * (window.innerWidth - document.querySelector('.niu_scroll').offsetWidth);

        if ((content.clientWidth - event.clientX) < 40 && (content.clientWidth - event.clientX) >= 0) {
            mousedown_y = true;
            document.onselectstart = function () {
                return false;
            };
        }
        if ((content.clientHeight - event.clientY) < 40 && (content.clientHeight - event.clientY) >= 0) {
            mousedown_x = true;
            document.onselectstart = function () {
                return false;
            };
        }
    });

    window.addEventListener('mouseup', function () {
        document.onselectstart = null;
        mousedown_y = false;
        mousedown_x = false;
        document.querySelector('.wsx_fade').style.pointerEvents = 'none';
        document.querySelector('.niu_fade').style.pointerEvents = 'none';
    });
});
