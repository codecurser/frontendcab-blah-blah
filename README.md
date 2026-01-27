# Cab Booking System - Frontend

A complete web-based frontend for a cab booking system built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **User Authentication**: Login and registration system
- **Ride Management**: Publish, search, and manage rides
- **Booking System**: Book seats with automatic fare calculation
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic UI updates based on backend responses

## 📁 Project Structure

```
cab-booking-frontend/
├── login.html          # User login page
├── register.html       # User registration page
├── dashboard.html      # Main dashboard with navigation
├── publish-ride.html   # Form to publish new rides
├── search-ride.html    # Search and book rides
├── my-rides.html       # View and manage published rides
├── my-bookings.html    # View and manage bookings
├── css/
│   └── style.css       # Responsive styling
└── js/
    └── api.js          # API utility functions
```

## 🔧 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: Fetch API for backend communication
- **LocalStorage**: Session management

## 🌐 Backend Integration

The frontend communicates with a Java Spring Boot backend via REST APIs:

**Base URL**: `http://localhost:8080`

### User APIs
- `POST /users/login?userId=` - User login
- `POST /users/register` - User registration

### Ride APIs
- `POST /rides/publish` - Publish new ride
- `GET /rides/search?source=&destination=` - Search rides
- `GET /rides/my?userId=` - Get user's rides
- `POST /rides/cancel?rideId=` - Cancel ride

### Booking APIs
- `POST /booking/book` - Book ride seats
- `GET /booking/my?userId=` - Get user's bookings
- `POST /booking/cancel?bookingId=&userId=` - Cancel booking

## 🚀 Getting Started

1. **Start Backend Server**: Ensure your Java Spring Boot backend is running on `localhost:8080`

2. **Open Frontend**: Open `login.html` in a web browser

3. **Register/Login**: Create a new account or login with existing userId

4. **Start Using**: Navigate through the dashboard to use all features

## 🔐 Session Management

- User sessions are managed using `localStorage`
- `userId` is stored after successful login/registration
- Automatic redirect to login page if not authenticated
- Logout clears the session and redirects to login

## 📱 Responsive Design

The application features a fully responsive design that works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 UI Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Interactive dashboard cards
- Data tables with hover effects
- Success/error alerts with auto-dismiss
- Loading states during API calls

## 🔒 Security Considerations

- No direct database access
- All communication via HTTPS APIs
- Input validation on frontend
- Session-based authentication

## 🚀 Deployment

### Static Hosting
The frontend can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Local Development
Simply open `login.html` in a web browser after starting the backend server.

## 📝 API Response Format

The frontend expects JSON responses in this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## 🐛 Troubleshooting

1. **CORS Issues**: Ensure backend allows requests from your frontend domain
2. **Connection Refused**: Verify backend is running on port 8080
3. **Authentication Errors**: Check localStorage for valid userId
4. **API Failures**: Check browser console for detailed error messages

## 📄 License

This project is part of a cab booking system demonstration.
