const track1 = document.querySelector(".track1");
const track2 = document.querySelector(".track2");

const layer1 = document.querySelector("#layer1");
const layer2 = document.querySelector("#layer2");

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

// Duplicate images for both tracks
duplicateImages(track1, layer1.src);
duplicateImages(track2, layer2.src);

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

// Start both parallax layers with different speeds
startParallaxScroll(track1, 20); // Background moves slower
startParallaxScroll(track2, 1); // Foreground moves faster
