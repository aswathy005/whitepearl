/*=====================================================
    particles.js
    Premium Golden Particles
======================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    if (typeof tsParticles === "undefined") {

        console.warn("tsParticles library not loaded.");

        return;

    }

    tsParticles.load("particles-js", {

        fullScreen: {
            enable: false
        },

        background: {
            color: {
                value: "transparent"
            }
        },

        fpsLimit: 60,

        detectRetina: true,

        particles: {

            number: {
                value: 90,
                density: {
                    enable: true,
                    area: 900
                }
            },

            color: {
                value: [
                    "#FFD700",
                    "#FFE55C",
                    "#FFF8DC",
                    "#FFC107"
                ]
            },

            shape: {
                type: [
                    "circle",
                    "star"
                ]
            },

            opacity: {

                value: {
                    min: 0.2,
                    max: 0.8
                },

                animation: {
                    enable: true,
                    speed: 0.8,
                    minimumValue: 0.2,
                    sync: false
                }

            },

            size: {

                value: {
                    min: 1,
                    max: 5
                },

                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 1,
                    sync: false
                }

            },

            links: {

                enable: true,

                distance: 160,

                color: "#FFD700",

                opacity: 0.18,

                width: 1

            },

            move: {

                enable: true,

                speed: 1.2,

                direction: "none",

                random: true,

                straight: false,

                outModes: {

                    default: "out"

                },

                attract: {

                    enable: false

                }

            }

        },

        interactivity: {

            detectsOn: "window",

            events: {

                onHover: {

                    enable: true,

                    mode: [

                        "grab",

                        "bubble"

                    ]

                },

                onClick: {

                    enable: true,

                    mode: "push"

                },

                resize: true

            },

            modes: {

                grab: {

                    distance: 180,

                    links: {

                        opacity: 0.6

                    }

                },

                bubble: {

                    distance: 180,

                    duration: 2,

                    opacity: 1,

                    size: 8

                },

                push: {

                    quantity: 8

                }

            }

        }

    });

});

/*=====================================================
    Extra Floating Gold Sparkles
======================================================*/

function createGoldSparkle() {

    const sparkle = document.createElement("div");

    sparkle.style.position = "fixed";

    sparkle.style.width = "5px";

    sparkle.style.height = "5px";

    sparkle.style.borderRadius = "50%";

    sparkle.style.background = "#FFD700";

    sparkle.style.boxShadow = "0 0 15px gold";

    sparkle.style.left = Math.random() * window.innerWidth + "px";

    sparkle.style.top = window.innerHeight + "px";

    sparkle.style.pointerEvents = "none";

    sparkle.style.zIndex = "1";

    sparkle.style.opacity = "0.9";

    sparkle.style.transition = "transform 10s linear, opacity 10s linear";

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {

        sparkle.style.transform =
            `translateY(-${window.innerHeight + 300}px)
             translateX(${Math.random() * 200 - 100}px)
             scale(${0.4 + Math.random()})`;

        sparkle.style.opacity = "0";

    });

    setTimeout(() => {

        sparkle.remove();

    }, 10000);

}

/*=====================================================
    Generate Sparkles Continuously
======================================================*/

setInterval(() => {

    createGoldSparkle();

}, 350);

/*=====================================================
    Mouse Glow
======================================================*/

const mouseGlow = document.createElement("div");

mouseGlow.style.position = "fixed";
mouseGlow.style.width = "140px";
mouseGlow.style.height = "140px";
mouseGlow.style.borderRadius = "50%";
mouseGlow.style.pointerEvents = "none";
mouseGlow.style.background =
"radial-gradient(circle, rgba(255,215,0,.35), transparent 70%)";
mouseGlow.style.transform = "translate(-50%,-50%)";
mouseGlow.style.zIndex = "2";
mouseGlow.style.transition = "left .08s linear, top .08s linear";

document.body.appendChild(mouseGlow);

document.addEventListener("mousemove", (e) => {

    mouseGlow.style.left = e.clientX + "px";
    mouseGlow.style.top = e.clientY + "px";

});

/*=====================================================
    Golden Pulse
======================================================*/

setInterval(() => {

    document.documentElement.style.setProperty(

        "--gold",

        Math.random() > .5 ? "#FFD700" : "#FFC107"

    );

}, 5000);

console.log("Premium Golden Particles Loaded");