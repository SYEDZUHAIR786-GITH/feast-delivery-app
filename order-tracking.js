// Initialize order tracking
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'splash-login.html';
        return;
    }

    // Get order details from session
    const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

    if (!orderDetails) {
        // Redirect to home if no order placed
        window.location.href = 'home.html';
        return;
    }

    // Simulate delivery status updates
    simulateDeliveryTracking();
});

// Simulate delivery tracking
function simulateDeliveryTracking() {
    // Auto-update status every 10 seconds (for demo purposes)
    let status = 0;
    const statuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    
    // Update status randomly for demo
    const randomUpdate = () => {
        const currentStatus = document.querySelector('.timeline-item.active');
        if (currentStatus && status < statuses.length - 1) {
            currentStatus.classList.remove('active');
            currentStatus.classList.add('completed');
            
            const nextStatus = currentStatus.nextElementSibling;
            if (nextStatus) {
                nextStatus.classList.add('active');
            }
            status++;
        }
    };

    // Update every 30 seconds (demo)
    setInterval(randomUpdate, 30000);
}

// Logout function
function logout(event) {
    event.preventDefault();
    
    // Clear session data
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('orderDetails');
    
    // Redirect to splash/login page
    window.location.href = 'splash-login.html';
}
