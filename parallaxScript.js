/************************************************************
 * A) Shape IDs for each track
 *    track1 has two shapes. The others have just one for demo.
 ************************************************************/

const trackShapes = {
  track1: ["shapeATrack1", "shapeBTrack1"],
  track2: ["shapeATrack2", "shapeBTrack2"],
  track3: ["shapeATrack3", "shapeBTrack3"],
 track4: ["shapeATrack4", "shapeBTrack4"],
 // track5: ["shapeATrack5", "shapeBTrack5"]
};

/************************************************************
 * B) Define color arrays for each track (optional)
 *    If you want random color picking, keep this; 
 *    otherwise skip coloring entirely.
 ************************************************************/
const trackColors = {
  track1: ["red", "green"],
  track2: [],
  track3: ["orange", "purple"],
  track4: ["#AAF0D1", "#89CFF0"],   // mint / babyblue
  track5: ["#800020", "chartreuse"] // burgundy / chartreuse
};

/************************************************************
 * C) spawnSmokeStack function 
 *    Picks a random shape ID from that track, clones it, 
 *    optionally random-colors it, and animates left.
 ************************************************************/
/**
 * spawnSmokeStack()
 * 
 * Spawns one shape from the track's array at random. 
 * You can optionally pass an array of Y-positions (yOffsets).
 * If yOffsets is provided, we pick the offset at the same index
 * as the chosen shape.
 * 
 * @param {SVGElement} svgRoot - e.g. track1Svg
 * @param {number} scaleFactor - scale the shape
 * @param {number} speedSec    - how many seconds to cross
 * @param {Array<number>} yOffsets - optional array of Y positions,
 *                                   in same order as shape IDs.
 */
function spawnSmokeStack(svgRoot, scaleFactor, speedSec, yOffsets = []) {
  // 1) Identify the track, e.g. "track1Svg" => "track1"
  const trackId = svgRoot.getAttribute("id");
  const shortId = trackId.replace("Svg", "");

  // 2) Which shapes does this track have?
  const possibleShapes = trackShapes[shortId] || [];
  if (!possibleShapes.length) {
    console.warn("No shapes found for track:", shortId);
    return;
  }

  // 3) Pick one shape at random
  const shapeIndex = Math.floor(Math.random() * possibleShapes.length);
  const randomShapeId = possibleShapes[shapeIndex];

  // 4) Grab that shape <g>
  const template = document.getElementById(randomShapeId);
  if (!template) {
    console.warn("No template found for ID:", randomShapeId);
    return;
  }

  // 5) Clone the shape
  const newStack = template.cloneNode(true);
  newStack.removeAttribute("id"); // avoid duplicate IDs in the DOM

  // 6) Append to the <svg>
  svgRoot.appendChild(newStack);

  // 7) Apply random color (if using trackColors)
  // const colors = trackColors[shortId] || ["#000"];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  // newStack.querySelectorAll("path").forEach(path => {
  //   path.setAttribute("fill", randomColor);
  // });

  // 8) Figure out which Y offset to use
  //    If yOffsets[shapeIndex] exists, use it; else fallback to 200.
  const yPos = (yOffsets[shapeIndex] !== undefined) 
    ? yOffsets[shapeIndex] 
    : 200;

  // 9) Position & animate
  gsap.set(newStack, {
    x: 2000,
    y: yPos,
    scale: scaleFactor,
    transformOrigin: "top left"
  });

  gsap.to(newStack, {
    x: -300,
    duration: speedSec,
    ease: "none",
    onComplete: () => {
      newStack.remove();
    }
  });
}

/************************************************************
 * D) Set up intervals for each track (demo)
 ************************************************************/
const track1Svg = document.getElementById("track1Svg");
const track2Svg = document.getElementById("track2Svg");
const track3Svg = document.getElementById("track3Svg");
const track4Svg = document.getElementById("track4Svg");
const track5Svg = document.getElementById("track5Svg");

// Track 1 => picks randomly between shapeATrack1 + shapeBTrack1
//spawnSmokeStack(track1Svg, 1, 1, 150); scale, speed, y value. lower value speeds are faster.

setInterval(() => {
  spawnSmokeStack(track1Svg, 1.0, 1, [0, 700]);
}, 6000);

// Track 2 => single shape
setInterval(() => {
  spawnSmokeStack(track2Svg, 1.0, 3, [450]);
}, 400);

setInterval(() => {
  spawnSmokeStack(track3Svg, 1.2, 6, [320, 175]);
}, 4000); //was 7000

setInterval(() => {
  spawnSmokeStack(track4Svg, 1, 10, [0, 200]);
}, 2000);

setInterval(() => {
  spawnSmokeStack(track5Svg, 1, 5, 550);
}, 9000);

   const rainOverlay = document.querySelector('.rain-overlay');
        const rainSVG = document.querySelector('.rain');
        const lightningFlash = document.querySelector('.lightning-flash');
        let isRaining = false;

        function toggleRain() {
            isRaining = !isRaining;
            rainOverlay.style.opacity = isRaining ? "1" : "0";
            rainSVG.style.opacity = isRaining ? "1" : "0";

            if (isRaining) {
                generateRain();
                triggerLightning();
            } else {
                rainSVG.innerHTML = "";
            }
        }

        function generateRain() {
            rainSVG.innerHTML = "";
            for (let i = 0; i < 50; i++) { // Adjust number of raindrops
                let x = Math.random() * 100;
                let y = Math.random() * 100;
                let drop = document.createElementNS("http://www.w3.org/2000/svg", "line");
                drop.setAttribute("x1", x);
                drop.setAttribute("y1", y);
                drop.setAttribute("x2", x);
                drop.setAttribute("y2", y + 5);
                drop.classList.add("raindrop");
                drop.style.animationDuration = (Math.random() * 0.5 + 0.3) + "s";
                rainSVG.appendChild(drop);
            }
        }

        function triggerLightning() {
            if (!isRaining) return;
            let delay = Math.random() * 10000 + 5000; // Random flash every 5-15 sec
            setTimeout(() => {
                lightningFlash.style.opacity = "1";
                setTimeout(() => {
                    lightningFlash.style.opacity = "0";
                    triggerLightning(); // Loop while raining
                }, 200);
            }, delay);
        }

        // Rain cycle every 3 minutes (1.5 min rain, 1.5 min clear)
        setInterval(toggleRain, 90000); 

        // Start rain initially
        toggleRain();