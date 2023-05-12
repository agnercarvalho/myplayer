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
    <div><img class="${video.className}-control icontheme" src="./assets/rewind.svg"/></div>
    <div><img class="${video.className}-control icontheme " id="mute-icon" src="./assets/unmuted.svg"/></div>
    <div class="${video.className}-volumeContainer myPlayerVolumeContainer"><div class="${video.className}-myPlayerVolume myPlayerVolume"></div></div>
    </div>`

    const div = document.createElement("div")
    div.classList.add("myPlayerControlsContainer")
    div.innerHTML = playerChild
    player.appendChild(div)
    
    let media = document.querySelector(`.${video.className}-video`)
    createControlsEvents(media, video)
}


function createControlsEvents(media, video){
    let controls = document.querySelectorAll(`.${video.className}-control`)
    console.log(controls)
    videoPlay(media,controls[0],video)
    videoRewind(media,controls[2])
    videoMute(media,controls[3])
    videoVolume(media,video)
    videoSeek(media,video)
}

function videoPlay(media,btn,video){
    // Play / Pause
    console.log(btn)
    btn.addEventListener("click", () => {
        if(media.paused == true){
            media.play()
            document.querySelector("#play-icon").src = "./assets/pause.svg"

            //Progress Bar
            setInterval(() => {
                document.querySelector(`.${video.className}-progress`).style.width = `` + media.currentTime/media.duration * 300 + `px`
            }, 1000);
        }
        else{
            media.pause()
            document.querySelector("#play-icon").src = "./assets/play.svg"
        }
    })
}

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
        media.volume = (e.clientX - e.target.offsetLeft) / document.querySelector(`.${video.className}-volumeContainer`).clientWidth
        volumeBar.style.width = `` + (e.clientX - e.target.offsetLeft) + `px`
    })
}

// Seek
function videoSeek(media, video){
    let seek = document.querySelector(`.${video.className}-progressContainer`)
    seek.addEventListener("click", e => {
        media.currentTime = ((e.clientX - e.target.offsetLeft) * media.duration ) / seek.clientWidth
    })
}
