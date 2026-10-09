document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Subtle rotating descriptor in the hero.
  const word = document.querySelector(".changing-word");
  const words = ["possibility", "new ideas", "better solutions", "the future"];
  let index = 0;
  if (word && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      index = (index + 1) % words.length;
      word.animate([{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 350, easing: "ease-out" });
      word.textContent = words[index];
    }, 2400);
  }

  // Pointer-based parallax gives the hero artwork a lightweight 3D feel.
  const scene = document.getElementById("orbitScene");
  if (scene && window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scene.addEventListener("pointermove", (event) => {
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      scene.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
    });
    scene.addEventListener("pointerleave", () => {
      scene.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }

  // Gentle tilt on skill cards for desktop pointers.
  const cards = document.querySelectorAll(".tilt-card");
  if (window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-2px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  // Close the mobile navigation after selecting a section.
  document.querySelectorAll(".navbar-nav .nav-link, .nav-cta").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu && menu.classList.contains("show") && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
