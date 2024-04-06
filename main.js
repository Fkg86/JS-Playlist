const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

//sira
let index;

//dongu
let loop = true;

//sarki listesi
const songsList = [
  {
    name: "Uzun ince bir yoldayim",
    link: "assets/Uzun İnce Bir Yoldayım.mp3",
    artist: "Asik Veysel",
    image: "assets/asik-veysel.jpg",
  },
  {
    name: "Yerine Sevemem",
    link: "assets/Yerine Sevemem.mp3",
    artist: "Gökhan Kirdar",
    image: "assets/gökhan-kirdar.jpg",
  },
  {
    name: "Kül",
    link: "assets/kül.mp3",
    artist: "Cem Adrian",
    image: "assets/cem-adrian.jpg",
  },
  {
    name: "Seni Yazdim",
    link: "assets/Seni Yazdim.mp3",
    artist: "Müslüm Gürses",
    image: "assets/müslüm-gürses.jpeg",
  },
  {
    name: "Biliyorsun",
    link: "assets/Biliyorsun.mp3",
    artist: "Sezen Aksu",
    image: "assets/sezen-aksu.jpg",
  },
  {
    name: "Muhbir",
    link: "assets/Muhbir.mp3",
    artist: "Mabel Matiz&Sila",
    image: "assets/sila-mabel.jpeg",
  },
  {
    name: "Lan",
    link: "assets/Lan.mp3",
    artist: "Zeynep Bastik",
    image: "assets/zeynep-bastik.jpeg",
  },
  {
    name: "Hatıran Yeter",
    link: "assets/Hatıran Yeter.mp3",
    artist: "Serkan Kaya",
    image: "assets/serkan-kaya.jpeg",
  },
];

//sariki atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration); //240
  };
  playAudio();

  playListContainer.classList.add("hide");
};

//oynatma listesini goster
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//tekrar tiklanildiginda
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = true;
    console.log("tekrar kapatildi");
  } else {
    repeatButton.classList.add("active");
    audio.loop = false;
    console.log("tekrar acildi");
  }
});

//karistirici tiklanildiginda
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = false;
    console.log("karistirma kapali");
  } else {
    shuffleButton.classList.add("active");
    loop = true;
    console.log("karistirma acik");
  }
});

//ilerleme cubuguna tiklanildiginda
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  let coordEnd = event.clientX;
  console.log(coordEnd);

  console.log(progressBar.offsetWidth);
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  playAudio();
});

//zaman tutucu
setInterval(() => {
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

//sarkiyi oynat
const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

//sarkiyi durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//sonraki sarki
const nextSong = () => {
  if (loop) {
    //dongu aciksa
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    //karistirici acikla
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

//onceki sarki
const previousSong = () => {
  pauseAudio();

  if (index > 0) {
    index = index - 1;
  } else {
    index = songsList.length - 1;
  }

  setSong(index);
};

//sarki bittiginde
audio.onended = () => {
  nextSong();
};

//zaman duzenlemesi
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//sarki suresi degistikce
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//sarki listesini olustur
const initPlaylist = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
       onclick="setSong(${i})">
       <div class="playlist-image-container">
        <img src="${songsList[i].image}"/>
       </div>
       <div class="playlist-song-details">
        <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>`;
  }
};

//oynata tiklanildiginda
playButton.addEventListener("click", playAudio);

//dura tiklanildiginda
pauseButton.addEventListener("click", pauseAudio);

//sonrakine gec tiklanildiginda
nextButton.addEventListener("click", nextSong);

//onceye git tiklanilirsa
prevButton.addEventListener("click", previousSong);

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initPlaylist();
};
