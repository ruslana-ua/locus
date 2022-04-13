(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    const functions_anchors = document.querySelectorAll('a[href^="#"]');
    for (let anchor of functions_anchors) anchor.addEventListener("click", (function(e) {
        e.preventDefault();
        const goto = anchor.hasAttribute("href") ? anchor.getAttribute("href") : "body";
        document.querySelector(goto).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
    }));
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    var sttElem = document.querySelector(".arrow-up");
    var screanHeight = window.innerHeight;
    var sttScroll = function sttScroll() {
        document.addEventListener("scroll", (function(e) {
            if (screanHeight <= window.scrollY) sttElem.classList.add("arrow-up__active"); else if (e.target.scrollingElement.scrollTop <= screanHeight) {
                sttElem.classList.remove("arrow-up__active");
                sttElem.style.pointerEvents = "auto";
            }
        }));
    };
    var sttClick = function sttClick() {
        sttElem.addEventListener("click", (function() {
            var docHeight = window.scrollY;
            var progress = 0;
            var position = docHeight;
            var speed = 5;
            sttElem.style.pointerEvents = "none";
            var sttAnim = function sttAnim() {
                progress += 1;
                position -= progress * speed;
                window.scrollTo(0, position);
                if (position > 0) requestAnimationFrame(sttAnim);
            };
            requestAnimationFrame(sttAnim);
        }));
    };
    var sttFunc = function sttFunc() {
        sttScroll();
        sttClick();
    };
    document.addEventListener("DOMContentLoaded", sttFunc);
    window["FLS"] = true;
    isWebp();
    menuInit();
})();