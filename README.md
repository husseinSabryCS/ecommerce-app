# E-Commerce Application

## Overview
This is a simple e-commerce application built using Node.js, Express, and MySQL. It allows users to browse products, place orders, and manage their accounts. Only admins can perform certain actions like adding or deleting products.

## Features
- User authentication and authorization using JWT.
- Product management (add, update, delete) with image upload.
- Order management with user details and order history.
- Secure API endpoints with role-based access control.

## Project Structure
- `controllers/`: Contains the logic for handling requests and responses.
- `routers/`: Contains the routing logic for different endpoints.
- `middleware/`: Contains custom middleware functions, including authentication.
- `uploads/`: Directory for storing uploaded product images.
- `.env`: Environment variables file (not included in the repository).

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/husseinSabryCS/ecommerce-app.git
