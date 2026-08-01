/*=====================================================
    ribbon.js
    Premium Ribbon Cutting Animation
======================================================*/

"use strict";

const ribbonElement = document.querySelector(".ribbon");
const ribbonButton = document.getElementById("cutRibbon");
const ribbonSection = document.getElementById("ribbonSection");
const enterButton = document.getElementById("enterBtn");

const ribbonAudio = document.getElementById("ribbonSound");
const fireworksAudio = document.getElementById("fireworkSound");

let ribbonFinished = false;

/*=====================================================
    Cut Ribbon
======================================================*/

function cutRibbon() {

    if (ribbonFinished) return;

    ribbonFinished = true;

    ribbonButton.disabled = true;

    //----------------------------------
    // Play Ribbon Sound
    //----------------------------------

    if (ribbonAudio) {

        ribbonAudio.currentTime = 0;

        ribbonAudio.play().catch(()=>{});

    }

    //----------------------------------
    // Create Scissors
    //----------------------------------

    createScissors();

    //----------------------------------
    // Delay actual cut
    //----------------------------------

    setTimeout(() => {

        ribbonElement.classList.add("cut");

        createRibbonExplosion();

        createGoldenBurst();

        if (typeof confetti !== "undefined") {

            confetti({

                particleCount:300,

                spread:170,

                origin:{y:.55}

            });

        }

        if (typeof celebrationBurst === "function") {

            celebrationBurst();

        }

        if (typeof startFireworks === "function") {

            startFireworks();

        }

        if (fireworksAudio) {

            fireworksAudio.currentTime = 0;

            fireworksAudio.play().catch(()=>{});

        }

        revealEnterButton();

    },700);

}

/*=====================================================
    Scissors
======================================================*/

function createScissors(){

    const scissors=document.createElement("div");

    scissors.className="scissors";

    scissors.innerHTML=`
        <svg class="scissors-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
            <defs>
                <linearGradient id="goldBladeLeftDyn" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#fff2cc" />
                    <stop offset="50%" stop-color="#d4af37" />
                    <stop offset="100%" stop-color="#8a6f27" />
                </linearGradient>
                <linearGradient id="goldBladeRightDyn" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="50%" stop-color="#edd69a" />
                    <stop offset="100%" stop-color="#aa7c11" />
                </linearGradient>
                <linearGradient id="goldHandleDyn" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#8a6f27" />
                    <stop offset="30%" stop-color="#d4af37" />
                    <stop offset="50%" stop-color="#fff9e6" />
                    <stop offset="70%" stop-color="#d4af37" />
                    <stop offset="100%" stop-color="#8a6f27" />
                </linearGradient>
                <filter id="shadow3dDyn" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6" />
                </filter>
            </defs>
            <g filter="url(#shadow3dDyn)">
                <g class="scissor-piece-behind">
                    <circle cx="78" cy="94" r="14" stroke="url(#goldHandleDyn)" stroke-width="8" fill="none" />
                    <path d="M 78,94 L 60,60" stroke="url(#goldHandleDyn)" stroke-width="8" stroke-linecap="round" />
                    <path d="M 60,60 L 38,18 C 44,32 50,48 56,60 Z" fill="url(#goldBladeRightDyn)" />
                    <path d="M 60,60 L 38,18 L 41,21 L 58,59 Z" fill="rgba(0, 0, 0, 0.2)" />
                </g>
                <g class="scissor-piece-front">
                    <circle cx="42" cy="94" r="14" stroke="url(#goldHandleDyn)" stroke-width="8" fill="none" />
                    <path d="M 42,94 L 60,60" stroke="url(#goldHandleDyn)" stroke-width="8" stroke-linecap="round" />
                    <path d="M 60,60 L 82,18 C 76,32 70,48 64,60 Z" fill="url(#goldBladeLeftDyn)" />
                    <path d="M 60,60 L 82,18 L 79,21 L 62,59 Z" fill="rgba(255, 255, 255, 0.4)" />
                </g>
                <circle cx="60" cy="60" r="5" fill="url(#goldHandleDyn)" stroke="#4d3b0e" stroke-width="0.5" />
                <circle cx="60" cy="60" r="2.5" fill="#4d3b0e" />
            </g>
        </svg>
    `;

    ribbonSection.appendChild(scissors);

    setTimeout(()=>{

        scissors.remove();

    },1200);

}

/*=====================================================
    Ribbon Explosion
======================================================*/

function createRibbonExplosion(){

    for(let i=0;i<30;i++){

        const piece=document.createElement("div");

        piece.style.position="fixed";

        piece.style.left="50%";

        piece.style.top="50%";

        piece.style.width=(6+Math.random()*8)+"px";

        piece.style.height=(16+Math.random()*18)+"px";

        piece.style.background=i%2===0?"#d00000":"gold";

        piece.style.borderRadius="3px";

        piece.style.pointerEvents="none";

        piece.style.zIndex="9999";

        document.body.appendChild(piece);

        const angle=Math.random()*Math.PI*2;

        const distance=100+Math.random()*220;

        piece.animate([

            {

                transform:"translate(-50%,-50%) scale(1)",

                opacity:1

            },

            {

                transform:`
                translate(
                calc(-50% + ${Math.cos(angle)*distance}px),
                calc(-50% + ${Math.sin(angle)*distance}px)
                )
                rotate(${Math.random()*720}deg)
                scale(0)
                `,

                opacity:0

            }

        ],{

            duration:1400,

            easing:"ease-out"

        });

        setTimeout(()=>piece.remove(),1400);

    }

}

/*=====================================================
    Gold Burst
======================================================*/

function createGoldenBurst(){

    for(let i=0;i<60;i++){

        const star=document.createElement("div");

        star.style.position="fixed";

        star.style.left="50%";

        star.style.top="50%";

        star.style.width="5px";

        star.style.height="5px";

        star.style.borderRadius="50%";

        star.style.background="#FFD700";

        star.style.boxShadow="0 0 12px gold";

        star.style.pointerEvents="none";

        star.style.zIndex="9999";

        document.body.appendChild(star);

        const angle=(Math.PI*2/60)*i;

        const distance=80+Math.random()*180;

        star.animate([

            {

                transform:"translate(-50%,-50%)",

                opacity:1

            },

            {

                transform:`
                translate(
                calc(-50% + ${Math.cos(angle)*distance}px),
                calc(-50% + ${Math.sin(angle)*distance}px)
                )
                scale(0)
                `,

                opacity:0

            }

        ],{

            duration:1200,

            easing:"ease-out"

        });

        setTimeout(()=>{

            star.remove();

        },1200);

    }

}

/*=====================================================
    Reveal Enter Button
======================================================*/

function revealEnterButton(){

    setTimeout(()=>{

        ribbonSection.style.transition=".8s";
        ribbonSection.style.opacity=".15";
        ribbonSection.style.transform="scale(.9)";


        enterButton.style.display="inline-flex";

        // Make button clickable
        enterButton.style.position="relative";
        enterButton.style.zIndex="999999";
        enterButton.style.pointerEvents="auto";


        requestAnimationFrame(()=>{

            enterButton.classList.add("show");

        });


    },800);

}

/*=====================================================
    Events
======================================================*/

if(ribbonButton){

    ribbonButton.addEventListener("click",cutRibbon);

}

const bowElement = document.querySelector(".bow");
if (bowElement) {
    bowElement.style.cursor = "pointer";
    bowElement.addEventListener("click", cutRibbon);
}

/*=====================================================
    Export
======================================================*/

window.cutRibbon=cutRibbon;

console.log("🎀 Ribbon Ceremony Ready");

//=====================================================
// ENTER WEBSITE REDIRECT
//=====================================================

//=====================================================
// ENTER WEBSITE REDIRECT
//=====================================================

enterButton.onclick = function(){

    console.log("ENTER WEBSITE CLICKED");


    enterButton.innerHTML="Opening Website...";

    enterButton.disabled=true;


    document.body.classList.add("fadeOut");


    setTimeout(()=>{

        window.location.href="https://technikos.in/";

    },1200);


};