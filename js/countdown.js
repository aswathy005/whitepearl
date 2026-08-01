/*=====================================================
    countdown.js
    Grand Inauguration Countdown
======================================================*/

"use strict";

/*=====================================================
    CONFIGURATION
======================================================*/

// Format: YYYY-MM-DDTHH:MM:SS
// Example: 2026-12-31T10:00:00

const TARGET_DATE = new Date("2026-08-01T13:45:00").getTime();

/*=====================================================
    ELEMENTS
======================================================*/

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/*=====================================================
    PAD NUMBER
======================================================*/

function pad(value) {

    return value.toString().padStart(2, "0");

}

/*=====================================================
    Animate Number
======================================================*/

function animateNumber(element) {

    element.animate(

        [

            {
                transform: "scale(1)"
            },

            {
                transform: "scale(1.18)"
            },

            {
                transform: "scale(1)"
            }

        ],

        {

            duration: 350,

            easing: "ease-out"

        }

    );

}

/*=====================================================
    Update Countdown
======================================================*/

let lastSecond = -1;

function updateCountdown() {

    const now = Date.now();

    const distance = TARGET_DATE - now;

    /*-----------------------------
        Countdown Finished
    ------------------------------*/

    if (distance <= 0) {

        clearInterval(countdownInterval);

        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";

        // Enable ribbon cutting
        enableRibbonButton();

        showLaunchMessage();

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(

        (distance % (1000 * 60 * 60 * 24))

        /

        (1000 * 60 * 60)

    );

    const minutes = Math.floor(

        (distance % (1000 * 60 * 60))

        /

        (1000 * 60)

    );

    const seconds = Math.floor(

        (distance % (1000 * 60))

        /

        1000

    );

    daysEl.innerHTML = pad(days);
    hoursEl.innerHTML = pad(hours);
    minutesEl.innerHTML = pad(minutes);
    secondsEl.innerHTML = pad(seconds);

    if (seconds !== lastSecond) {

        animateNumber(secondsEl);

        lastSecond = seconds;

    }

}

/*=====================================================
    Enable Ribbon Button
======================================================*/

function enableRibbonButton(){

    const ribbonButton = document.getElementById("cutRibbon");

    if (ribbonButton) {

        ribbonButton.disabled = false;

        ribbonButton.classList.add("enabled");

        console.log("🎀 Ribbon Button Enabled");

    }

}

/*=====================================================
    Countdown Finished - Show Live Message & FX
======================================================*/

function showLaunchMessage() {

    const countdown = document.getElementById("countdown");

    if (countdown) {
        countdown.innerHTML = `
            <div style="width:100%;text-align:center">
                <h2 style="
                    color:#FFD700;
                    font-size:42px;
                    margin-bottom:10px;
                ">
                    🎉 WE ARE LIVE!
                </h2>
                <p style="
                    font-size:20px;
                    color:white;
                ">
                    Welcome to our Grand Opening Celebration
                </p>
            </div>
        `;
    }

    // Trigger Fireworks
    if (typeof startFireworks === "function") {

        startFireworks();

    }

    // Trigger Confetti
    if (typeof confetti !== "undefined") {

        const duration = 6000;

        const end = Date.now() + duration;

        const interval = setInterval(() => {

            if (Date.now() > end) {

                clearInterval(interval);

                return;

            }

            confetti({

                particleCount: 35,

                spread: 120,

                origin: {

                    x: Math.random(),

                    y: Math.random() * 0.6

                }

            });

        }, 250);

    }

}

/*=====================================================
    Start Countdown
======================================================*/

let countdownInterval;

updateCountdown();

countdownInterval = setInterval(updateCountdown,1000);

/*=====================================================
    Console
======================================================*/

console.log("⏳ Countdown Started");