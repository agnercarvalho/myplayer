window.onload = () => {
    console.log("Hola!.This page is loaded!")
};

const players = document.querySelectorAll(".myplayer")

myVideos.forEach(video => {
    players.forEach(player => {
        if(player.classList[1] == video.className){
            player.innerHTML = buildPlayer(video)
        }
        if(video.controls == true){
            buildControls(video, player)
        }
    })
});

// Build the structure of the video container
function buildPlayer(video){
    let innerHTML = `<div class="${video.className}-mask">
                        <h1 class="${video.className}-texts">${video.title}</h1></div>
                        <video class="${video.className}-video" src="${video.url}"></video>`
    return innerHTML
}

// This function creates controlers (html and js) for each video with customized classes defined by the object "video", it also apply their functionalities.
function buildControls(video, player){
    let playerChild = `<div class="${video.className}-myPlayerControls myPlayerControls">
    <div><img class="${video.className}-control icontheme" id="play-icon" src="./assets/play.svg"/></div>
    <div class="${video.className}-progressContainer myPlayerProgressContainer"><div class="${video.className}-control ${video.className}-progress myPlayerProgress"></div></div>
    <div class="${video.className}-time myPlayerTime">0:00:00</div>
    <div><img class="${video.className}-control icontheme" src="./assets/rewind.svg"/></div>
    <div><img class="${video.className}-control icontheme " id="mute-icon" src="./assets/unmuted.svg"/></div>
    <div class="${video.className}-volumeContainer myPlayerVolumeContainer"><div class="${video.className}-myPlayerVolume myPlayerVolume"></div></div>
    </div>`

    
    const div = document.createElement("div")
    div.classList.add("myPlayerControlsContainer")
    div.innerHTML = playerChild
    player.appendChild(div)
    
    let media = document.querySelector(`.${video.className}-video`)
    document.querySelector(`.${video.className}-progressContainer`).style.height = document.querySelector(`.${video.className}-myPlayerControls`).clientHeight + `px`
    document.querySelector(`.${video.className}-volumeContainer`).style.height = document.querySelector(`.${video.className}-myPlayerControls`).clientHeight + `px`
    createControlsEvents(media, video)
}

/*
function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {  
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
      elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { 
  document.webkitExitFullscreen();
} else if (document.msExitFullscreen) { 
  document.msExitFullscreen();}
}
*/

function createControlsEvents(media, video){
    let controls = document.querySelectorAll(`.${video.className}-control`)
    videoPlay(media,controls[0],video)
    videoRewind(media,controls[2])
    videoMute(media,controls[3])
    videoVolume(media,video)
    videoSeek(media,video)
}

function videoTime(media,video) {
        let hour = Math.floor(media.currentTime/3600)
        let min = Math.floor((media.currentTime/60))
        let sec = Math.floor(media.currentTime%60)
        
        document.querySelector(`.${video.className}-time`).innerHTML = hour + ":" + ("00"+ min).slice(-2) + ":" + ("00"+ sec).slice(-2)
}

function videoPlay(media,btn,video){
    // Play / Pause
    btn.addEventListener("click", () => {
        if(media.paused == true){
            media.play()
            document.querySelector("#play-icon").src = "./assets/pause.svg"

            //Progress Bar
            setInterval(() => {
                document.querySelector(`.${video.className}-progress`).style.width = media.currentTime/media.duration * document.querySelector(`.${video.className}-progressContainer`).clientWidth + `px`
                videoTime(media,video)
            }, 1000);
        }
        else{
            media.pause()
            document.querySelector("#play-icon").src = "./assets/play.svg"
        }
    })
}

// Rewind Video
function videoRewind(media,btn){
    // Back to beggining
    btn.addEventListener("click", () => {
        media.pause()
        media.currentTime = 0
    })
}
 
// Mute / Unmute event
function videoMute(media,btn){
    btn.addEventListener("click", () => {
        if(media.volume > 0){
            media.volume = 0
            document.querySelector("#mute-icon").src = "./assets/muted.svg"}
        else{
            media.volume = 1
            document.querySelector("#mute-icon").src = "./assets/unmuted.svg"} 
    })
}

 // Volume
function videoVolume(media,video){
    let volumeBar = document.querySelector(`.${video.className}-myPlayerVolume`)
    document.querySelector(`.${video.className}-volumeContainer`).addEventListener("click", e => {
        media.volume = (e.layerX - e.target.offsetLeft) / document.querySelector(`.${video.className}-volumeContainer`).clientWidth
        volumeBar.style.width = `` + (e.layerX - e.target.offsetLeft) + `px`
    })
}

// Seek
function videoSeek(media, video){
    let seek = document.querySelector(`.${video.className}-progressContainer`)
    seek.addEventListener("click", e => {
        media.currentTime = ((e.layerX - e.target.offsetLeft) * media.duration ) / seek.clientWidth
        document.querySelector(`.${video.className}-progress`).style.width = media.currentTime/media.duration * document.querySelector(`.${video.className}-progressContainer`).clientWidth + `px`
    })
}
