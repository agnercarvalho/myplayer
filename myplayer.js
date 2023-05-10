function buildPlayer(video){
    let innerHTML = `<div class="${video.className}-mask"><h1 class="${video.className}-texts"></h1></div><video class="${video.className}-video" src="${video.url}"></video>`

    return innerHTML
}

const players = document.querySelectorAll(".myplayer")

myVideos.forEach(video => {
    players.forEach(player => {
        if(player.classList[1] == video.className){
            player.innerHTML = buildPlayer(video)
        }
    })
});

