// Menu data
const menuData = {
    recommended: [
        {
            id: 1,
            name: 'Salmon Sushi',
            price: 299,
            description: 'Fresh salmon over seasoned rice',
            image: 'https://images.unsplash.com/photo-1617694712202-cd23f4e97edd?w=400&h=400&fit=crop'
        },
        {
            id: 2,
            name: 'Spicy Tuna Roll',
            price: 349,
            description: 'Tuna mixed with spicy mayo, rolled with rice and seaweed',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
        }
    ],
    nigiri: [
        {
            id: 3,
            name: 'Tuna Nigiri',
            price: 259,
            description: 'Fresh tuna over seasoned sushi rice',
            image: 'https://images.unsplash.com/photo-1617694712202-cd23f4e97edd?w=400&h=400&fit=crop'
        },
        {
            id: 4,
            name: 'Salmon Nigiri',
            price: 279,
            description: 'Premium salmon over seasoned rice',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop'
        },
        {
            id: 5,
            name: 'Ebi Nigiri',
            price: 289,
            description: 'Sweet shrimp over seasoned rice',
            image: 'https://images.unsplash.com/photo-1612874742237-415221a20198?w=400&h=400&fit=crop'
        }
    ],
    rolls: [
        {
            id: 6,
            name: 'California Roll',
            price: 329,
            description: 'Crab, avocado, and cucumber rolled with seasoned rice',
            image: 'https://images.unsplash.com/photo-1617694712202-cd23f4e97edd?w=400&h=400&fit=crop'
        },
        {
            id: 7,
            name: 'Spicy Tuna Roll',
            price: 349,
            description: 'Tuna mixed with spicy mayo, rolled with rice and seaweed',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
        },
        {
            id: 8,
            name: 'Philadelphia Roll',
            price: 399,
            description: 'Salmon and cream cheese with cucumber',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop'
        },
        {
            id: 9,
            name: 'Dragon Roll',
            price: 429,
            description: 'Shrimp tempura topped with avocado and eel sauce',
            image: 'https://images.unsplash.com/photo-1617694712202-cd23f4e97edd?w=400&h=400&fit=crop'
        }
    ],
    sashami: [
        {
            id: 10,
            name: 'Salmon Sashami',
            price: 399,
            description: 'Fresh premium salmon slices',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop'
        },
        {
            id: 11,
            name: 'Tuna Sashami',
            price: 389,
            description: 'Fresh premium tuna slices',
            image: 'https://images.unsplash.com/photo-1617694712202-cd23f4e97edd?w=400&h=400&fit=crop'
        },
        {
            id: 12,
            name: 'Mixed Sashami',
            price: 549,
            description: 'Assorted fresh fish including salmon, tuna, and ebi',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop'
        }
    ]
};

let currentCategory = 'recommended';
let selectedItem = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'splash-login.html';
        return;
    }

    // Get selected restaurant from session storage
    const selectedRestaurant = JSON.parse(sessionStorage.getItem('selectedRestaurant'));

    if (selectedRestaurant) {
        // Update restaurant header with selected restaurant data
        document.getElementById('headerImage').src = selectedRestaurant.image;
        document.getElementById('restaurantNameHeader').textContent = selectedRestaurant.name;
        
        const statsHtml = `
            <span class="stat-item">
                <span class="star">⭐</span> ${selectedRestaurant.rating}
            </span>
            <span class="divider">•</span>
            <span class="stat-item">⏱️ ${selectedRestaurant.deliveryTime} mins</span>
            <span class="divider">•</span>
            <span class="stat-item">💵 ₹200 for two</span>
        `;
        document.getElementById('restaurantStatsHeader').innerHTML = statsHtml;
    }

    renderMenuItems('recommended');
});

// Render menu items for a category
function renderMenuItems(category) {
    currentCategory = category;
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    const items = menuData[category] || [];

    items.forEach(item => {
        const menuItem = createMenuItemElement(item);
        menuContainer.appendChild(menuItem);
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
        <div class="menu-item-details">
            <div>
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <span class="menu-item-price">₹${item.price}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
            </div>
            <div class="menu-item-footer">
                <button class="btn-add" onclick="openAddModal(${item.id})">ADD</button>
            </div>
        </div>
    `;
    return div;
}

// Switch category
function switchCategory(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Render items
    renderMenuItems(category);
}

// Open add to cart modal
function openAddModal(itemId) {
    // Find item across all categories
    let item = null;
    for (const category in menuData) {
        const found = menuData[category].find(i => i.id === itemId);
        if (found) {
            item = found;
            break;
        }
    }

    if (!item) return;

    selectedItem = item;

    // Populate modal
    document.getElementById('modalItemImage').src = item.image;
    document.getElementById('modalItemName').textContent = item.name;
    document.getElementById('modalItemDescription').textContent = item.description;
    document.getElementById('modalItemPrice').textContent = `₹${item.price}`;
    document.getElementById('quantity').value = 1;

    // Show modal
    document.getElementById('addToCartModal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('addToCartModal').classList.remove('active');
    selectedItem = null;
}

// Increase quantity
function increaseQuantity() {
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
}

// Decrease quantity
function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart
function addToCart() {
    if (!selectedItem) return;

    const quantity = parseInt(document.getElementById('quantity').value);

    // Check if item already in cart
    const existingItem = cart.find(item => item.id === selectedItem.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...selectedItem,
            quantity: quantity
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show success message
    alert(`${selectedItem.name} added to cart!`);

    // Close modal
    closeModal();
}

// View cart
function viewCart() {
    window.location.href = 'cart.html';
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
    const modal = document.getElementById('addToCartModal');
    if (event.target === modal) {
        closeModal();
    }
});
