import { default as imgGalleryItems } from "./gallery-items.js";

const creatGallery = imgGalleryItems.reduce((acc, img) => {
  img = `<li class="gallery__item">
    <a
      class="gallery__link"
      href=${img.original}
    >
      <img
        class="gallery__image"
        src=${img.preview}
        data-source=${img.original}
        alt=${img.description}
      />
    </a>
  </li>`;
  return (acc += img);
}, "");

const refs = {
  gallery: document.querySelector(".gallery"),
  lightBox: document.querySelector(".lightbox"),
  closeBtn: document.querySelector(
    '.lightbox__button[data-action="close-lightbox"]'
  ),
  bigImg: document.querySelector(".lightbox__image"),
};

refs.gallery.insertAdjacentHTML("afterbegin", creatGallery);

const openModalWindow = (event) => {
  if (event.target.classList.contains("gallery__image")) {
    event.preventDefault();
    refs.lightBox.classList.add("is-open");
    refs.bigImg.src = event.target.dataset.source;
    refs.bigImg.alt = event.target.alt;
    document.addEventListener("keydown", onPressEscape);
  }
};

const closeOpenWindow = (event) => {
  refs.lightBox.classList.remove("is-open");
  document.removeEventListener("keydown", onPressEscape);
  refs.bigImg.src = "";
  refs.bigImg.alt = "";
};

const onPressEscape = (event) => {
  if (event.code === "Escape") {
    closeOpenWindow();
  }
};
refs.gallery.addEventListener("click", openModalWindow);
refs.closeBtn.addEventListener("click", closeOpenWindow);
