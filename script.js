// Product Data
const products = [
    { id: 1, name: "Velvet Lipstick", price: 25.00, img: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=400", badge: "Bestseller" },
    { id: 2, name: "Rose Serum", price: 45.00, img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400", badge: "New" },
    { id: 3, name: "Hydra Mask", price: 30.00, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400", badge: "Sale" },
    // Add more products as needed...
];

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initCountdown();
    setupTheme();
    setupCart();
});

// Render Products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(p => `
        <div class="product-card">
            ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            <h3>${p.name}</h3>
            <p class="price">$${p.price.toFixed(2)}</p>
            <button onclick="addToCart(${p.id})" class="btn btn-primary">Add to Cart</button>
            <button onclick="removeFromCart(${p.id})" class="btn btn-outline">Remove</button>
        </div>
    `).join('');
}

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(id) {
    const index = cart.findIndex(p => p.id === id);
    if (index !== -1) {
        const removedItem = cart.splice(index, 1)[0];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${removedItem.name} removed from cart.`);
    } else {
        alert("This item is not in your cart.");
    }
}

function setupCart() {
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Countdown Timer
function initCountdown() {
    const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now

    setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }, 1000);
}

// Theme Toggle
function setupTheme() {
    const toggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if(currentTheme === 'dark') toggle.classList.replace('fa-moon', 'fa-sun');
    }

    toggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggle.classList.toggle('fa-sun');
        toggle.classList.toggle('fa-moon');
    });
}

// Scroll Effects
window.onscroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";

    const backToTop = document.getElementById('back-to-top');
    if (winScroll > 300) backToTop.style.display = "block";
    else backToTop.style.display = "none";
};

// Form Validation
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent to sumitcoder@gmail.com.');
    e.target.reset();
});
