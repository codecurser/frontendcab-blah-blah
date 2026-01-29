// Detect environment and set appropriate BASE_URL
const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? "http://localhost:8080" 
    : "https://unfair-skiagraphic-miranda.ngrok-free.dev"; // ngrok URL

async function readJsonOrText(response) {
    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();
    const trimmed = raw.trim();
    if (!trimmed) {
        return '';
    }
    if (contentType.includes('application/json')) {
        try {
            return JSON.parse(trimmed);
        } catch (_) {
            return trimmed;
        }
    }
    return trimmed;
}

// User APIs
async function loginUser(userId) {
    const response = await fetch(`${BASE_URL}/users/login?userId=${encodeURIComponent(userId)}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        },
        mode: 'cors'
    });

    const body = await readJsonOrText(response);
    if (!response.ok) {
        throw new Error(typeof body === 'string' ? body : `Login failed (${response.status})`);
    }

    // Backend returns boolean, handle different response types
    if (typeof body === 'boolean') {
        return body;
    }
    if (typeof body === 'number') {
        return body === 1;
    }
    if (typeof body === 'string') {
        return body.toLowerCase() === 'true' || body === '1';
    }
    return false;
}

async function registerUser(name, email) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        },
        mode: 'cors',
        body: JSON.stringify({ name, email })
    });

    const body = await readJsonOrText(response);
    if (!response.ok) {
        throw new Error(typeof body === 'string' ? body : `Registration failed (${response.status})`);
    }

    // Backend returns int (userId), convert to string
    if (typeof body === 'number') {
        return String(body);
    }
    if (typeof body === 'string') {
        return body;
    }
    return '';
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

// Helper to set backend URL from browser console
// Usage: setBackendUrl('https://abc123.loca.lt')
function setBackendUrl(url) {
    localStorage.setItem('CAB_API_BASE_URL', url);
    console.log('Backend URL updated to:', url);
    console.log('Refresh the page to apply changes.');
}

// Expose helper globally
window.setBackendUrl = setBackendUrl;
