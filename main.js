document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Liquid Blend Cursor ---
  const cursor = document.querySelector(".cursor-blob");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const renderCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const hoverTargets = document.querySelectorAll(
      "a, .project-row, .magnetic",
    );
    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", () =>
        cursor.classList.add("cursor-active"),
      );
      target.addEventListener("mouseleave", () =>
        cursor.classList.remove("cursor-active"),
      );
    });
  } else {
    cursor.style.display = "none";
  }

  // --- 2. Advanced Magnetic Elements ---
  const magnetics = document.querySelectorAll(".magnetic");

  if (window.matchMedia("(pointer: fine)").matches) {
    magnetics.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const strength = btn.dataset.strength || 20;

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px, 0px)";
        btn.style.transition =
          "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

        setTimeout(() => {
          btn.style.transition = "none";
        }, 500);
      });

      btn.addEventListener("mouseenter", () => {
        btn.style.transition = "none";
      });
    });
  }

  // --- 3. Immersive Background Changer (Works Section) ---
  const projectRows = document.querySelectorAll(".project-row");
  const backgrounds = document.querySelectorAll(".project-bg");

  projectRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      const bgId = row.getAttribute("data-bg");

      backgrounds.forEach((bg) => bg.classList.remove("active"));

      const targetBg = document.getElementById(bgId);
      if (targetBg) targetBg.classList.add("active");
    });

    row.addEventListener("mouseleave", () => {
      backgrounds.forEach((bg) => bg.classList.remove("active"));
    });
  });

  // --- 4. Smooth Scrolling untuk Navigasi Menu ---
  document.querySelectorAll(".nav-links a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // --- 5. Mobile Navbar Logic ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Tutup menu otomatis saat link diklik (di versi mobile)
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
});
