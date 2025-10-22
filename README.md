# 🛍️ Fabrico - E-Commerce Platform

A modern, full-stack e-commerce application built with React, Spring Boot, and PostgreSQL.

![Fabrico Banner](![alt text](image.png))

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Fabrico is a comprehensive e-commerce platform that allows users to browse products, add items to cart, manage their profile, and complete purchases. The application features a modern, responsive UI with seamless user experience and robust backend API.

## ✨ Features

### 🛒 Shopping Features
- **Product Catalog**: Browse 30+ products across multiple categories
- **Category Filtering**: Filter by Clothing, Footwear, Accessories, Electronics
- **Search Functionality**: Real-time product search
- **Product Details**: Detailed product information with ratings and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Wishlist**: Save favorite products for later

### 👤 User Features
- **User Authentication**: Secure JWT-based authentication
- **User Registration**: Easy signup process
- **Profile Management**: Update personal information
- **Order History**: Track past purchases
- **Responsive Design**: Works seamlessly on all devices

### 🎨 UI/UX Features
- **Modern Design**: Clean and intuitive interface
- **Featured Products**: Curated product showcase
- **Customer Testimonials**: Real customer reviews
- **Newsletter Subscription**: Stay updated with latest offers
- **Category Showcase**: Visual category browsing
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Toastify** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Spring Boot 3.4.1** - Java framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **Maven** - Dependency management

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control

## 📁 Project Structure

```
Fabrico/
├── client/                    # React frontend
│   ├── src/
│   │   ├── assets/           # Images and static files
│   │   ├── components/       # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── CategoryShowcase.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── constants/        # Centralized data constants
│   │   │   ├── products.js
│   │   │   ├── categories.js
│   │   │   ├── testimonials.js
│   │   │   └── navigation.js
│   │   ├── context/          # React Context providers
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── services/         # API services
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── styles/           # Global styles
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Public assets
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/fabrico/server/
│   │   │   │   ├── config/           # Security & JWT config
│   │   │   │   ├── controller/       # REST controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA entities
│   │   │   │   ├── repository/       # Database repositories
│   │   │   │   ├── service/          # Business logic
│   │   │   │   └── util/             # Utility classes
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/             # Unit tests
│   ├── pom.xml               # Maven dependencies
│   └── mvnw                  # Maven wrapper
│
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20.19+ or v22.12+)
- **Java** (v17 or higher)
- **PostgreSQL** (v12 or higher)
- **Maven** (v3.8+)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/RizviKazim72/Fabrico.git
cd Fabrico
```

#### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Create PostgreSQL database
psql -U postgres
CREATE DATABASE fabrico;

# Update application.properties with your database credentials
# File: src/main/resources/application.properties

# Build and run the Spring Boot application
./mvnw clean install
./mvnw spring-boot:run
```

Backend will run on: `http://localhost:8080`

#### 3. Setup Frontend

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 🔐 Environment Variables

### Backend (`application.properties`)

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/fabrico
spring.datasource.username=your_username
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=your-super-secret-key-change-this-in-production
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### Protected Endpoints

All protected endpoints require JWT token in header:
```http
Authorization: Bearer <your-jwt-token>
```

## 📸 Screenshots

### Homepage
![Homepage](![alt text](image-1.png))

### Products Page
![Products](![alt text](image-2.png))

### Shopping Cart
![Cart](![alt text](image-3.png))

### User Profile
![Profile](![alt text](image-4.png))

## 🎨 Design Features

### Components
- **Navbar**: Responsive navigation with cart counter
- **Footer**: Multi-section footer with social links
- **Product Cards**: Beautiful product display with hover effects
- **Category Cards**: Visual category showcase
- **Testimonials**: Customer review carousel
- **Newsletter**: Email subscription component

### Styling
- **Tailwind CSS**: Modern utility-first framework
- **Custom Color Scheme**: Brand colors with semantic naming
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth transitions and hover effects
- **Dark Mode Ready**: Design system supports dark mode

## 📦 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
./mvnw spring-boot:run     # Run application
./mvnw clean install       # Build project
./mvnw test                # Run tests
./mvnw clean package       # Create JAR file
```

## 🔧 Configuration

### Tailwind Configuration
Custom color palette and theme settings in `tailwind.config.js`

### API Configuration
Base URL and interceptors configured in `src/services/api.js`

### Routing
All routes defined in `src/App.jsx` using React Router

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rizvi Kazim**
- GitHub: [@RizviKazim72](https://github.com/RizviKazim72)

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- UI inspiration from modern e-commerce platforms

## 📞 Support

For support, email support@fabrico.com or open an issue in the repository.

---

**Made with ❤️ by Rizvi Kazim**
