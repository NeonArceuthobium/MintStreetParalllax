
//************************************************************
// A) Shape IDs per track
//************************************************************
const trackShapes = {
  track1: ["shapeATrack1", "shapeBTrack1", "shapeCTrack1"],
  track2: ["shapeATrack2", "shapeATrack2", "shapeBTrack2", "shapeBTrack2", "shapeCTrack2"],
  track3: ["shapeATrack3", "shapeATrack3", "shapeBTrack3", "shapeBTrack3", "shapeCTrack3", "shapeDTrack3", "shapeETrack3", "shapeFTrack3"],
  track4: ["shapeATrack4", "shapeBTrack4", "shapeCTrack4", "shapeDTrack4", "shapeETrack4", "shapeFTrack4", "shapeGTrack4", "shapeATrack4", "shapeBTrack4", "shapeCTrack4", ],
  // track5: ["shapeATrack5", "shapeBTrack5"]
};

//************************************************************
// B) Optional color arrays
//************************************************************
const trackColors = {
  track1: ["red", "green"],
  track2: [],
  track3: ["orange", "purple"],
  track4: ["#AAF0D1", "#89CFF0"],
  track5: ["#800020", "chartreuse"]
};

//------------------------------------------------------------
// Track the *last spawned building* for each track
// so we know if the spawn area is blocked.
//------------------------------------------------------------
const lastSpawnedMap = {
  track1: null,
  track2: null,
  track3: null,
  track4: null,
  track5: null
};

//------------------------------------------------------------
// We'll define a base distance from x=2000 to x=-300 as 2300.
// That's the distance for a shape of "zero width".
// We'll adjust travel time proportionally for extra width.
//------------------------------------------------------------
const BASE_DISTANCE = 2300; // (2000 to -300)

//************************************************************
// spawnSmokeStack()
// 1) Checks if last building is still blocking x=2000.
// 2) Spawns new shape at x=2000, finds its width, extends
//    final X to (-300 - width) so it's fully offscreen.
// 3) Computes a dynamic duration so the horizontal speed
//    is consistent for all shapes.
//************************************************************
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

  // 3) Check if last building is blocking the spawn
  const lastBld = lastSpawnedMap[shortId];
  if (lastBld) {
    // Measure last building's position + width
    const lastX = gsap.getProperty(lastBld, "x");
    const lastBbox = lastBld.getBBox();
    const lastBldScale = parseFloat(lastBld.getAttribute("data-scale-factor") || 1);
    const lastWidth = lastBbox.width * lastBldScale;
    const rightEdge = lastX + lastWidth;

    // If it hasn't moved past x=2000, skip spawn
    if (rightEdge > 2000) {
      return;
    }
  }

  // 4) Pick one shape at random
  const shapeIndex = Math.floor(Math.random() * possibleShapes.length);
  const randomShapeId = possibleShapes[shapeIndex];

  // 5) Grab shape <g> from the DOM
  const template = document.getElementById(randomShapeId);
  if (!template) {
    console.warn("No template found for ID:", randomShapeId);
    return;
  }

  // 6) Clone the shape
  const newStack = template.cloneNode(true);
  newStack.removeAttribute("id"); // avoid duplicate IDs

  // 7) Append to <svg>
  svgRoot.appendChild(newStack);

  // 8) (Optional) apply a random color
  // const colors = trackColors[shortId] || ["#000"];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  // newStack.querySelectorAll("path").forEach(path => {
  //   path.setAttribute("fill", randomColor);
  // });

  // 9) Y offset
  const yPos = (yOffsets[shapeIndex] !== undefined)
    ? yOffsets[shapeIndex]
    : 200;

  // 10) Place the new building at x=2000
  newStack.setAttribute("data-scale-factor", scaleFactor);
  gsap.set(newStack, {
    x: 2000,
    y: yPos,
    scale: scaleFactor,
    transformOrigin: "top left"
  });

  // 11) Measure the new building's width
  const newBbox = newStack.getBBox();
  const shapeWidth = newBbox.width * scaleFactor;

  // 12) Final X so it's fully offscreen
  const finalX = -300 - shapeWidth; 

  // 13) Compute a dynamic duration to preserve speed
  //     "speedSec" is the time for the BASE_DISTANCE (2300 px).
  //     If the shape is extra wide, it's traveling (2300 + shapeWidth).
  //     So we scale the time proportionally.
  //
  //     If baseline velocity = 2300 / speedSec px/s,
  //     total distance = 2300 + shapeWidth,
  //     actualTime = totalDistance / velocity.
  const totalDistance = BASE_DISTANCE + shapeWidth;
  const baseVelocity = BASE_DISTANCE / speedSec; // px per sec
  const actualDuration = totalDistance / baseVelocity;

  // 14) Animate left at that duration
  gsap.to(newStack, {
    x: finalX,
    duration: actualDuration,
    ease: "none",
    onComplete: () => {
      newStack.remove();
    }
  });

  // 15) Update lastSpawnedMap so subsequent spawns check against this new building
  lastSpawnedMap[shortId] = newStack;
}

//************************************************************
// D) Set up intervals for each track (your original config)
//************************************************************
const track1Svg = document.getElementById("track1Svg");
const track2Svg = document.getElementById("track2Svg");
const track3Svg = document.getElementById("track3Svg");
const track4Svg = document.getElementById("track4Svg");
const track5Svg = document.getElementById("track5Svg");

// Same intervals & base times as you had before:
setInterval(() => {
  spawnSmokeStack(track1Svg, 1.0, 1, [0, 700, 700]);
}, 4000);

setInterval(() => {
  spawnSmokeStack(track2Svg, 0.8, 3, [550, 550, 440, 440, 700]);
}, 10);

setInterval(() => {
  spawnSmokeStack(track3Svg, 1.2, 6, [320, 320, 175, 175, 100, 300, 200, 400]);
}, 2000); // was 7000

setInterval(() => {
  spawnSmokeStack(track4Svg, .6, 10, [250, 350, 250, 10, 250, 350, 450, 250, 340, 250]);
}, 100);

setInterval(() => {
  spawnSmokeStack(track5Svg, 1, 5, [550]);
}, 9000);


//************************************************************
// Rain + Lightning (unchanged from your code)
//************************************************************
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
  for (let i = 0; i < 50; i++) {
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
  let delay = Math.random() * 10000 + 5000;
  setTimeout(() => {
    lightningFlash.style.opacity = "1";
    setTimeout(() => {
      lightningFlash.style.opacity = "0";
      triggerLightning();
    }, 200);
  }, delay);
}

// Rain cycle every 3 minutes (1.5 min rain, 1.5 min clear)
setInterval(toggleRain, 90000);

// Start rain initially
toggleRain();

