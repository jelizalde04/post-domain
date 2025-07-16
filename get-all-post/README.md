# Get-All-Post Microservice

## Overview

The **Get-All-Post Microservice** allows authenticated users to retrieve all posts associated with pets. This microservice ensures that only authorized users can access the posts, providing a list of all available posts stored in the database.

---

## Functionality

- **Get All Posts**: Authenticated users can retrieve a list of all posts associated with pets.
- **JWT Authentication**: Ensures that the user is authorized to access the posts.
- **Data Retrieval**: Fetches all posts from the database and returns them in the response.
- **Swagger Documentation**: Provides interactive API documentation to test and explore the endpoints.
 
---

## Architecture

The **Get-All-Post** microservice follows a typical Node.js/Express architecture with JWT-based authentication.

### Technologies Used

- **Node.js** with **Express.js**: Framework for building RESTful APIs.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Swagger**: For documenting and testing API endpoints.
- **CORS**: To allow cross-origin requests from external clients.

---

## Folder Structure

```plaintext
get-all-post/
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

### `GET /posts`

**Description:** Retrieves all posts associated with pets.

#### Responses

- `200 OK`: A list of all posts is returned.
- `401 Unauthorized`: Invalid or missing JWT token.

#### Example Request (curl)

```bash
curl -X GET http://localhost:4003/posts \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example Response

```json
[
  {
    "postId": "1234-abcd",
    "petId": "<PET_ID>",
    "content": "This is a post",
    "imageUrl": "https://your-bucket-name.s3.amazonaws.com/1234-abcd_post_image.jpg",
    "createdAt": "2025-06-23T14:00:00Z"
  },
  {
    "postId": "5678-efgh",
    "petId": "<PET_ID>",
    "content": "Another post",
    "imageUrl": "https://your-bucket-name.s3.amazonaws.com/5678-efgh_post_image.jpg",
    "createdAt": "2025-06-24T14:00:00Z"
  }
]
```

---

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **JWT Token**: Ensure you have a valid JWT token for authentication.

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jelizalde04/get-all-post.git
   cd get-all-post
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
   [http://localhost:4003/api-docs-getAllPosts](http://localhost:4003/api-docs-getAllPost)

---

## Authentication

This microservice uses JWT for authentication. The JWT token is passed in the `Authorization` header as `Bearer <token>`.  
The token is verified through a middleware before proceeding with the request to retrieve the posts.

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
It generates the API documentation, which is available at `/api-docs-getAllPosts` after the server is running.

The documentation includes details about the available endpoints, request bodies, and response formats.

---

## Contribution

Feel free to fork this repository, make improvements, and submit pull requests. If you encounter any issues or have suggestions, open an issue on GitHub.

---

## License

This project is licensed under the MIT License - see the LICENSE file
