const BASE_URL = "http://localhost:8080";

// User APIs
async function loginUser(userId) {
    const response = await fetch(`${BASE_URL}/users/login?userId=${userId}`);
    return await response.json();
}

async function registerUser(name, email) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
    return await response.json();
}

// Ride APIs
async function publishRide(rideData) {
    const response = await fetch(`${BASE_URL}/rides/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideData)
    });
    return await response.json();
}

async function searchRides(source, destination) {
    const response = await fetch(`${BASE_URL}/rides/search?source=${source}&destination=${destination}`);
    return await response.json();
}

async function getMyRides(userId) {
    const response = await fetch(`${BASE_URL}/rides/my?userId=${userId}`);
    return await response.json();
}

async function cancelRide(rideId) {
    const response = await fetch(`${BASE_URL}/rides/cancel?rideId=${rideId}`, {
        method: 'POST'
    });
    return await response.json();
}

// Booking APIs
async function bookRide(bookingData) {
    const response = await fetch(`${BASE_URL}/booking/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    });
    return await response.json();
}

async function getMyBookings(userId) {
    const response = await fetch(`${BASE_URL}/booking/my?userId=${userId}`);
    return await response.json();
}

async function cancelBooking(bookingId, userId) {
    const response = await fetch(`${BASE_URL}/booking/cancel?bookingId=${bookingId}&userId=${userId}`, {
        method: 'POST'
    });
    return await response.json();
}

// Utility functions
function saveUserId(userId) {
    localStorage.setItem('userId', userId);
}

function getUserId() {
    return localStorage.getItem('userId');
}

function clearSession() {
    localStorage.removeItem('userId');
}

function checkAuth() {
    const userId = getUserId();
    if (!userId) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    clearSession();
    window.location.href = 'login.html';
}

// UI Helper functions
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.content');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function disableButton(button) {
    button.disabled = true;
    button.textContent = 'Loading...';
}

function enableButton(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}
