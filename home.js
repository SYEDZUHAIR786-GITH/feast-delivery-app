// Sample restaurant data
const restaurants = [
    {
        id: 1,
        name: 'Maki Kitchen',
        category: 'sushi',
        rating: 4.4,
        deliveryTime: 20,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'SwiftPizza',
        category: 'pizza',
        rating: 4.6,
        deliveryTime: 30,
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Foodies Hut',
        category: 'burger',
        rating: 4.4,
        deliveryTime: 30,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561911?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Pizza Hut',
        category: 'pizza',
        rating: 4.8,
        deliveryTime: 30,
        image: 'https://images.unsplash.com/photo-1571407970349-bc98e127284d?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Cafe Shine',
        category: 'drinks',
        rating: 4.8,
        deliveryTime: 30,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Al-Minour',
        category: 'burger',
        rating: 4.5,
        deliveryTime: 20,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'Dominos',
        category: 'pizza',
        rating: 4.8,
        deliveryTime: 30,
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: "Writer's Cafe",
        category: 'drinks',
        rating: 4.2,
        deliveryTime: 25,
        image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop'
    },
    {
        id: 9,
        name: "Brownie's Heaven",
        category: 'dessert',
        rating: 4.8,
        deliveryTime: 20,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    },
    {
        id: 10,
        name: 'Spice Kingdom',
        category: 'starters',
        rating: 4.6,
        deliveryTime: 35,
        image: 'https://images.unsplash.com/photo-1585521537821-f3ec6f830068?w=400&h=300&fit=crop'
    }
];

let currentCategory = 'all';
let filteredRestaurants = restaurants;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'splash-login.html';
        return;
    }

    // Display user name in greeting
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        const userName = userEmail.split('@')[0];
        const greetingText = document.getElementById('greetingText');
        greetingText.textContent = `Hi, ${userName.charAt(0).toUpperCase() + userName.slice(1)}! Find your favorite food`;
    }

    renderRestaurants(restaurants);
    setupSearchFunctionality();
});

// Render restaurants
function renderRestaurants(restaurantsToRender) {
    const grid = document.getElementById('restaurantsGrid');
    grid.innerHTML = '';

    restaurantsToRender.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        grid.appendChild(card);
    });
}

// Create restaurant card element
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
        <div class="restaurant-info">
            <div class="restaurant-name">
                ${restaurant.name}
            </div>
            <div class="restaurant-meta">
                <div class="restaurant-rating">
                    <span class="rating-star">⭐</span>
                    <span>${restaurant.rating}</span>
                </div>
                <div class="delivery-time">📍 ${restaurant.deliveryTime} mins</div>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        // Store selected restaurant in session storage
        sessionStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
        // Navigate to menu page
        window.location.href = 'restaurant-menu.html';
    });

    return card;
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;

    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Filter restaurants
    if (category === 'all') {
        filteredRestaurants = restaurants;
    } else {
        filteredRestaurants = restaurants.filter(r => r.category === category);
    }

    renderRestaurants(filteredRestaurants);
}

// Search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {
            if (currentCategory === 'all') {
                renderRestaurants(restaurants);
            } else {
                renderRestaurants(filteredRestaurants);
            }
            return;
        }

        const searchResults = restaurants.filter(r => 
            r.name.toLowerCase().includes(searchTerm)
        );

        renderRestaurants(searchResults);
    });
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
