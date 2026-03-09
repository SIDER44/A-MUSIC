const results = document.getElementById("results")

const trending = document.getElementById("trending")

const audio = document.getElementById("audio")

const title = document.getElementById("title")

const cover = document.getElementById("cover")

/* SEARCH */

async function search(){

let q = document.getElementById("searchBox").value

let res = await fetch(`/api/search?q=${q}`)

let data = await res.json()

results.innerHTML=""

data.forEach(song=>{

let div=document.createElement("div")

div.className="song"

div.innerHTML=`

<img src="${song.artworkUrl100}">

<div>

<b>${song.trackName}</b>

<br>

${song.artistName}

</div>

<button onclick="play('${song.previewUrl}','${song.trackName}','${song.artworkUrl100}')">

Play

</button>

`

results.appendChild(div)

})

}

/* PLAY */

function play(url,name,img){

audio.src=url

audio.play()

title.innerText=name

cover.src=img

}

/* TRENDING */

async function loadTrending(){

let res = await fetch("/api/trending")

let data = await res.json()

data.slice(0,10).forEach(song=>{

let div=document.createElement("div")

div.className="song"

div.innerHTML=`

<img src="${song.album.cover_small}">

<div>

<b>${song.title}</b>

<br>

${song.artist.name}

</div>

<button onclick="play('${song.preview}','${song.title}','${song.album.cover_small}')">

Play

</button>

`

trending.appendChild(div)

})

}

loadTrending()
