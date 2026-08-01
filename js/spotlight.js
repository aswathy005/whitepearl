/*=====================================================
    spotlight.js
    Premium Moving Spotlight
======================================================*/

"use strict";

const spotlight = document.querySelector(".spotlight");

let spotlightMouseX = window.innerWidth / 2;
let spotlightMouseY = window.innerHeight / 2;

let currentX = spotlightMouseX;
let currentY = spotlightMouseY;

let autoAngle = 0;
let userActive = false;
let userTimer = null;

/*=====================================================
    Track Mouse
======================================================*/

document.addEventListener("mousemove", (e) => {

    spotlightMouseX = e.clientX;
    spotlightMouseY = e.clientY;

    userActive = true;

    clearTimeout(userTimer);

    userTimer = setTimeout(() => {

        userActive = false;

    }, 3000);

});

/*=====================================================
    Spotlight Animation
======================================================*/

function animateSpotlight() {

    if (!spotlight) {

        requestAnimationFrame(animateSpotlight);
        return;

    }

    if (!userActive) {

        autoAngle += 0.003;

        spotlightMouseX =
            window.innerWidth / 2 +
            Math.cos(autoAngle) * 350;

        spotlightMouseY =
            window.innerHeight / 2 +
            Math.sin(autoAngle * 1.3) * 180;

    }

    currentX += (spotlightMouseX - currentX) * 0.06;
    currentY += (spotlightMouseY - currentY) * 0.06;

    spotlight.style.background = `
        radial-gradient(
            circle at ${currentX}px ${currentY}px,
            rgba(255,255,255,.18) 0%,
            rgba(255,230,120,.14) 12%,
            rgba(255,215,0,.08) 22%,
            rgba(255,215,0,.04) 32%,
            transparent 45%
        )
    `;

    requestAnimationFrame(animateSpotlight);

}

animateSpotlight();

/*=====================================================
    Logo Highlight
======================================================*/

const logo = document.querySelector(".logo");

if (logo) {

    setInterval(() => {

        logo.animate([

            {

                filter:
                "drop-shadow(0 0 25px gold)"

            },

            {

                filter:
                "drop-shadow(0 0 55px #FFD700)"

            },

            {

                filter:
                "drop-shadow(0 0 25px gold)"

            }

        ], {

            duration: 2500,

            easing: "ease-in-out"

        });

    }, 2600);

}

/*=====================================================
    Glass Card Reflection
======================================================*/

const card = document.querySelector(".glass-card");

if (card) {

    document.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 8;

        const rotateX =
            ((y / rect.height) - 0.5) * -8;

        card.style.transform = `
            perspective(1400px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });

    document.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1400px)
            rotateX(0deg)
            rotateY(0deg)
        `;

    });

}

/*=====================================================
    Random Gold Flashes
======================================================*/

function createFlash() {

    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.pointerEvents = "none";
    flash.style.left = Math.random() * window.innerWidth + "px";
    flash.style.top = Math.random() * window.innerHeight + "px";

    const size = 120 + Math.random() * 220;

    flash.style.width = size + "px";
    flash.style.height = size + "px";

    flash.style.borderRadius = "50%";

    flash.style.background =
        "radial-gradient(circle, rgba(255,215,0,.18), transparent 70%)";

    flash.style.filter = "blur(25px)";
    flash.style.zIndex = "1";

    document.body.appendChild(flash);

    flash.animate([

        {

            opacity: 0

        },

        {

            opacity: 1

        },

        {

            opacity: 0

        }

    ], {

        duration: 2500,

        easing: "ease-in-out"

    });

    setTimeout(() => {

        flash.remove();

    }, 2500);

}

setInterval(createFlash, 5000);

/*=====================================================
    Window Resize
======================================================*/

window.addEventListener("resize", () => {

    spotlightMouseX = window.innerWidth / 2;
    spotlightMouseY = window.innerHeight / 2;

});

/*=====================================================
    Console
======================================================*/

console.log("💡 Premium Spotlight Loaded");