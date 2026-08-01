"use strict";

/*=========================================
  MUSIC CONTROLLER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const bgMusic = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicToggle");
    const backgroundVideo = document.getElementById("bgVideo");

    musicButton.textContent = "🔊";
    musicButton.classList.add("active");

    let musicEnabled = false;

    window.addEventListener("load", () => {

    bgMusic.volume = 0.35;

    bgMusic.play().then(() => {

        musicEnabled = true;

    }).catch(() => {

        // Browser blocked autoplay.
        // Keep the button showing as active.
        musicEnabled = false;

    });

});

    if (backgroundVideo) {
        backgroundVideo.playbackRate = 0.9;
    }

    // Try autoplay (may be blocked by browser)
    bgMusic.play()
        .then(() => {
            musicEnabled = true;
            musicButton.textContent = "🔊";
        })
        .catch(() => {
            musicEnabled = false;
            musicButton.textContent = "🔇";
        });

    musicButton.addEventListener("click", () => {

        if (musicEnabled) {

            bgMusic.pause();
            musicEnabled = false;
            musicButton.textContent = "🔇";

        } else {

            bgMusic.play().then(() => {
                musicEnabled = true;
                musicButton.textContent = "🔊";
            }).catch(err => {
                console.log("Music blocked:", err);
            });

        }

    });

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            bgMusic.pause();

        } else if (musicEnabled) {

            bgMusic.play().catch(() => {});

        }

    });

    // First user interaction starts music if autoplay was blocked
    document.addEventListener("click", function startMusic() {

    bgMusic.volume = 0.35;

    bgMusic.play().catch(() => {});

    document.removeEventListener("click", startMusic);

});

    console.log("🎵 Music Controller Loaded");

});