"use strict";

const audio = document.getElementById("background-music");
const playPauseButton = document.getElementById("play-pause-button");
const playIcon = document.getElementById("play-music");
const pauseIcon = document.getElementById("pause-music");

let isPlaying = false;

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
        isPlaying = false;
    } else {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                isPlaying = true;
            }).catch(error => {
                console.log("Audio playback failed:", error);
                playIcon.classList.remove("hidden");
                pauseIcon.classList.add("hidden");
                isPlaying = false;
            });
        }
    }
}

playPauseButton.addEventListener("click", togglePlayPause);

audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    audio.play().catch(e => console.log("Auto replay failed:", e));
});

var swiper = new Swiper(".swiper", {
    grabCursor: true,
    initialSlide: 2,
    centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    speed: 1000,
    freeMode: false,
    mousewheel: {
        thresholdDelta: 30,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

const slides = document.querySelectorAll('.swiper-slide');
slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        swiper.slideTo(index);
    });
});

particlesJS("particles-js", {
    particles: {
        number: {
            value: 180,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.3,
            random: false,
            anim: {
                enable: false,
                speed: 4,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: false,
        },
        move: {
            enable: true,
            speed: 0.4,
            direction: "right",
            random: true,
            straight: false,
            out_mode: "none",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: false,
            },
            onclick: {          
                enable: false,
            },
            resize: true,
        },
    },
    retina_detect: true,
});

document.body.addEventListener('click', function initAudio() {
    if (!isPlaying) {
        audio.play().then(() => {
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
            isPlaying = true;
        }).catch(e => console.log('Audio play failed:', e));
    }
    document.body.removeEventListener('click', initAudio);
}, { once: true });