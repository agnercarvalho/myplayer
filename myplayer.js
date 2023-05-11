function buildPlayer(video){
    let innerHTML = `<div class="${video.className}-mask">
                        <h1 class="${video.className}-texts">${video.title}</h1></div>
                        <video class="${video.className}-video" src="${video.url}"></video>`
    return innerHTML
}

function buildControls(video, player){
    let playerChild = `<div class="${video.className}-myPlayerControls myPlayerControls">
    <div><img class="${video.className}-control icontheme" id="play-icon" src="play.svg"/></div>
    <div><div class="${video.className}-control ${video.className}-progress "></div></div>
    <div><img class="${video.className}-control icontheme" src="restart.svg"/></div>
    <div><img class="${video.className}-control icontheme " id="mute-icon" src="notmuted.svg"/><div class="${video.className}-myPlayerVolume"></div></div>
    </div>`

    const div = document.createElement("div")
    div.innerHTML = playerChild
    player.appendChild(div)

    let media = document.querySelector(`.${video.className}-video`)
    const controls = document.querySelectorAll(`.${video.className}-control`)
    
    // Play / Pause
    controls[0].addEventListener("click", () => {
        let a = document.querySelector("#play-icon")
        if(media.paused == true){
            media.play()
            a.src = "./assets/pause.svg"}
        else{
            media.pause()
            a.src = "./assets/play.svg"}
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
            a.src = "./assets/notemuted.svg"}
    })

    // Volume
    let volume = document.querySelector(`.${video.className}-myPlayerVolume`)
    volume.addEventListener("click", e => {
        console.log(e.target)
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

