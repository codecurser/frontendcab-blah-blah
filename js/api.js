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
    console.log('Register user API call to:', `${BASE_URL}/users/register`);
    console.log('Request body:', { name, email });
    console.log('BASE_URL being used:', BASE_URL);
    
    try {
        // First test if the backend is reachable
        console.log('Testing backend connectivity...');
        const testResponse = await fetch(`${BASE_URL}/users/login?userId=1`);
        console.log('Backend test response status:', testResponse.status);
        
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        const text = await response.text();
        console.log('Response text:', text);
        
        return text;
    } catch (error) {
        console.error('API call failed:', error);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
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
