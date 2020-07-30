import { addZero } from './supScripts.js';

export const videoPlayerInit = () => {
const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoFullscreen = document.querySelector('.video-fullscreen'),
    videoVolume = document.querySelector('.video-volume');


    

    const toggleIcon = () => {
        if (videoPlayer.paused) {
           videoButtonPlay.classList.remove('fa-pause');
           videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60),
            secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60),
            secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent= `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration,
            value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoVolume.value = videoPlayer.volume * 100;
}