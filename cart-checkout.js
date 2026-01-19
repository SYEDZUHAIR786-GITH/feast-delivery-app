// Constants
const DELIVERY_CHARGE = 40;
const TAX_RATE = 0.05;

// Initialize cart and checkout
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'splash-login.html';
        return;
    }

    const page = document.body.className || getPageName();
    
    if (page === 'cart-page' || document.getElementById('cartItems')) {
        renderCartItems();
    }

    if (page === 'checkout-page' || document.getElementById('checkoutItemTotal')) {
        updateCheckoutSummary();
    }
});

// Get page name
function getPageName() {
    const path = window.location.pathname;
    if (path.includes('cart.html')) return 'cart-page';
    if (path.includes('checkout.html')) return 'checkout-page';
    return '';
}

// Render cart items
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">Your cart is empty</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div>
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-description">${item.description}</p>
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
            </div>
            <div class="quantity-control">
                <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

// Update quantity
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let itemTotal = 0;
    cart.forEach(item => {
        itemTotal += item.price * item.quantity;
    });

    const taxes = Math.round(itemTotal * TAX_RATE);
    const grandTotal = itemTotal + DELIVERY_CHARGE + taxes;

    if (document.getElementById('itemTotal')) {
        document.getElementById('itemTotal').textContent = `₹ ${itemTotal}`;
    }
    if (document.getElementById('deliveryCharge')) {
        document.getElementById('deliveryCharge').textContent = `₹ ${DELIVERY_CHARGE}`;
    }
    if (document.getElementById('taxes')) {
        document.getElementById('taxes').textContent = `₹ ${taxes}`;
    }
    if (document.getElementById('grandTotal')) {
        document.getElementById('grandTotal').textContent = `₹ ${grandTotal}`;
    }
}

// Update checkout summary
function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let itemTotal = 0;
    cart.forEach(item => {
        itemTotal += item.price * item.quantity;
    });

    const taxes = Math.round(itemTotal * TAX_RATE);
    const grandTotal = itemTotal + DELIVERY_CHARGE + taxes;

    if (document.getElementById('checkoutItemTotal')) {
        document.getElementById('checkoutItemTotal').textContent = `₹ ${itemTotal}`;
    }
    if (document.getElementById('checkoutDeliveryCharge')) {
        document.getElementById('checkoutDeliveryCharge').textContent = `₹ ${DELIVERY_CHARGE}`;
    }
    if (document.getElementById('checkoutTaxes')) {
        document.getElementById('checkoutTaxes').textContent = `₹ ${taxes}`;
    }
    if (document.getElementById('checkoutGrandTotal')) {
        document.getElementById('checkoutGrandTotal').textContent = `₹ ${grandTotal}`;
    }
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    window.location.href = 'checkout.html';
}

// Edit address
function editAddress(event) {
    event.preventDefault();
    document.getElementById('addressModal').classList.add('active');
}

// Close address modal
function closeAddressModal() {
    document.getElementById('addressModal').classList.remove('active');
}

// Save address
function saveAddress(event) {
    event.preventDefault();
    
    const addressType = document.getElementById('addressType').value;
    const addressText = document.getElementById('addressText').value;

    // Store address in session
    sessionStorage.setItem('deliveryAddress', JSON.stringify({
        type: addressType,
        text: addressText
    }));

    // Update display
    document.querySelector('.address-type').textContent = addressType.charAt(0).toUpperCase() + addressType.slice(1);
    document.querySelector('.address-text').textContent = addressText;

    closeAddressModal();
    alert('Address updated successfully!');
}

// Place order
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Generate order ID
    const orderId = '#FT' + Math.floor(Math.random() * 10000);

    // Store order details
    const orderDetails = {
        orderId: orderId,
        items: cart,
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString(),
        totalAmount: calculateGrandTotal(cart)
    };

    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    // Clear cart
    localStorage.removeItem('cart');

    // Redirect to order tracking
    window.location.href = 'order-tracking.html';
}

// Calculate grand total
function calculateGrandTotal(cart) {
    let itemTotal = 0;
    cart.forEach(item => {
        itemTotal += item.price * item.quantity;
    });
    const taxes = Math.round(itemTotal * TAX_RATE);
    return itemTotal + DELIVERY_CHARGE + taxes;
}

// Logout function
function logout(event) {
    event.preventDefault();
    
    // Clear session data
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    
    // Redirect to splash/login page
    window.location.href = 'splash-login.html';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('addressModal');
    if (modal && event.target === modal) {
        closeAddressModal();
    }
});
