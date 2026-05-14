document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Cursor ---
  const cursor = document.querySelector(".cursor-blob");
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
  });

  const render = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(render);
  };
  render();

  // --- 2. CV Overlay Logic ---
  const openCv = document.getElementById("open-cv");
  const closeCv = document.querySelector(".close-cv");
  const cvOverlay = document.getElementById("cv-overlay");

  openCv.onclick = () => cvOverlay.style.display = "flex";
  closeCv.onclick = () => cvOverlay.style.display = "none";
  window.onclick = (e) => { if(e.target == cvOverlay) cvOverlay.style.display = "none"; }

  // --- 3. Filtering & Backgrounds ---
  const projectRows = document.querySelectorAll(".project-row");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const backgrounds = document.querySelectorAll(".project-bg");

  projectRows.forEach(row => {
    row.onmouseenter = () => {
      backgrounds.forEach(bg => bg.classList.remove("active"));
      document.getElementById(row.dataset.bg).classList.add("active");
    };
    row.onmouseleave = () => backgrounds.forEach(bg => bg.classList.remove("active"));
  });

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;
      projectRows.forEach(row => {
        if(category === 'all' || row.dataset.category === category) {
          row.style.display = "flex";
        } else {
          row.style.display = "none";
        }
      });
    };
  });

  // --- 4. Magnetic Effect ---
  document.querySelectorAll(".magnetic").forEach(el => {
    el.onmousemove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.3;
      const y = (e.clientY - rect.top - rect.height/2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    el.onmouseleave = () => el.style.transform = `translate(0, 0)`;
  });
});
