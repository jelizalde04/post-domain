# Get-Post-By-ID Microservice

## Overview

The **Get-Post-By-ID Microservice** allows authenticated users to retrieve a specific post associated with their pet by providing the post's unique ID. This microservice ensures that only authorized users can access the post data.

---

## Functionality

- **Get Post By ID**: Authenticated users can retrieve a specific post by its ID, which is associated with a pet.
- **JWT Authentication**: Ensures that the user is authorized to access the post.
- **Data Retrieval**: Fetches a specific post from the database and returns it in the response.
- **Swagger Documentation**: Provides interactive API documentation to test and explore the endpoints.
 
---

## Architecture

The **Get-Post-By-ID** microservice follows a typical Node.js/Express architecture with JWT-based authentication.

### Technologies Used

- **Node.js** with **Express.js**: Framework for building RESTful APIs.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Swagger**: For documenting and testing API endpoints.
- **CORS**: To allow cross-origin requests from external clients.


---

## Folder Structure

```plaintext
get-post-by-id/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── app.js                # Entry point to start the server
├── config/               # Configuration files (e.g., database, JWT)
├── controllers/          # Logic for handling requests
├── Dockerfile            # Docker configuration to containerize the app
├── middlewares/          # Middlewares for JWT authentication and other functionality
├── models/               # Database models for posts
├── package-lock.json     # Dependency lock file
├── package.json          # NPM configuration file
├── routes/               # API routes for the microservice
├── swagger.js            # Swagger configuration for API documentation
└── tests/                # Unit and integration tests
```

---

## Routes

### `GET /posts/{postId}`

**Description:** Retrieves a specific post associated with a pet by the `postId`.

#### Request Parameters

- `postId` (string, UUID): The ID of the post to retrieve.

#### Responses

- `200 OK`: Returns the post details.
- `401 Unauthorized`: Invalid or missing JWT token.
- `404 Not Found`: The post with the given `postId` does not exist.

#### Example Request (curl)

```bash
curl -X GET http://localhost:4004/posts/<postId> \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example Response

```json
{
  "postId": "1234-abcd",
  "petId": "<PET_ID>",
  "content": "This is a post",
  "imageUrl": "https://your-bucket-name.s3.amazonaws.com/1234-abcd_post_image.jpg",
  "createdAt": "2025-06-23T14:00:00Z"
}
```

---

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **JWT Token**: Ensure you have a valid JWT token for authentication.

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jelizalde04/get-post-by-id.git
   cd get-post-by-id
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in the root directory with the following variables:
   ```
   JWT_SECRET=your_secret_key
   # Other necessary variables like database credentials
   ```

4. **Start the server:**
   ```bash
   node app.js
   ```

5. **Access Swagger Documentation:**  
   Once the server is running, you can access the Swagger documentation for the API at:  
   [http://localhost:4004/api-docs-getPostById](http://localhost:4004/api-docs-getPostById)

---

## Authentication

This microservice uses JWT for authentication. The JWT token is passed in the `Authorization` header as `Bearer <token>`.  
The token is verified through a middleware before proceeding with any post retrieval.

### JWT Authentication Middleware

The `authenticateToken` middleware verifies the JWT token sent with each request. If the token is valid, the request is allowed to proceed. Otherwise, the server returns a `401 Unauthorized` error.

---

## CORS (Cross-Origin Resource Sharing)

CORS is enabled in this microservice to allow the front-end client to make API requests from different origins.  
The following middleware is used:

```javascript
app.use(cors());
```

This ensures that requests from different domains are allowed to interact with the API.

---

## Swagger Documentation

The Swagger configuration for this microservice is set up in the `swagger.js` file.  
It generates the API documentation, which is available at `/api-docs-getPostById` after the server is running.

The documentation includes details about the available endpoints, request bodies, and response formats.

---

## Contribution

Feel free to fork this repository, make improvements, and submit pull requests. If you encounter any issues or have suggestions, open an issue