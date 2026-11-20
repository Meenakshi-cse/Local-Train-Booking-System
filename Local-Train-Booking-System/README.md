# Local Train Booking System

A web-based train ticket reservation and management interface built with HTML5, CSS3, and JavaScript.

## Features
- **User Authentication**: Registration and Login with client-side credential persistence.
- **Ticket Booking**: Selection of source, destination, travel date, passenger category, and automatic seat allocation.
- **Ticket Management**: Instant confirmation view, ticket printing, and PDF download via jsPDF.
- **Responsive Design**: Clean UI with custom styling and background visuals.

## Live Demo
Deployed with **GitHub Pages**:
Navigate to the root URL to start using the application.

## Project Structure
```
├── index.html                   # Root entry point redirecting to Login
├── local-train/
│   ├── assets/train.jpeg        # Train background visual asset
│   ├── css/style1.css           # Global stylesheet
│   ├── pages/
│   │   ├── project_page1.html   # Login page
│   │   ├── project_page2.html   # Registration page
│   │   ├── project_page3.html   # User Dashboard
│   │   ├── project_page4.html   # Ticket Confirmation & PDF generator
│   │   └── project_page_booking.html # Booking form
│   └── script.js                # Core booking logic and station validation
└── .github/workflows/deploy.yml # GitHub Actions workflow for Pages deployment
```
