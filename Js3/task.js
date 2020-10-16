import gallery__item from "./gallery-items.js";
const refs = {
  gallery: document.querySelector(".js-gallery"),
  largeImage: document.querySelector("img.lightbox__image"),
  backdrop: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  closeModal: document.querySelector('button[ data-action="close-lightbox"]'),
};

const containerRef = (item) => {
  const liItem = document.createElement("li");
  liItem.classList.add("gallery__item");

  const linkItem = document.createElement("a");
  linkItem.classList.add("gallery__link");
  linkItem.setAttribute("href", item.original);
  const image = document.createElement("img");
  image.classList.add("gallery__image");
  image.src = item.preview;
  image.setAttribute("data-source", item.original);
  image.alt = item.description;

  linkItem.appendChild(image);
  liItem.appendChild(linkItem);
  return liItem;
};

const galleryCards = gallery__item.map((item) => containerRef(item));
refs.gallery.append(...galleryCards);

refs.gallery.addEventListener("click", openBigImg);

function openBigImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const imageRef = event.target;
  const largeImg = imageRef.dataset.source;

  setLargeImgSrc(largeImg);
}

function setLargeImgSrc(url) {
  refs.largeImage.src = url;
}

refs.gallery.addEventListener("click", () => {
  refs.backdrop.classList.add("is-open");
});

refs.closeModal.addEventListener("click", () => {
  refs.backdrop.classList.remove("is-open");
});

refs.overlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    refs.backdrop.classList.remove("is-open");
  }
});

refs.gallery.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    refs.backdrop.classList.remove("is-open");
  }
});
