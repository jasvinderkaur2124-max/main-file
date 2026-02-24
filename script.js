// ===============================
// PREMIUM SMOOTH CURSOR
// ===============================

const outer = document.querySelector(".cursor-outer");
const inner = document.querySelector(".cursor-inner");

if (outer && inner) {

  let mouseX = 0;
  let mouseY = 0;

  let outerX = 0;
  let outerY = 0;

  // cursor move
  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    // inner fast
    inner.style.left = mouseX + "px";
    inner.style.top = mouseY + "px";
  });

  // smooth outer animation
  function animate() {
    outerX += (mouseX - outerX) * 0.15;
    outerY += (mouseY - outerY) * 0.15;

    outer.style.left = outerX + "px";
    outer.style.top = outerY + "px";

    requestAnimationFrame(animate);
  }

  animate();

  // hover grow effect
  const hoverItems = document.querySelectorAll(
    "a, button, .card, .work-card, .contact-input"
  );

  hoverItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      outer.classList.add("cursor-grow");
    });

    item.addEventListener("mouseleave", () => {
      outer.classList.remove("cursor-grow");
    });
  });
}



// ===============================
// BUBBLE RANDOM DELAY
// ===============================
document.querySelectorAll('.bubbles span').forEach(bubble => {
  bubble.style.animationDelay = Math.random() * 6 + "s";
});





// ===============================
// TYPING EFFECT
// ===============================
const texts = [
  "Graphic Designer",
  "UI/UX Designer",
  "Web Designer",
  "Creative Thinker"
];

let index = 0;
let char = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

if (typingElement) {

  function typeEffect() {
    let currentText = texts[index];

    if (!isDeleting) {
      typingElement.textContent = currentText.slice(0, char++);
      if (char > currentText.length) {
        setTimeout(() => isDeleting = true, 1200);
      }
    } else {
      typingElement.textContent = currentText.slice(0, char--);
      if (char === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}


// ===============================
// PROFILE IMAGE ANIMATION
// ===============================
window.addEventListener("load", () => {
  const img = document.querySelector(".profile-img");

  if (img) {
    setTimeout(() => {
      img.style.transition = "all 1s ease";
      img.style.opacity = "1";
      img.style.transform = "translateY(0)";
    }, 500);
  }
});


// ===============================
// ABOUT SECTION ANIMATION
// ===============================
const cards = document.querySelectorAll(".card");

if (cards.length > 0) {
  window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.8;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < trigger) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  });
}


// ===============================
// CONTACT FORM VALIDATION
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.innerText = "❌ All fields are required";
        status.style.color = "red";
      }
      return;
    }

    if (!emailCheck(email)) {
      if (status) {
        status.innerText = "❌ Invalid email address";
        status.style.color = "red";
      }
      return;
    }

    if (status) {
      status.innerText = "✅ Message sent successfully!";
      status.style.color = "green";
    }

    form.reset();

    setTimeout(() => {
      if (status) status.innerText = "";
    }, 3000);
  });

  function emailCheck(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});


// ===============================
// SKILLS ANIMATION
// ===============================
const skills = document.querySelectorAll(".skill1");

if (skills.length > 0) {

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {

      if (entry.isIntersecting) {

        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 200);

        const h2 = entry.target.querySelector("h2");

        if (h2) {
          let target = parseInt(h2.innerText);
          let count = 0;

          const counter = setInterval(() => {
            if (count < target) {
              count++;
              h2.innerText = count + "%";
            } else {
              clearInterval(counter);
            }
          }, 20);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skills.forEach(skill => observer.observe(skill));
}


// ===============================
// CANVAS BACKGROUND
// ===============================
const canvas = document.getElementById("bg-canvas");

if (canvas) {

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Circle {
    constructor() {
      this.radius = Math.random() * 120 + 80;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.dx = (Math.random() - 0.5) * 0.3;
      this.dy = (Math.random() - 0.5) * 0.3;
      this.color = `rgba(${Math.random()*100+100},
                          ${Math.random()*100+100},
                          255,0.15)`;
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

      this.draw();
    }
  }

  let circles = [];
  for (let i = 0; i < 6; i++) circles.push(new Circle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => circle.update());
    requestAnimationFrame(animate);
  }

  animate();
}


// ===============================
// CONTACT BUTTON ANIMATION
// ===============================
const contactForm = document.getElementById("contactForm");
const btn = document.getElementById("sendBtn");

if (contactForm && btn) {
  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    btn.innerText = "Sending...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.innerText = "Message Sent ✔";
      btn.style.background = "#00c853";
      contactForm.reset();

      setTimeout(() => {
        btn.innerText = "Send Message";
        btn.style.background = "#1da1ff";
        btn.style.opacity = "1";
      }, 2000);

    }, 1200);

  });
}


// ===============================
// SCROLL TOP BUTTON
// ===============================
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

  window.addEventListener("scroll", () => {
    scrollBtn.style.display =
      window.scrollY > 200 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}


// ===============================
// CONTACT SECTION PARALLAX
// ===============================
document.addEventListener("mousemove", (e) => {

  const section = document.querySelector(".contact-section");

  if (!section) return;

  let x = (window.innerWidth / 2 - e.pageX) / 50;
  let y = (window.innerHeight / 2 - e.pageY) / 50;

  section.style.backgroundPosition = `${x}px ${y}px`;
});



// ===============================
// SCROLL TO TOP BUTTON (SAFE)
// ===============================

window.addEventListener("DOMContentLoaded", () => {

  const scrollBtn = document.getElementById("scrollTopBtn");

  // agar button hi nahi hai to JS crash nahi hoga
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }

  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});



function openPage(page){
  window.location.href = page;
}
