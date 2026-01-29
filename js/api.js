// Detect environment and set appropriate BASE_URL
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? "http://localhost:8080" 
    : "https://unfair-skiagraphic-miranda.ngrok-free.dev"; // ngrok URL

// User APIs
async function loginUser(userId) {
    const response = await fetch(`${BASE_URL}/users/login?userId=${userId}`);
    return await response.json();
}

async function registerUser(name, email) {
    console.log('=== REGISTRATION DEBUG ===');
    console.log('BASE_URL:', BASE_URL);
    console.log('Full URL:', `${BASE_URL}/users/register`);
    console.log('Request data:', { name, email });
    
    try {
        // Simple test first - just check if we can reach the backend
        console.log('Testing basic connectivity...');
        
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            mode: 'cors',
            body: JSON.stringify({ name, email })
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        console.log('Response headers:', [...response.headers.entries()]);
        
        const text = await response.text();
        console.log('Response body:', text);
        
        return text;
    } catch (error) {
        console.error('=== FETCH ERROR ===');
        console.error('Error type:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        
        // Additional debugging
        console.log('User agent:', navigator.userAgent);
        console.log('Current origin:', window.location.origin);
        
        throw error;
    }
}

// Ride APIs
async function publishRide(rideData) {
    const response = await fetch(`${BASE_URL}/rides/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: parseInt(rideData.userId),
            source: rideData.source,
            destination: rideData.destination,
            seats: rideData.totalSeats,
            fare: rideData.farePerSeat
        })
    });
    return await response.text();
}

async function searchRides(source, destination) {
    const response = await fetch(`${BASE_URL}/rides/search?source=${source}&destination=${destination}`);
    return await response.json();
}

async function getAllRides() {
    const response = await fetch(`${BASE_URL}/rides/all`);
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
    return await response.text();
}

// Booking APIs
async function bookRide(bookingData) {
    const response = await fetch(`${BASE_URL}/bookings/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            rideId: parseInt(bookingData.rideId),
            userId: parseInt(bookingData.userId),
            seats: bookingData.seatsBooked
        })
    });
    return await response.text();
}

async function getMyBookings(userId) {
    const response = await fetch(`${BASE_URL}/bookings/my?userId=${userId}`);
    return await response.json();
}

async function cancelBooking(bookingData) {
    const response = await fetch(`${BASE_URL}/bookings/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            bookingId: parseInt(bookingData.bookingId),
            userId: parseInt(bookingData.userId)
        })
    });
    return await response.text();
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
