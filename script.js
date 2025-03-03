document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

// const cart = [];
const cartCount = document.getElementById("cart-count");
// const cartItems = document.getElementById("cart-items");

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const itemName = this.parentElement.dataset.name;
        const itemPrice = this.parentElement.dataset.price;
        cart.push({ name: itemName, price: itemPrice });
        updateCart();
    });
});

const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.querySelector(".total-price");

let cart = {
    Pizza: { price: 250, quantity: 0 },
    Burger: { price: 150, quantity: 0 }
};

// Function to update the cart
function updateCart() {
    cartItems.innerHTML = ""; // Clear previous cart items
    let total = 0;

    Object.keys(cart).forEach(item => {
        if (cart[item].quantity > 0) {
            const itemTotal = cart[item].price * cart[item].quantity;
            total += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item}: ₹${cart[item].price} x ${cart[item].quantity} = ₹${itemTotal}</span>
            `;
            cartItems.appendChild(cartItem);
        }
    });

    // Update total price
    totalPriceElement.innerText = `Total: ₹${total}`;
}

// Event listeners for increment and decrement buttons
document.querySelectorAll(".increment").forEach(button => {
    button.addEventListener("click", function () {
        const item = this.getAttribute("data-item");
        cart[item].quantity++;
        document.querySelector(`.quantity[data-item="${item}"]`).innerText = cart[item].quantity;
        updateCart();
    });
});

document.querySelectorAll(".decrement").forEach(button => {
    button.addEventListener("click", function () {
        const item = this.getAttribute("data-item");
        if (cart[item].quantity > 0) {
            cart[item].quantity--;
            document.querySelector(`.quantity[data-item="${item}"]`).innerText = cart[item].quantity;
            updateCart();
        }
    });
});

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Sliding Advertisement
let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showNextSlide() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
    currentIndex = (currentIndex + 1) % slides.length;
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds
// const slides = document.querySelectorAll(".carousel-slide");
// let currentIndex = 0;

document.querySelector(".carousel-next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

document.querySelector(".carousel-prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
}

// Auto-slide every 3 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 3000);
