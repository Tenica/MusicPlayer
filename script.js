const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    }, {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    }, {
        name: 'jacinto-3',
        displayName: 'Front Row (Remix)',
        artist: 'Jacinto Design'
    }
]
//Check if playing
let isPlaying = false
//Play
function playSong(params) {
   isPlaying = true;
   playBtn.classList.replace('fa-play', 'fa-pause')
   playBtn.setAttribute('title', 'Pause')
   music.play() 
}

//Pause
function pauseSong(params) {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

//play or pause event listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()) );

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
//Current Song
let songIndex = 0;

//Next Song
function nextSong() {
   songIndex++;
   if (songIndex > songs.length - 1) {
       songIndex =  0;
   }
   console.log(songIndex);
   loadSong(songs[songIndex]);
   playSong() 
}

//Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong() 
 }
//On load 
loadSong(songs[songIndex])

//Update Progress Bar
function updateProgressBar(e) {
    const {duration, currentTime} = e.srcElement;
    if (isPlaying) {
       
        console.log(duration, currentTime);
        //Update Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
   
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
       
        //Delay switching duration Element to avoid NAN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        
    }
     //Calculate display for current
     const currentMinutes = Math.floor(currentTime / 60);
     console.log('minutes', currentMinutes);
     let currentSeconds = Math.floor(currentTime % 60)
     if (currentSeconds < 10) {
         currentSeconds = `0${currentSeconds}`;
     }
     console.log('seconds', currentSeconds)
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}

//Set Progress Bar
function setProgressBar(e) {
    console.log(e)
    const width = this.clientWidth;
    console.log('width', width)
    const clickX = e.offsetX;
    console.log('clickX', clickX)
    const {duration} = music;
    console.log(clickX / width)
    console.log(clickX / width * duration)
    music.currentTime = (clickX / width * duration)
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)