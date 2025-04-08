

let song = document.querySelector("#song");
let playBtn = document.querySelector("#play-button");

playBtn.addEventListener('click', function () {
    song.play();
})

song.onloadeddata = function(){
    playBtn.style.visibility = "visible";
}

