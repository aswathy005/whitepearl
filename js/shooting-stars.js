/*=====================================================
    shooting-stars.js
    Cinematic Shooting Stars
======================================================*/

"use strict";

const shootingContainer = document.getElementById("shootingStars");

/*==============================================
    Create Background Stars
==============================================*/

function createStar() {

    const star = document.createElement("div");

    star.className = "star";

    const size = Math.random() * 3 + 1;

    star.style.position = "absolute";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.borderRadius = "50%";
    star.style.background = "#ffffff";
    star.style.boxShadow = `
        0 0 8px white,
        0 0 18px gold
    `;

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    star.style.opacity = Math.random();

    star.style.animation = `
        twinkle
        ${2 + Math.random() * 5}s
        infinite
    `;

    shootingContainer.appendChild(star);

}

/*==============================================
    Generate Many Stars
==============================================*/

for(let i = 0; i < 180; i++){

    createStar();

}

/*==============================================
    Shooting Star
==============================================*/

function createShootingStar(){

    const meteor = document.createElement("div");

    meteor.className = "shooting-star";

    const startX = Math.random() * window.innerWidth;

    const startY = Math.random() * (window.innerHeight * 0.35);

    meteor.style.position = "absolute";

    meteor.style.left = startX + "px";

    meteor.style.top = startY + "px";

    meteor.style.width = "220px";

    meteor.style.height = "3px";

    meteor.style.pointerEvents = "none";

    meteor.style.background = `
        linear-gradient(
            90deg,
            rgba(255,255,255,1),
            rgba(255,215,0,.8),
            transparent
        )
    `;

    meteor.style.borderRadius = "999px";

    meteor.style.boxShadow = `
        0 0 10px white,
        0 0 25px gold,
        0 0 50px gold
    `;

    meteor.style.transform = "rotate(35deg)";

    meteor.style.opacity = "1";

    meteor.style.zIndex = "5";

    shootingContainer.appendChild(meteor);

    const distance = 900 + Math.random() * 500;

    meteor.animate(

        [

            {

                transform:`
                translate(0px,0px)
                rotate(35deg)
                `,

                opacity:1

            },

            {

                transform:`
                translate(-${distance}px,
                ${distance}px)
                rotate(35deg)
                `,

                opacity:0

            }

        ],

        {

            duration:1800,

            easing:"ease-out"

        }

    );

    setTimeout(()=>{

        meteor.remove();

    },1900);

}

/*==============================================
    Random Shooting Stars
==============================================*/

function randomMeteor(){

    createShootingStar();

    const delay =

        2000 +

        Math.random()*5000;

    setTimeout(

        randomMeteor,

        delay

    );

}

setTimeout(

    randomMeteor,

    2500

);

/*==============================================
    Twinkle Animation
==============================================*/

const style = document.createElement("style");

style.innerHTML = `

@keyframes twinkle{

0%{

opacity:.2;

transform:scale(.8);

}

50%{

opacity:1;

transform:scale(1.4);

}

100%{

opacity:.2;

transform:scale(.8);

}

}

`;

document.head.appendChild(style);

/*==============================================
    Resize
==============================================*/

window.addEventListener(

    "resize",

    ()=>{

        shootingContainer.innerHTML="";

        for(let i=0;i<180;i++){

            createStar();

        }

    }

);

console.log(

    "Shooting Stars Loaded"

);