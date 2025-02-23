const tracks = document.querySelectorAll(".parallax-track");
const numImages = 3; // Number of images per track
const speeds = [30, 25, 20, 15, 10]; // Different speeds for depth effect

// Duplicate images in each track
tracks.forEach((track, index) => {
    const imgSrc = track.querySelector("img").src;

    for (let i = 0; i < numImages; i++) {
        let img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Parallax Image";
        track.appendChild(img);
    }

    // Start GSAP animation for each track
    gsap.to(track, {
        x: "-=1920", // Moves left by one image width
        duration: speeds[index], // Each track moves at different speed
        ease: "none",
        repeat: -1,
        modifiers: {
            x: (x) => (parseFloat(x) % (1920 * numImages)) + "px",
        }
    });
});
