# Video API

## Overview

The Video API is a RESTful API built using Node.js , Redis and Express. It allows users to manage videos, products, and user profiles, providing the ability to create, read, update, and delete (CRUD) resources. The API also includes caching using Redis to enhance performance, comprehensive error handling, and logging functionality.

## Features

- **User Management**: Create, read, update, and delete users.
- **Product Management**: Create, read, update, and delete products.
- **Video Management**: Create, read, update, and delete videos.
- **Stateless API**: Each request is independent.
- **Versioning**: Added versions to each API
- **Caching**: Responses are cached using Redis for faster access.
- **Error Handling**: Global error handling middleware for consistent error responses.
- **Logging**: Logging of incoming requests for monitoring.
- **Containerized**: Can be easily controlled with container orchestration tools.

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


2. **Set Up Environment Variables** :
    MONGO_URI= ""
    PORT=3000

## Setup Using Docker
3. **Docker Compose Setup**
    ```bash
    Add mongodb uri in docker-compose.yml file 


4. **Docker build** :
    ```bash 
    docker-compose up --build


5. **Access the API** :
    ```bash 
    http://localhost:3000/api/v1/products


6. **Stop the Services**
    ```bash
    docker-compose down

## Manual setup

3. **Install Dependencies** :
    ```bash
    npm install

4. **Run Redis in Docker** :
    
    ```bash 
    docker run --name redis -p 6379:6379 -d redis

5. **Start the Server** :
    ```bash 
    npm run start



## API Endpoints

1. **User Endpoints**
    ```bash 
    Create User: POST /api/v1/users
    ```bash 
    Get All Users: GET /api/v1/users
    ```bash 
    Get User by ID: GET /api/v1/users/:id
    ```bash 
    Update User by ID: PUT /api/v1/users/:id
    ```bash 
    Delete User by ID: DELETE /api/v1/users/:id

2. **Product Endpoints**
    ```bash 
    Create Product: POST /api/v1/products
    ```bash 
    Get All Products: GET /api/v1/products
    ```bash 
    Get Product by ID: GET /api/v1/products/:id
    ```bash 
    Update Product by ID: PUT /api/v1/products/:id
    ```bash 
    Delete Product by ID: DELETE /api/v1/products/:id

3. **Video Endpoints**
    ```bash 
    Create Video: POST /api/v1/videos
    ```bash 
    Get All Videos: GET /api/v1/videos
    ```bash 
    Get Video by ID: GET /api/v1/videos/:id
    ```bash 
    Update Video by ID: PUT /api/v1/videos/:id
    ```bash 
    Delete Video by ID: DELETE /api/v1/videos/:id


## Additional Features 
1. Database connection pooling 
2. Horizontal scaling with ASGs
3. Load balancer
4. API Gateway
5. Monitoring and Logging