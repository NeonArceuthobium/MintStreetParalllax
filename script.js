console.log("website is working");

const layers = [
    { selector: ".layer-1", speed: 60, zIndex: -5, opacity: 0.3 },
    { selector: ".layer-2", speed: 50, zIndex: -4, opacity: 0.4 },
    { selector: ".layer-3", speed: 40, zIndex: -3, opacity: 0.5 },
    { selector: ".layer-4", speed: 30, zIndex: -2, opacity: 0.6 },
    { selector: ".layer-5", speed: 20, zIndex: -1, opacity: 0.8 },
    { selector: ".layer-6", speed: 10, zIndex: 0, opacity: 1.0 } // Closest layer
];

// Loop through each layer and apply parallax effect
layers.forEach(({ selector, speed, zIndex, opacity }) => {
    const track = document.querySelector(selector);
    if (!track) return; // Safety check

    track.style.zIndex = zIndex;
    track.style.opacity = opacity;

    // Duplicate images for smooth scrolling
    for (let i = 1; i < 3; i++) {
        let imgClone = track.querySelector("img").cloneNode(true);
        track.appendChild(imgClone);
    }

    // GSAP Animation for parallax movement
    gsap.to(track, {
        x: "-=100vw",
        duration: speed,
        ease: "none",
        repeat: -1,
        modifiers: {
            x: function (x) {
                return (parseFloat(x) % window.innerWidth) + "px";
            }
        }
    });
});
