# Wanderlust - Airbnb Clone

Wanderlust is a web application inspired by the popular accommodation booking platform Airbnb. It aims to provide users with a seamless experience for finding and booking accommodations worldwide.

## Features

- Accommodation Listings: Hosts can create and manage listings for their properties, including details such as pricing, availability, and amenities.
- Booking System: Users can book accommodations, manage their bookings, and communicate with hosts.
- User Authentication: Secure user authentication and authorization system for managing user accounts and sessions.
- Image Upload: Integration with Cloudinary for efficient storage and management of property images.
- Google Maps Integration: Utilizes the Google Maps API for location services, allowing users to view property locations, nearby attractions, and directions.

## Technologies Used

- MongoDB: NoSQL database for storing accommodation listings, user data, and booking information.
- Node.js: Server-side JavaScript runtime environment for building scalable and efficient web applications.
- Express.js: Web application framework for Node.js, used for handling routing and middleware.
- HTML, Bootstrap, JavaScript: Frontend technologies for creating the user interface and client-side functionality.
- Cloudinary: Cloud-based image management platform for storing and serving property images efficiently.
- Google Maps API: Provides mapping and location services, including displaying property locations and nearby attractions.

## Architecture

The project follows the Model-View-Controller (MVC) architecture, separating the application into three interconnected components:
- Model: Defines the data structure and interacts with the database (MongoDB).
- View: Renders the user interface using HTML, Bootstrap, and JavaScript.
- Controller: Handles user requests, performs business logic, and interacts with both the model and view.

