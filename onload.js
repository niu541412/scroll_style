
const styleColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
document.documentElement.style.scrollbarColor = `${styleColors[Math.floor(Math.random() * styleColors.length)]} transparent`;

if (false) {
    document.addEventListener("DOMContentLoaded", function () {
        const config = {
            backgroundColor: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
            opacity: 0.6,
            borderRadius: '3px',
            barWidth: '6px',
            left: '19px',
            top: '20px'
        };
        const rand = Math.floor(config.backgroundColor.length * Math.random());
        console.log(document.body.scrollbarColor, document.documentElement.style.scrollbarColor);
        // document.documentElement.style.scrollbarColor = `${config.backgroundColor[rand]} #a1a5e3`;
        const timeoutSec = 500;

        function createAndAppendElement(tag, className, parent) {
            const el = document.createElement(tag);
            el.className = className;
            parent.appendChild(el);
            return el;
        }

        // Create vertical scroll elements
        const verticalFade = createAndAppendElement('div', 'wsx_fade wsx_vertical_fade', document.body);
        const verticalScroll = createAndAppendElement('div', 'wsx_scroll wsx_vertical_scroll', document.body);
        const verticalScrollBar = createAndAppendElement('div', 'wsx_scroll_bar wsx_vertical_scroll_bar', verticalScroll);

        verticalScrollBar.style.backgroundColor = config.backgroundColor[rand];
        verticalScrollBar.style.opacity = config.opacity;
        verticalScrollBar.style.borderRadius = config.borderRadius;
        verticalScrollBar.style.width = config.barWidth;
        verticalScrollBar.style.left = config.left;

        // Create horizontal scroll elements
        const horizontalFade = createAndAppendElement('div', 'wsx_fade wsx_horizontal_fade', document.body);
        const horizontalScroll = createAndAppendElement('div', 'wsx_scroll wsx_horizontal_scroll', document.body);
        const horizontalScrollBar = createAndAppendElement('div', 'wsx_scroll_bar wsx_horizontal_scroll_bar', horizontalScroll);

        horizontalScrollBar.style.backgroundColor = config.backgroundColor[rand];
        horizontalScrollBar.style.opacity = config.opacity;
        horizontalScrollBar.style.borderRadius = config.borderRadius;
        horizontalScrollBar.style.height = config.barWidth;
        horizontalScrollBar.style.top = config.top;

        let content = document.documentElement || document.body;
        let changeY = window.innerHeight;
        let scrollShowY = false;
        let wsxVerticalTimeout;
        let changeX = window.innerWidth;
        let scrollShowX = false;
        let wsxHorizontalTimeout;

        function upScrollHeight() {
            const fullWin = Array.from(document.querySelectorAll("*")).some(el => {
                const cs = getComputedStyle(el);
                return (cs.position === "fixed" || cs.position === "static") &&
                    el.type === "application/x-shockwave-flash" &&
                    cs.height === window.innerHeight + "px" &&
                    parseInt(cs.width, 10) >= window.innerWidth;
            });

            clearTimeout(wsxVerticalTimeout);
            clearTimeout(wsxHorizontalTimeout);

            const wHeight = document.documentElement.clientHeight;
            const wWidth = document.documentElement.clientWidth;
            const dHeight = document.documentElement.scrollHeight;
            const dWidth = document.documentElement.scrollWidth;

            if (dHeight <= wHeight || fullWin) {
                if (scrollShowY) {
                    verticalScroll.style.display = 'none';
                }
                scrollShowY = false;
            } else {
                verticalScroll.style.display = 'block';
                verticalScroll.style.opacity = '1';
                verticalScroll.style.pointerEvents = 'none';
                scrollShowY = true;
            }

            if (dWidth <= wWidth || fullWin) {
                if (scrollShowX) {
                    horizontalScroll.style.display = 'none';
                }
                scrollShowX = false;
            } else {
                horizontalScroll.style.display = 'block';
                horizontalScroll.style.opacity = '1';
                horizontalScroll.style.pointerEvents = 'none';
                scrollShowX = true;
            }

            const scrollHeight = Math.max(wHeight / dHeight * wHeight, 30);
            const scrollWidth = Math.max(wWidth / dWidth * wWidth, 30);
            const top = (document.documentElement.scrollTop || document.body.scrollTop) / (dHeight - wHeight) * (wHeight - scrollHeight);
            verticalScroll.style.top = `${top}px`;
            verticalScroll.style.height = `${scrollHeight}px`;
            const left = (document.documentElement.scrollLeft || document.body.scrollLeft) / (dWidth - wWidth) * (wWidth - scrollWidth);
            horizontalScroll.style.left = `${left}px`;
            horizontalScroll.style.width = `${scrollWidth}px`;

            wsxVerticalTimeout = setTimeout(() => {
                verticalScroll.style.opacity = '0';
                verticalScroll.style.pointerEvents = 'none';
                scrollShowY = false;
            }, timeoutSec);

            wsxHorizontalTimeout = setTimeout(() => {
                horizontalScroll.style.opacity = '0';
                horizontalScroll.style.pointerEvents = 'none';
                scrollShowX = false;
            }, timeoutSec);
        }

        const initInterval = 200;
        const init = setInterval(() => {
            if (changeY !== content.scrollHeight || changeX !== content.scrollWidth) {
                changeY = content.scrollHeight;
                changeX = content.scrollWidth;
                upScrollHeight();
            }
        }, initInterval);

        window.addEventListener('scroll', upScrollHeight);
        window.addEventListener('resize', upScrollHeight);

        let alwaysY;
        let alwaysX;
        let mousedownY = false;
        let mousedownX = false;
        let startY;
        let Y;
        let startX;
        let X;

        window.addEventListener('mousemove', event => {
            if (event.clientX >= 0 && event.clientY >= 0) {
                if (content.clientWidth - event.clientX < 40) {
                    if (!scrollShowY) {
                        upScrollHeight();
                    }
                    clearTimeout(wsxVerticalTimeout);
                    alwaysY = true;
                } else if (alwaysY) {
                    alwaysY = false;
                    wsxVerticalTimeout = setTimeout(() => {
                        verticalScroll.style.opacity = '0';
                        verticalScroll.style.pointerEvents = 'none';
                        scrollShowY = false;
                    }, timeoutSec);
                }

                if (content.clientHeight - event.clientY < 40) {
                    if (!scrollShowX) {
                        upScrollHeight();
                    }
                    clearTimeout(wsxHorizontalTimeout);
                    alwaysX = true;
                } else if (alwaysX) {
                    alwaysX = false;
                    wsxHorizontalTimeout = setTimeout(() => {
                        horizontalScroll.style.opacity = '0';
                        horizontalScroll.style.pointerEvents = 'none';
                        scrollShowX = false;
                    }, timeoutSec);
                }

                if (mousedownY) {
                    verticalFade.style.pointerEvents = 'auto';
                    const endY = event.clientY;
                    let top = endY - startY + Y;
                    top = Math.max(0, top);
                    const maxHeight = window.innerHeight - verticalScroll.offsetHeight;
                    top = Math.min(maxHeight, top);
                    const scrollTop = top / (window.innerHeight - verticalScroll.offsetHeight) * (document.documentElement.scrollHeight - window.innerHeight);
                    document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
                }

                if (mousedownX) {
                    horizontalFade.style.pointerEvents = 'auto';
                    const endX = event.clientX;
                    let left = endX - startX + X;
                    left = Math.max(0, left);
                    const maxWidth = window.innerWidth - horizontalScroll.offsetWidth;
                    left = Math.min(maxWidth, left);
                    const scrollLeft = left / (window.innerWidth - horizontalScroll.offsetWidth) * (document.documentElement.scrollWidth - window.innerWidth);
                    document.documentElement.scrollLeft = document.body.scrollLeft = scrollLeft;
                }
            }
        });

        window.addEventListener('mousedown', event => {
            startY = event.clientY;
            startX = event.clientX;
            Y = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * (window.innerHeight - verticalScroll.offsetHeight);
            X = (document.documentElement.scrollLeft || document.body.scrollLeft) / (document.documentElement.scrollWidth - window.innerWidth) * (window.innerWidth - horizontalScroll.offsetWidth);

            if (content.clientWidth - event.clientX < 40 && content.clientWidth - event.clientX >= 0) {
                mousedownY = true;
                document.onselectstart = () => false;
            }

            if (content.clientHeight - event.clientY < 40 && content.clientHeight - event.clientY >= 0) {
                mousedownX = true;
                document.onselectstart = () => false;
            }
        });

        window.addEventListener('mouseup', () => {
            document.onselectstart = null;
            mousedownY = false;
            mousedownX = false;
            verticalFade.style.pointerEvents = 'none';
            horizontalFade.style.pointerEvents = 'none';
        });
    });
}