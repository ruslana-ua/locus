"use strict";function onYouTubePlayerAPIReady(){let e;var t=document.getElementById("video-youtube__content").dataset.video;e=new YT.Player("video-youtube__content",{videoId:t,playerVars:{},events:{onReady:onYouTubePlayerReady}})}function onYouTubePlayerReady(e){var t=e.target,a=document.getElementById(e.target.getIframe().getAttribute("id"));a.nextElementSibling.addEventListener("click",(function(e){t.playVideo(),this.classList.add("hidden"),a.style.opacity=1}))}var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);