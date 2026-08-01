/*=====================================================
    fireworks.js
    Grand Inauguration Fireworks
======================================================*/

"use strict";

let fireworks = null;
let fireworksStarted = false;

/*==============================================
    Initialize Fireworks
==============================================*/

function initializeFireworks() {

    const canvas = document.getElementById("fireworksCanvas");

    if (!canvas) {
        console.error("Fireworks canvas not found.");
        return;
    }

    if (typeof Fireworks === "undefined" && typeof FireworksJS === "undefined") {
        console.warn("fireworks-js library not loaded.");
        return;
    }

    // Compatible with UMD builds
    const FireworksClass =
        window.Fireworks?.default ||
        window.Fireworks ||
        window.FireworksJS;

    fireworks = new FireworksClass(canvas, {

        autoresize: true,

        opacity: 0.5,

        acceleration: 1.05,

        friction: 0.96,

        gravity: 1.4,

        particles: 120,

        traceLength: 4,

        traceSpeed: 12,

        explosion: 8,

        intensity: 22,

        flickering: 55,

        lineStyle: "round",

        hue: {
            min: 0,
            max: 60
        },

        delay: {
            min: 18,
            max: 35
        },

        rocketsPoint: {
            min: 20,
            max: 80
        },

        brightness: {
            min: 60,
            max: 100
        },

        decay: {
            min: 0.015,
            max: 0.03
        },

        mouse: {
            click: false,
            move: false,
            max: 1
        }

    });

}

/*==============================================
    Start Fireworks
==============================================*/

function startFireworks() {

    if (!fireworks) {

        initializeFireworks();

    }

    if (!fireworks) return;

    if (fireworksStarted) return;

    fireworksStarted = true;

    fireworks.start();





    // Stop after celebration
    setTimeout(() => {

        stopFireworks();

    }, 16000);

}

/*==============================================
    Stop Fireworks
==============================================*/

function stopFireworks() {

    if (!fireworks) return;

    fireworks.stop();

    fireworksStarted = false;

}

/*==============================================
    Celebration Burst
==============================================*/

function celebrationBurst() {

    if (typeof confetti !== "undefined") {

        confetti({
            particleCount: 120,
            spread: 100,
            origin: { x: 0.2, y: 0.6 }
        });

        confetti({
            particleCount: 120,
            spread: 100,
            origin: { x: 0.8, y: 0.6 }
        });

        confetti({
            particleCount: 180,
            spread: 160,
            origin: { x: 0.5, y: 0.4 }
        });

    }

}

/*==============================================
    Automatic Intro Fireworks
==============================================*/

// window.addEventListener("load", () => {

//     // Give curtains time to start opening
//     setTimeout(() => {

//         startFireworks();

//         celebrationBurst();

//     }, 2500);

// });

/*==============================================
    Window Resize
==============================================*/

window.addEventListener("resize", () => {

    if (fireworks && typeof fireworks.updateSize === "function") {

        fireworks.updateSize();

    }

});

/*==============================================
    Pause when hidden
==============================================*/

document.addEventListener("visibilitychange", () => {

    if (!fireworks) return;

    if (document.hidden) {

        fireworks.stop();

    } else if (fireworksStarted) {

        fireworks.start();

    }

});

/*==============================================
    Expose Helpers
==============================================*/

window.startFireworks = startFireworks;
window.stopFireworks = stopFireworks;
window.celebrationBurst = celebrationBurst;