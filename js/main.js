const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
const navLinks = [...document.querySelectorAll(".nav__link")];
const sections = ["inicio", "servicos", "galeria", "contato"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox__caption");

if (window.lucide) {
  lucide.createIcons();
}

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);

  const y = window.scrollY + 120;
  let current = "inicio";
  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
});

document.querySelectorAll("[data-lightbox]").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.lightbox;
    lightboxImg.alt = card.dataset.caption || "";
    lightboxCaption.textContent = card.dataset.caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
};

lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});
