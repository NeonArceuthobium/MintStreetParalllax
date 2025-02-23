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

// Duplicate images for all 5 layers
duplicateImages(track1, layer1.src);
duplicateImages(track2, layer2.src);
duplicateImages(track3, layer3.src);
duplicateImages(track4, layer4.src);
duplicateImages(track5, layer5.src);

// Parallax function for smooth looping
function startParallaxScroll(track, speed, imageWidth = 1920) {
  gsap.to(track, {
    x: `-=${imageWidth}`, // Move left by one image width
    duration: speed,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: function (x) {
        return (parseFloat(x) % (imageWidth * numImages)) + "px"; // Seamless loop
      }
    }
  });
}

// Start all 5 parallax layers with different speeds for depth effect
startParallaxScroll(track1, 30); // Farthest background (slowest)
startParallaxScroll(track2, 25);
startParallaxScroll(track3, 20);
startParallaxScroll(track4, 15);
startParallaxScroll(track5, 10); // Foreground (fastest)
