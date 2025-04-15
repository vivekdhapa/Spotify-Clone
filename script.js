console.log("Welcome to Spotify")
let songindex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let Progressbar = document.getElementById('Progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let Songs = [
    { songName: "KR$NA-Shut Up", filepath: "1.mp3", coverPath: "image.jpg" },
    { songName: "KR$NA-What's Up", filepath: "2.mp3", coverPath: "image.jpg" },
    { songName: "KR$NA-Stay Away", filepath: "./Songs/3.mp3", coverPath: "image.jpg" },
    { songName: "KR$NA-Role Model", filepath: "./Songs/4.mp3", coverPath: "image.jpg" },
    { songName: "Still Here-Intro", filepath: "5.mp3", coverPath: "image2.jpg" },
    { songName: "What's My Name", filepath: "6.mp3", coverPath: "image2.jpg" },
    { songName: "Fall Off", filepath: "7.mp3", coverPath: "image2.jpg" },
    { songName: "Saza-E-Maut", filepath: "8.mp3", coverPath: "image2.jpg" },
    { songName: "Dream", filepath: "9.mp3", coverPath: "image2.jpg" },
    { songName: "Roll Up", filepath: "10.mp3", coverPath: "image2.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = Songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = Songs[i].songName;
});   

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    Progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(Progress);
    Progressbar.value = Progress;
})

Progressbar.addEventListener('change', () => {
    audioElement.currentTime = Progressbar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-curcle')
        
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-play')) {
            makeAllPlays();
            songindex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `${songindex + 1}.mp3`;
            masterSongName.innerText = Songs[songindex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.currentTime = 1;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songindex >=9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `${songindex + 1}.mp3`;
    masterSongName.innerText = Songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `${songindex + 1}.mp3`;
    masterSongName.innerText = Songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

