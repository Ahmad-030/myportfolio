const projects = [
    {
        title: "NovelNook",
        images: [
            "projects/novelnook/front1.png",
            "projects/novelnook/novelnook1.png",
        ],
        description: "It is a modern mobile bookstore app that allows users to explore a wide range of novels, add favorites to their wishlist, and seamlessly purchase books through a simple cart and checkout system. It combines an intuitive design with smooth navigation for an enjoyable reading and shopping experience."
    },
    {
        title: "TextSnap",
        images: [
            "projects/Textsnap/Textsnap2.jpg",
            "projects/Textsnap/snap.png"
        ],
        description: "TextSnap is a smart OCR (Optical Character Recognition) app that lets you instantly extract text from images, documents, and screenshots. With a clean interface and powerful recognition engine, it converts printed or handwritten text into editable, shareable, and searchable digital content. Whether you’re scanning notes, capturing signboards, or digitizing documents, TextSnap makes text extraction fast, accurate, and effortless."
    },
    {
        title: "TechNest",
        images: [
            "projects/technest/12.jpeg",
            "projects/technest/123.jpeg",
            "projects/technest/1.jpeg"
        ],
        description: "TechNest is an e-commerce app designed for computer enthusiasts, offering a wide range of peripherals and accessories with a seamless shopping experience, secure checkout, and modern UI."
    },
    {
        title: "Rao Jewellery",
        images: [
            "projects/RAO/1.jpeg",
            "projects/RAO/2.jpeg",
            "projects/RAO/3.jpeg",
            "projects/RAO/4.jpeg"
        ],
        description: "Rao Jewelers is a dedicated jewelry e-commerce app designed to provide customers with a luxurious yet convenient shopping experience. The app features an extensive collection of gold, silver, diamond, and custom-designed jewelry, beautifully showcased with high-quality images and detailed descriptions. Users can easily browse by category, apply filters for style or price, and add favorites to their wishlist for later. With secure payment gateways, order tracking, and personalized recommendations."
    },
    {
        title: "Food Delivery",
        images: [
            "projects/food/1.jpeg",
            "projects/food/2.jpeg",
            "projects/food/3.jpeg",
            
        ],
        description: "Foodie Express is a sleek and user-friendly food delivery app that brings your favorite meals from a variety of restaurants straight to your door. Whether you're craving pizza, sushi, or something special, Foodie Express offers an easy-to-use platform for fast and efficient food delivery. With a focus on seamless ordering, real-time delivery tracking, and personalized experiences, this app ensures you get your food delivered just the way you like it."
    }
];

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImages = document.getElementById("modalImages");
const modalDescription = document.getElementById("modalDescription");
const viewButtons = document.querySelectorAll(".project-card .btn");

let currentImageIndex = 0;
let currentImageList = [];

viewButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const project = projects[index];
        currentImageList = project.images;

        // Render images (no descriptions)
        modalImages.innerHTML = project.images.map(img =>
            `<div class="project-img-container">
                <img src="${img}" alt="${project.title}" class="popup-img">
            </div>`).join("");

        modalDescription.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
        modal.style.display = "flex";
        document.body.classList.add("blur-bg");
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("blur-bg");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("blur-bg");
    }
});

// Enlarged image popup with controls
modalImages.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        const src = decodeURIComponent(e.target.src);
        const fileName = src.substring(src.lastIndexOf("/") + 1).toLowerCase();

        currentImageIndex = currentImageList.findIndex(img =>
            img.toLowerCase().endsWith(fileName)
        );

        if (currentImageIndex !== -1) {
            showImageOverlay(currentImageList[currentImageIndex]);
        }
    }
});

function showImageOverlay(imageSrc) {
    const overlay = document.createElement("div");
    overlay.className = "image-overlay";

    const enlarged = document.createElement("img");
    enlarged.alt = "Project Image";

    const controls = document.createElement("div");
    controls.className = "image-overlay-controls";

    const zoomIn = document.createElement("button");
    zoomIn.textContent = "Zoom In";

    const zoomOut = document.createElement("button");
    zoomOut.textContent = "Zoom Out";

    const prev = document.createElement("button");
    prev.textContent = "← Prev";

    const next = document.createElement("button");
    next.textContent = "Next →";

    let zoomLevel = 1;

    zoomIn.addEventListener("click", () => {
        zoomLevel += 0.1;
        enlarged.style.transform = `scale(${zoomLevel})`;
    });

    zoomOut.addEventListener("click", () => {
        zoomLevel = Math.max(0.5, zoomLevel - 0.1);
        enlarged.style.transform = `scale(${zoomLevel})`;
    });

    next.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
        updateImageSrc();
    });

    prev.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
        updateImageSrc();
    });

    function updateImageSrc() {
        zoomLevel = 1;
        enlarged.style.transform = "scale(1)";
        enlarged.src = currentImageList[currentImageIndex];
    }

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    });

    controls.appendChild(prev);
    controls.appendChild(zoomIn);
    controls.appendChild(zoomOut);
    controls.appendChild(next);

    overlay.appendChild(enlarged);
    overlay.appendChild(controls);
    document.body.appendChild(overlay);

    updateImageSrc();
}

// Scroll Reveal Animations
ScrollReveal({
    reset: false,        
    distance: '60px',
    duration: 1200,
    delay: 200
});
ScrollReveal().reveal('.reveal', {
    origin: 'bottom',
    interval: 400
});

const certImages = document.querySelectorAll('.certification-card img');

certImages.forEach((img) => {
    img.addEventListener('click', (e) => {
        const src = e.target.src;
        const overlay = document.createElement('div');
        overlay.classList.add('cert-enlarge-overlay');

        const enlargedImage = document.createElement('img');
        enlargedImage.src = src;

        const closeBtn = document.createElement('div');
        closeBtn.classList.add('cert-enlarge-close');
        closeBtn.innerHTML = '&times;'; // Close button content

        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay); // Close the overlay
        });

        overlay.appendChild(enlargedImage);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay); // Append overlay to body

        // Show the overlay
        overlay.style.display = 'flex';

        // Optional: Close the overlay if clicked outside the image
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    });
});
// ScrollSpy
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// Typewriter Effect
const roles = ["Flutter App Developer", "Full Stack Developer"];
let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const speed = 100;       // typing speed
const eraseSpeed = 60;   // deleting speed
const delayBetween = 1500; // pause before deleting

function typeWriter() {
  const typewriterSpan = document.getElementById("typewriter");

  if (!typewriterSpan) return; // safety check

  if (!isDeleting && charIndex < roles[roleIndex].length) {
    currentText += roles[roleIndex].charAt(charIndex);
    charIndex++;
    typewriterSpan.textContent = currentText;
    setTimeout(typeWriter, speed);
  } else if (isDeleting && charIndex > 0) {
    currentText = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    typewriterSpan.textContent = currentText;
    setTimeout(typeWriter, eraseSpeed);
  } else {
    if (!isDeleting) {
      isDeleting = true;
      setTimeout(typeWriter, delayBetween);
    } else {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, speed);
    }
  }
}

document.addEventListener("DOMContentLoaded", typeWriter);

// Mobile Navbar Toggle
// JavaScript to toggle navbar menu
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

