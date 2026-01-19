// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'splash-login.html';
        return;
    }

    loadProfileData();
    loadAddresses();
    loadPayments();
    loadStatistics();
});

// Load profile data from session
function loadProfileData() {
    const userEmail = sessionStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    const name = userData.name || userEmail.split('@')[0];
    const email = userEmail;

    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;

    // Set edit form values
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPhone').value = userData.phone || '';
}

// Load addresses
function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [
        {
            type: 'home',
            text: '123, MG Road, Bengaluru'
        }
    ];

    const addressList = document.getElementById('addressList');
    addressList.innerHTML = '';

    addresses.forEach((address, index) => {
        const addressItem = document.createElement('div');
        addressItem.className = 'address-item';
        addressItem.innerHTML = `
            <div class="address-item-text">
                <div class="address-type">${address.type.charAt(0).toUpperCase() + address.type.slice(1)}</div>
                <div class="address-content">${address.text}</div>
            </div>
            <div class="item-actions">
                <button class="btn-edit-item" onclick="editAddress(${index})">Edit</button>
                <button class="btn-delete-item" onclick="deleteAddress(${index})">Delete</button>
            </div>
        `;
        addressList.appendChild(addressItem);
    });
}

// Load payment methods
function loadPayments() {
    const payments = JSON.parse(localStorage.getItem('userPayments')) || [
        {
            type: 'upi',
            details: 'user@upi'
        }
    ];

    const paymentList = document.getElementById('paymentList');
    paymentList.innerHTML = '';

    payments.forEach((payment, index) => {
        const paymentItem = document.createElement('div');
        paymentItem.className = 'payment-item';
        paymentItem.innerHTML = `
            <div class="payment-item-text">
                <div class="payment-type">${payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</div>
                <div class="payment-content">****${payment.details.slice(-4)}</div>
            </div>
            <div class="item-actions">
                <button class="btn-edit-item" onclick="editPayment(${index})">Edit</button>
                <button class="btn-delete-item" onclick="deletePayment(${index})">Delete</button>
            </div>
        `;
        paymentList.appendChild(paymentItem);
    });
}

// Load statistics
function loadStatistics() {
    const orders = JSON.parse(sessionStorage.getItem('orderHistory')) || [];
    const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const loyaltyPoints = Math.floor(totalSpent / 10); // 1 point per 10 rupees

    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalSpent').textContent = `₹ ${totalSpent}`;
    document.getElementById('loyaltyPoints').textContent = loyaltyPoints;
}

// Toggle section
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = section.previousElementSibling;

    section.classList.toggle('hidden');
    header.classList.toggle('active');
}

// Edit profile
function editProfile() {
    openModal('editProfileModal');
}

// Save profile
function saveProfile(event) {
    event.preventDefault();

    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;

    const userData = {
        name: name,
        phone: phone
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    // Update display
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;

    closeModal('editProfileModal');
    alert('Profile updated successfully!');
}

// Open add address modal
function openAddAddressModal() {
    document.getElementById('addressType').value = 'home';
    document.getElementById('addressText').value = '';
    openModal('addAddressModal');
}

// Save address
function saveAddress(event) {
    event.preventDefault();

    const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
    const newAddress = {
        type: document.getElementById('addressType').value,
        text: document.getElementById('addressText').value
    };

    addresses.push(newAddress);
    localStorage.setItem('userAddresses', JSON.stringify(addresses));

    loadAddresses();
    closeModal('addAddressModal');
    alert('Address added successfully!');
}

// Delete address
function deleteAddress(index) {
    if (confirm('Are you sure you want to delete this address?')) {
        const addresses = JSON.parse(localStorage.getItem('userAddresses')) || [];
        addresses.splice(index, 1);
        localStorage.setItem('userAddresses', JSON.stringify(addresses));
        loadAddresses();
    }
}

// Open add payment modal
function openAddPaymentModal() {
    document.getElementById('paymentType').value = 'upi';
    document.getElementById('paymentDetails').value = '';
    openModal('addPaymentModal');
}

// Save payment
function savePayment(event) {
    event.preventDefault();

    const payments = JSON.parse(localStorage.getItem('userPayments')) || [];
    const newPayment = {
        type: document.getElementById('paymentType').value,
        details: document.getElementById('paymentDetails').value
    };

    payments.push(newPayment);
    localStorage.setItem('userPayments', JSON.stringify(payments));

    loadPayments();
    closeModal('addPaymentModal');
    alert('Payment method added successfully!');
}

// Delete payment
function deletePayment(index) {
    if (confirm('Are you sure you want to delete this payment method?')) {
        const payments = JSON.parse(localStorage.getItem('userPayments')) || [];
        payments.splice(index, 1);
        localStorage.setItem('userPayments', JSON.stringify(payments));
        loadPayments();
    }
}

// Save preferences
function savePreferences() {
    const preferences = {
        notifications: document.getElementById('notificationsEnabled').checked,
        promotions: document.getElementById('promotionsEnabled').checked,
        newsletter: document.getElementById('newsletterEnabled').checked
    };

    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    console.log('Preferences saved');
}

// Change password
function changePassword() {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
        alert('Password changed successfully!');
    }
}

// Open delete account modal
function openDeleteAccountModal() {
    openModal('deleteAccountModal');
}

// Delete account
function deleteAccount(event) {
    event.preventDefault();

    const confirmEmail = document.getElementById('confirmEmail').value;
    const userEmail = sessionStorage.getItem('userEmail');

    if (confirmEmail === userEmail) {
        // Clear all data
        localStorage.clear();
        sessionStorage.clear();
        alert('Account deleted successfully.');
        window.location.href = 'splash-login.html';
    } else {
        alert('Email does not match. Please try again.');
    }
}

// Copy referral code
function copyReferralCode() {
    const referralCode = document.getElementById('referralCode');
    referralCode.select();
    document.execCommand('copy');
    alert('Referral code copied to clipboard!');
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
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
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});
