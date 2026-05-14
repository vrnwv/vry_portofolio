document.addEventListener("DOMContentLoaded", () => {
  // 1. Cursor
  const cursor = document.querySelector(".cursor-blob");
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
  window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });
  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(renderCursor);
  };
  renderCursor();

  // 2. CV Overlay
  const openCv = document.getElementById("open-cv");
  const closeCv = document.querySelector(".close-cv");
  const cvOverlay = document.getElementById("cv-overlay");
  if(openCv) openCv.onclick = () => cvOverlay.style.display = "flex";
  if(closeCv) closeCv.onclick = () => cvOverlay.style.display = "none";

  // 3. Magnetic & Backgrounds
  document.querySelectorAll(".magnetic").forEach(el => {
    el.onmousemove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.3;
      const y = (e.clientY - rect.top - rect.height/2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    el.onmouseleave = () => el.style.transform = `translate(0,0)`;
  });

  const backgrounds = document.querySelectorAll(".project-bg");
  document.querySelectorAll(".project-row").forEach(row => {
    row.onmouseenter = () => {
      backgrounds.forEach(bg => bg.classList.remove("active"));
      const target = document.getElementById(row.dataset.bg);
      if(target) target.classList.add("active");
    };
    row.onmouseleave = () => backgrounds.forEach(bg => bg.classList.remove("active"));
  });

  // 4. Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const rows = document.querySelectorAll(".project-row");
  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;
      rows.forEach(row => {
        row.style.display = (category === 'all' || row.dataset.category === category) ? "flex" : "none";
      });
    };
  });
});
