let audio = document.querySelector('._audio');
let previewSong = document.querySelector('._previewSong');
let previewSinger = document.querySelector('._previewSinger');
let previewImg = document.querySelector('._previewImg');
let playlistSongs = document.querySelectorAll('._playlistSong');
let playlist = document.querySelector('._playlist');
let buttonPlay = document.querySelector('._buttonPlay');
let buttonMute = document.querySelector('._buttonMute');
let buttonShuffle = document.querySelector('._buttonShuffle');
let buttonRepeat = document.querySelector('._buttonRepeat');
let timetrack = document.querySelector('._timetrack');
let timetrackRect = timetrack.getBoundingClientRect().x - 6;
let requestID;
let width = 0;
let trackList = {};
let fragment;

// AJAX

let request = new XMLHttpRequest();
request.open('GET', 'playlist.json');
request.onload = function() {
    if(request.readyState === 4 && request.status === 200) {
        return saveResponse(JSON.parse(request.responseText).playlist);
    }
}

request.send();

function saveResponse(list) {
    for (let key in list) {
        trackList[key] = list[key];
    };
    return trackList;
}

// Default view
console.log(trackList);
console.log(trackList[0]);
/*fragment = document.createDocumentFragment();
for (let track in trackList) {
    console.log(1);
    let template = document.querySelector('#tplItem').content.cloneNode('true');
    template.querySelector('._playlistSong').innerHTML = trackList[track].track;
    template.querySelector('._playlistDuration').innerHTML = '0:00';
    console.log(template);
    fragment.appendChild(template);
};

document.querySelector('._playlist').appendChild(fragment);*/
/*previewSong.innerHTML = list[0].track;
previewSinger.innerHTML = list[0].author;
previewImg.src = (list[0].image == null) ? 'img/placeholder.png' : `img/${list[0].image}`;
audio.src = `track/${list[0].file}`;*/

// BUTTONS

// Play

buttonPlay.addEventListener('click', function(e) {
    e.preventDefault();
    if (audio.paused) {
        audio.play();
        animate(function(timePassed) {
            timetrack.style.width = parseFloat(width) + timePassed / (audio.duration * 1000 / parseFloat(timetrackRect)) + 'px';
        }, audio.duration * 1000);
        audio.addEventListener('ended', function() {
            buttonPlay.classList.toggle('button__active');
        })
    } else {
        audio.pause();
        cancelAnimationFrame(requestID);
        width = timetrack.style.width;
    };
    this.classList.toggle('button__active');
});

function animate(drop, duration) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if ((timePassed > duration) || (audio.currentTime == audio.duration)) timePassed = duration;
        drop(timePassed);
        if (timePassed < duration) {
            requestID = requestAnimationFrame(animate);
        }
    });
}

// Mute

buttonMute.addEventListener('click', function(e) {
    e.preventDefault();
    if (audio.muted) {
        audio.muted = false;
    } else {
        audio.muted = true;
    }
    this.classList.toggle('button__active');
});

// Shuffle

buttonShuffle.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('button__active');
});

// Repeat

buttonRepeat.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('button__active');
});

// Timeframe

timetrack.addEventListener('click', function(e) {
    e.preventDefault();
});

timeframe.addEventListener('click', function(e) {
    e.preventDefault();
    width = timetrack.style.width = e.offsetX + 'px';
    audio.currentTime = audio.duration * e.offsetX / timetrackRect;
});

playlist.addEventListener('click', function(e) {
    console.log(e.target.closest('._playlistItem').innerText);
});
