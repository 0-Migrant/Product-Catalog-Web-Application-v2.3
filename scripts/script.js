const products = [
  {
    id: 1,
    slug: "galaxy-s24-ultra",
    title: "Samsung Galaxy S24 Ultra",
    description: "6.8-inch AMOLED display, Snapdragon 8 Gen 3, 200MP camera.",
    image: "../assets/samsung.png",
    old_price: 1499,
    price_after_sale: 1299,
    currency: "USD",
  },
  {
    id: 2,
    slug: "iphone-15-pro-max",
    title: "Apple iPhone 15 Pro Max",
    description:
      "A17 Pro chip, titanium design, 48MP camera, long battery life.",
    image: "../assets/img.svg",
    old_price: 1599,
    price_after_sale: 1499,
    currency: "USD",
  },
  {
    id: 3,
    slug: "macbook-air-m3",
    title: "MacBook Air M3",
    description: "13-inch Retina display, M3 chip, 8GB RAM, 256GB SSD.",
    image: "../assets/samsung.png",
    old_price: 1399,
    price_after_sale: 1249,
    currency: "USD",
  },
  {
    id: 4,
    slug: "lenovo-legion-7",
    title: "Lenovo Legion 7",
    description:
      "AMD Ryzen 9, RTX 4070, 16GB RAM, 1TB SSD, 16-inch QHD display.",
    image: "../assets/img.svg",
    old_price: 2199,
    price_after_sale: 1999,
    currency: "USD",
  },
  {
    id: 5,
    slug: "anker-powercore-20000",
    title: "Anker PowerCore 20000mAh Power Bank",
    description: "High-capacity portable charger with fast charging.",
    image: "../assets/samsung.png",
    old_price: 69,
    price_after_sale: 49,
    currency: "USD",
  },
  {
    id: 6,
    slug: "sony-wh-1000xm5",
    title: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise-canceling wireless headphones.",
    image: "../assets/img.svg",
    old_price: 399,
    price_after_sale: 349,
    currency: "USD",
  },
  {
    id: 7,
    slug: "logitech-mx-master-3s",
    title: "Logitech MX Master 3S Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking and fast scrolling.",
    image: "../assets/samsung.png",
    old_price: 119,
    price_after_sale: 99,
    currency: "USD",
  },
  {
    id: 8,
    slug: "apple-airpods-pro-2",
    title: "Apple AirPods Pro (2nd Gen)",
    description:
      "Active noise cancellation, personalized spatial audio, USB-C case.",
    image: "../assets/img.svg",
    old_price: 299,
    price_after_sale: 269,
    currency: "USD",
  },
];

let minPrice = 0;
let maxPrice = 10000;
let filteredProducts = products;
let cartItems = [];

const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const filterBtn = document.getElementById("filter-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const cartCount = document.querySelector(".cart-count");
const favoriteBtnSelector = "#favorite-btn";
const cartBtnSelector = "#cart-btn";

// event delegation (robust and works after DOM updates)
document.addEventListener("click", (e) => {
  const element = e.target.closest(cartBtnSelector);
  if (!element) return;

  const productCard = element.closest(".product-card");
  const productTitle =
    productCard?.querySelector(".product-title")?.textContent;
  const product = products.find((product) => product.title === productTitle);
  if (product && !cartItems.includes(product)) {
    cartItems.push(product);
    if (cartCount) cartCount.textContent = cartItems.length;
    element.classList.toggle("added-to-cart");
    element.innerHTML = `<svg fill="#ffffff" height="200px" width="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="m137.6,185.2c9.4,6.1 22.1,3.5 28.2-5.9l20.6-31.6v106.1c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-106.1l20.6,31.6c3.9,6 14.5,14 28.2,5.9 9.7-5.7 12.1-18.8 5.9-28.2l-58.1-89c-3.8-5.8-10.2-9.3-17.1-9.3s-13.3,3.5-17.1,9.3l-58.1,89c-6,9.4-3.3,22.1 6.1,28.2z"></path> <path d="m295.2,372c-33,0-59.8,27.4-59.8,61 0,33.6 26.8,61 59.8,61 33,0 59.8-27.4 59.8-61 0.1-33.6-26.8-61-59.8-61z"></path> <path d="m136.8,372c-33,0-59.8,27.4-59.8,61 0,33.6 26.8,61 59.8,61 33,0 59.8-27.4 59.8-61 0.1-33.6-26.8-61-59.8-61z"></path> <path d="m480.5,17.9h-94.3c-9.9,0-18.4,7.1-20.1,16.9l-12.6,72.5h-55l17.8,27.3c18.4,28.3 10.4,66.3-17.8,84.7-9.1,5.9-19.5,9.3-30.3,9.9v24.5c0,33.8-27.5,61.2-61.2,61.2-33.8,0-61.2-27.5-61.2-61.2v-24.5c-10.8-0.5-21.2-3.9-30.3-9.9-28.3-18.5-36.3-56.5-17.8-84.7l17.8-27.3h-84c-18.7,0.7-21.8,19-19.7,25.7l49.8,189.8c2.4,9 10.5,15.2 19.7,15.2h256.4c9.9,0 18.4-7.1 20.1-16.9l34.2-196.9 11.4-65.4h77.2c11.3,0 20.4-9.1 20.4-20.4-0.1-11.3-9.2-20.5-20.5-20.5z"></path> </g> </g> </g></svg> remove from cart`;
  } else if (product && cartItems.includes(product)) {
    const index = cartItems.findIndex((p) => p.title === productTitle);
    if (index > -1) cartItems.splice(index, 1);
    element.classList.toggle("added-to-cart");
    if (cartCount) cartCount.textContent = cartItems.length;
    element.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2C14 1.44772 13.5523 1 13 1C12.4477 1 12 1.44772 12 2V8.58579L9.70711 6.29289C9.31658 5.90237 8.68342 5.90237 8.29289 6.29289C7.90237 6.68342 7.90237 7.31658 8.29289 7.70711L12.2929 11.7071C12.6834 12.0976 13.3166 12.0976 13.7071 11.7071L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L14 8.58579V2ZM1 3C1 2.44772 1.44772 2 2 2H2.47241C3.82526 2 5.01074 2.90547 5.3667 4.21065L5.78295 5.73688L7.7638 13H18.236L20.2152 5.73709C20.3604 5.20423 20.9101 4.88998 21.4429 5.03518C21.9758 5.18038 22.29 5.73006 22.1448 6.26291L20.1657 13.5258C19.9285 14.3962 19.1381 15 18.236 15H8V16C8 16.5523 8.44772 17 9 17H16.5H18C18.5523 17 19 17.4477 19 18C19 18.212 18.934 18.4086 18.8215 18.5704C18.9366 18.8578 19 19.1715 19 19.5C19 20.8807 17.8807 22 16.5 22C15.1193 22 14 20.8807 14 19.5C14 19.3288 14.0172 19.1616 14.05 19H10.95C10.9828 19.1616 11 19.3288 11 19.5C11 20.8807 9.88071 22 8.5 22C7.11929 22 6 20.8807 6 19.5C6 18.863 6.23824 18.2816 6.63048 17.8402C6.23533 17.3321 6 16.6935 6 16V14.1339L3.85342 6.26312L3.43717 4.73688C3.31852 4.30182 2.92336 4 2.47241 4H2C1.44772 4 1 3.55228 1 3ZM16 19.5C16 19.2239 16.2239 19 16.5 19C16.7761 19 17 19.2239 17 19.5C17 19.7761 16.7761 20 16.5 20C16.2239 20 16 19.7761 16 19.5ZM8 19.5C8 19.2239 8.22386 19 8.5 19C8.77614 19 9 19.2239 9 19.5C9 19.7761 8.77614 20 8.5 20C8.22386 20 8 19.7761 8 19.5Z" fill="#ffffff"></path> </g></svg>
              Add to cart`;
  }
});

document.addEventListener("click", (e) => {
  const element = e.target.closest(favoriteBtnSelector);
  if (!element) return;
  element.classList.toggle("favorited");
});

minPriceInput.addEventListener("input", () => {
  minPrice = parseInt(minPriceInput.value);
});

maxPriceInput.addEventListener("input", () => {
  maxPrice = parseInt(maxPriceInput.value);
});

filterBtn.addEventListener("click", () => {
  if (minPriceInput.value === "" || maxPriceInput.value === "") {
    filteredProducts = products;
    updateCards();
    return;
  } else {
    filteredProducts = products.filter(
      (product) =>
        product.price_after_sale >= minPrice &&
        product.price_after_sale <= maxPrice
    );
    updateCards();
  }
});

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase();
  filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  if (searchValue === "") {
    filteredProducts = products;
    updateCards();
  }
});

function updateCards() {
  const cards = document.querySelectorAll(".product-card");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const product = filteredProducts[i];

    if (!product) {
      card.style.display = "none";
      continue;
    }

    card.style.display = "flex  ";

    const img = card.querySelector("img");
    const basename = product.image ? product.image.split("/").pop() : "";
    if (img && basename) img.src = "./assist/" + basename;
    if (img) img.alt = product.title;

    const data = card.querySelector(".data-container");
    const titleEl = data?.querySelector(".product-title");
    const descEl = data?.querySelector(".product-desc");
    const priceEl = data?.querySelector(".price");

    if (titleEl) titleEl.textContent = product.title;
    if (descEl) descEl.textContent = product.description;

    if (priceEl) {
      priceEl.innerHTML = `
        ${product.price_after_sale.toFixed(2)}$
        <del>${product.old_price.toFixed(2)}$</del>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", updateCards);
