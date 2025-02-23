const track1 = document.querySelector(".track1");
const track2 = document.querySelector(".track2");
const track3 = document.querySelector(".track3");
const track4 = document.querySelector(".track4");
const track5 = document.querySelector(".track5");

const layer1 = document.querySelector(".track1 img");
const layer2 = document.querySelector(".track2 img");
const layer3 = document.querySelector(".track3 img");
const layer4 = document.querySelector(".track4 img");
const layer5 = document.querySelector(".track5 img");

const numImages = 3; // Number of images needed for seamless loop

// Function to duplicate images in a track
function duplicateImages(track, imageSrc) {
    for (let i = 0; i < numImages; i++) {
        let img = document.createElement("img");
        img.src = imageSrc;
        img.alt = "Parallax Image";
        img.style.width = "1920px"; // Ensure correct width
        track.appendChild(img);
    }
}

// Function to add spacing between images in Track 5
function addGapToImages(track, gapSize = 300) {
  const images = track.querySelectorAll("img");
  images.forEach((img, index) => {
      if (index !== images.length - 1) { // Avoid adding a gap to the last image
          img.style.marginRight = `${gapSize}px`;
      }
  });
}

// Duplicate images for all 5 layers
duplicateImages(track1, layer1.src);
duplicateImages(track2, layer2.src);
duplicateImages(track3, layer3.src);
duplicateImages(track4, layer4.src);
duplicateImages(track5, layer5.src);

// Add spacing ONLY to Track 5 images
addGapToImages(track5, 400);

// Parallax function for smooth looping
// ✅ Updated function to handle optional `gap` parameter
function startParallaxScroll(track, speed, imageWidth = 1920, gap = 0) {
  gsap.to(track, {
    x: `-=${imageWidth + gap}`, // Move left by one image width + gap if applicable
    duration: speed,
    ease: "none",
    repeat: -1,
    force3D: true, // Forces GPU acceleration
    smoothChildTiming: true, // Prevents laggy frame jumps
    modifiers: {
      x: function (x) {
        return (parseFloat(x) % ((imageWidth + gap) * numImages)) + "px"; // Ensures seamless loop
      }
    }
  });
}

// Start all 5 parallax layers with different speeds for depth effect
startParallaxScroll(track1, 30); // Farthest background (slowest)
startParallaxScroll(track2, 25);
startParallaxScroll(track3, 20);
startParallaxScroll(track4, 15);
startParallaxScroll(track5, 10, 1920, 400); // Track 5 moves with spacing
