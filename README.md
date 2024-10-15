# Video API

## Overview

The Video API is a RESTful API built using Node.js , Redis and Express. It allows users to manage videos, products, and user profiles, providing the ability to create, read, update, and delete (CRUD) resources. The API also includes caching using Redis to enhance performance, comprehensive error handling, and logging functionality.

## Features

- **User Management**: Create, read, update, and delete users.
- **Product Management**: Create, read, update, and delete products.
- **Video Management**: Create, read, update, and delete videos.
- **Stateless API**: Each request is independent.
- **Caching**: Responses are cached using Redis for faster access.
- **Error Handling**: Global error handling middleware for consistent error responses.
- **Logging**: Logging of incoming requests for monitoring.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing data (accessed via Mongoose).
- **Redis**: In-memory data structure store used for caching.
- **Docker**: Used to run Redis.
- **dotenv**: For managing environment variables.
- **zod**: For validation.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (running instance or Atlas account)
- [Docker](https://www.docker.com/) (for running Redis)
- [Postman](https://www.postman.com/) (for testing the API)

## Installation

1. **Clone the Repository** :

   ```bash
   git clone "https://github.com/LakshayxBansal/Attyre-trial.git"
   cd Attyre-trial


2. **Install Dependencies** :
    ```bash
    npm install


3. **Set Up Environment Variables** :
    MONGO_URI= ""
    PORT=3000
    REDIS_PORT=6379


4. **Run Redis in Docker** :
    ```bash 
    docker run --name redis -p 6379:6379 -d redis

5. **Start the Server** :
    ```bash 
    npm run start


## API Endpoints

1. **User Endpoints**
    Create User: POST /api/v1/users
    Get All Users: GET /api/v1/users
    Get User by ID: GET /api/v1/users/:id
    Update User by ID: PUT /api/v1/users/:id
    Delete User by ID: DELETE /api/v1/users/:id

2. **Product Endpoints**
    Create Product: POST /api/v1/products
    Get All Products: GET /api/v1/products
    Get Product by ID: GET /api/v1/products/:id
    Update Product by ID: PUT /api/v1/products/:id
    Delete Product by ID: DELETE /api/v1/products/:id

3. **Video Endpoints**
    Create Video: POST /api/v1/videos
    Get All Videos: GET /api/v1/videos
    Get Video by ID: GET /api/v1/videos/:id
    Update Video by ID: PUT /api/v1/videos/:id
    Delete Video by ID: DELETE /api/v1/videos/:id


## Additional Features 
1. Database connection pooling 
2. Horizontal scaling with ASGs
3. Load balancer
4. API Gateway
5. Monitoring and Logging