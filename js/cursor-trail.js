/*=====================================================
    cursor-trail.js
    Premium Gold Glitter Cursor Trail
======================================================*/

"use strict";

const TRAIL_COUNT = 40;
const particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

/*==============================================
    Track Mouse Position
==============================================*/

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

/*==============================================
    Create Trail Particles
==============================================*/

for (let i = 0; i < TRAIL_COUNT; i++) {

    const particle = document.createElement("div");

    particle.className = "cursor-particle";

    const size = 4 + Math.random() * 6;

    particle.style.position = "fixed";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9998";

    particle.style.background = `
        radial-gradient(circle,
        #fff 0%,
        #ffe66b 40%,
        #FFD700 70%,
        rgba(255,215,0,.2) 100%)
    `;

    particle.style.boxShadow = `
        0 0 8px #FFD700,
        0 0 18px #FFD700,
        0 0 28px rgba(255,215,0,.5)
    `;

    document.body.appendChild(particle);

    particles.push({

        element: particle,
        x: mouseX,
        y: mouseY,
        vx: 0,
        vy: 0,
        life: Math.random()

    });

}

/*==============================================
    Animation Loop
==============================================*/

function animateTrail() {

    particles.forEach((p, index) => {

        const speed = 0.16 + index * 0.002;

        p.vx += (mouseX - p.x) * speed;
        p.vy += (mouseY - p.y) * speed;

        p.vx *= 0.72;
        p.vy *= 0.72;

        p.x += p.vx;
        p.y += p.vy;

        p.life += 0.05;

        const scale = 0.5 + (Math.sin(p.life) * 0.4);

        p.element.style.transform =
            `translate(${p.x}px, ${p.y}px) scale(${scale})`;

        p.element.style.opacity =
            Math.max(0.2, 1 - (index / TRAIL_COUNT));

    });

    requestAnimationFrame(animateTrail);

}

animateTrail();

/*==============================================
    Gold Glitter Burst
==============================================*/

function createGlitterBurst(x, y) {

    for (let i = 0; i < 16; i++) {

        const sparkle = document.createElement("div");

        sparkle.style.position = "fixed";
        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";
        sparkle.style.width = "6px";
        sparkle.style.height = "6px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.borderRadius = "50%";
        sparkle.style.background = "#FFD700";
        sparkle.style.boxShadow = "0 0 12px gold";
        sparkle.style.zIndex = "9999";

        document.body.appendChild(sparkle);

        const angle = (Math.PI * 2 / 16) * i;
        const distance = 20 + Math.random() * 40;

        sparkle.animate([

            {
                transform: "translate(0,0) scale(1)",
                opacity: 1
            },

            {
                transform: `translate(
                    ${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px
                ) scale(0)`,
                opacity: 0
            }

        ], {

            duration: 700,
            easing: "ease-out"

        });

        setTimeout(() => sparkle.remove(), 700);

    }

}

/*==============================================
    Click Sparkles
==============================================*/

document.addEventListener("click", (e) => {

    createGlitterBurst(e.clientX, e.clientY);

});

/*==============================================
    Cursor Glow
==============================================*/

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "180px";
glow.style.height = "180px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.zIndex = "9997";

glow.style.background = `
radial-gradient(circle,
rgba(255,215,0,.35),
transparent 70%)
`;

glow.style.transform = "translate(-50%,-50%)";
glow.style.transition = "left .08s linear, top .08s linear";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/*==============================================
    Hide Trail on Touch Devices
==============================================*/

if ("ontouchstart" in window) {

    particles.forEach(p => p.element.style.display = "none");

    glow.style.display = "none";

}

console.log("✨ Premium Cursor Trail Loaded");