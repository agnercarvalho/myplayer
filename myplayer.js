
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
    <div class="volumeContainer"><div class="${video.className}-myPlayerVolume myPlayerVolume"></div></div>
    </div>`

    const div = document.createElement("div")
    div.classList.add("myPlayerControlsContainer")
    div.innerHTML = playerChild
    player.appendChild(div)
    //Controles criados e adicionados no HTML

    let media = document.querySelector(`.${video.className}-video`)
    const controls = document.querySelectorAll(`.${video.className}-control`)
    
    // Play / Pause
    controls[0].addEventListener("click", () => {
        let a = document.querySelector("#play-icon")
        if(media.paused == true){
            media.play()
            a.src = "./assets/pause.svg"

            //Progress Bar
            setInterval(() => {
                document.querySelector(`.${video.className}-progress`).style.width = `` + media.currentTime/media.duration * 300 + `px`
            }, 1000);
        }
        else{
            media.pause()
            a.src = "./assets/play.svg"
        }
    })

    // Back to beggining
    controls[2].addEventListener("click", () => {
        media.pause()
        media.currentTime = 0
    })

    // Mute / Unmute
    let a = document.querySelector("#mute-icon")
    controls[3].addEventListener("click", () => {
        let b = media.volume
        if(b > 0){
            media.volume = 0
            a.src = "./assets/muted.svg"}
        else{
            media.volume = 1
            a.src = "./assets/unmuted.svg"}
    })

    // Volume
    let volumeBar = document.querySelector(`.${video.className}-myPlayerVolume`)
    const volumeContainer = document.querySelector(`.volumeContainer`)
    volumeContainer.addEventListener("click", e => {
        media.volume = (e.clientX - e.target.offsetLeft) / volumeContainer.clientWidth
        volumeBar.style.width = `` + (e.clientX - e.target.offsetLeft) + `px`
    })

    // Seek
    let seek = document.querySelector(`.${video.className}-progressContainer`)
    seek.addEventListener("click", e => {
        media.currentTime = ((e.clientX - e.target.offsetLeft) * media.duration ) / seek.clientWidth
    })
}

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

