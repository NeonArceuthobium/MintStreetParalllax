const track = document.querySelector(".parallax-track");
const layer2 = document.querySelector("#layer2");
const imageURL = layer2.src;

const numImages = 3; // Number of images needed for seamless loop


// Dynamically create image elements and append them to the parallax track
for (let i = 0; i < numImages; i++) {
    let img = document.createElement("img");
    img.src = imageURL;
    img.alt = "Parallax Image";
    track.appendChild(img);
}




function startParallaxScroll(speed = 30) {
  gsap.to(track, {
    x: "-=1920", // Move left by one image width
    duration: speed, // Lower = faster
    ease: "none",
    repeat: -1,
    modifiers: {
      x: function (x) {
        return (parseFloat(x) % 1920) + "px"; // Ensures smooth infinite loop
      }
    }
  });
}

startParallaxScroll(15); // Adjust speed (lower = faster)
