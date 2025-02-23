const tracks = document.querySelectorAll(".parallax-track"); // Select all parallax tracks
const numImages = 3; // Number of extra images for looping
const imageWidth = 1920; // Adjust based on your actual image size

gsap.defaults({ force3D: true });





function duplicateImages(track, applyGap = false, gapSize = 200) {
    const originalImages = Array.from(track.querySelectorAll("img"));
    const totalImages = originalImages.length * (numImages + 1);

    // Enable flexbox gap if needed
    if (applyGap) {
        track.style.display = "flex"; // Ensure flexbox
        track.style.gap = `${gapSize}px`; // Apply gap dynamically
    }

    track.style.width = `${totalImages * (imageWidth + (applyGap ? gapSize : 0))}px`;

    originalImages.forEach(img => {
        for (let i = 0; i < numImages; i++) {
            let clonedImg = img.cloneNode(true);
            track.appendChild(clonedImg);
        }
    });
}





// Normal tracks (no gaps)
duplicateImages(document.querySelector(".track1"));
duplicateImages(document.querySelector(".track2"));
duplicateImages(document.querySelector(".track3"));
duplicateImages(document.querySelector(".track4"));

// Extreme stress test: 10,000px gap (should now work flawlessly)
duplicateImages(document.querySelector(".track5"), true, 10000);




// Optimized GSAP Parallax Function for Smooth Infinite Looping
function startParallaxScroll(track, baseSpeed, applyGap = false, gapSize = 0) {
    const originalImages = track.querySelectorAll("img").length / (numImages + 1) || 1; // Ensure valid count
    const totalImageWidth = imageWidth + (applyGap ? gapSize : 0);
    const totalWidth = originalImages * totalImageWidth * numImages; // Proper loop distance

    // 🔥 Normalize speed so it scales properly across tracks
    const speedFactor = Math.max(baseSpeed / 10, 0.1); // Prevents extreme durations
    const scaledDuration = (totalWidth / (speedFactor * 10)); // Balanced duration

    gsap.to(track, {
        xPercent: (-totalWidth / track.offsetWidth) * 100, // Convert pixels to percentage
        duration: scaledDuration, // Adjusted dynamically based on width
        ease: "none",
        repeat: -1,
        // onRepeat: function () {
        //     gsap.set(track, { x: 0, left: "auto" });
        // }
    });

    console.log(`Track: ${track.className}, Base Speed: ${baseSpeed}, Duration: ${scaledDuration}, Total Width: ${totalWidth}`);
}










// Start animations
startParallaxScroll(document.querySelector(".parallax-track.track1"), 100, false, 0);
startParallaxScroll(document.querySelector(".parallax-track.track2"), 5, false, 0);
startParallaxScroll(document.querySelector(".parallax-track.track3"), 250, false, 0);
startParallaxScroll(document.querySelector(".parallax-track.track4"), 800, false, 0);
startParallaxScroll(document.querySelector(".parallax-track.track5"), 3500, true, 10000);
