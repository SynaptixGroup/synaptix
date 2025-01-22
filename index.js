document.addEventListener("DOMContentLoaded", () => {
    const carouselSlide = document.querySelector(".carousel-slide");
    const images = carouselSlide.querySelectorAll("img");
    let index = 0;

    setInterval(() => {
        index++;
        if (index >= images.length) {
            index = 0;
        }
        carouselSlide.style.transform = `translateX(-${index * 100}%)`;
    }, 5000); // Change image every 5 seconds
});
document.addEventListener("DOMContentLoaded", () => {
    const carouselTrack = document.querySelector(".carousel-track");
    const images = carouselTrack.innerHTML; // Store current images
    carouselTrack.innerHTML += images; // Duplicate images for seamless scrolling
});
