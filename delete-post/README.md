# Delete-Post Microservice

## Overview

The **Delete-Post Microservice** allows authenticated users to delete posts associated with their pets. This microservice ensures that only authorized users (responsible for the pets) can delete posts, and it also removes the corresponding image from **Amazon S3**.

---

## Functionality

- **Delete Post**: Authenticated users can delete a post associated with their pet by providing the post's ID.
- **JWT Authentication**: Ensures that the user is authorized to delete a post associated with the specified pet.
- **Image Removal**: The image associated with the deleted post is also removed from Amazon S3.
- **Data Deletion**: The post is removed from the database.
- **Swagger Documentation**: Provides interactive API documentation to test and explore the endpoints.
 
---

## Architecture

The **Delete-Post** microservice follows a typical Node.js/Express architecture with JWT-based authentication and AWS S3 for image storage.

### Technologies Used

- **Node.js** with **Express.js**: Framework for building RESTful APIs.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Amazon S3**: For image file storage and deletion.
- **Swagger**: For documenting and testing API endpoints.
- **CORS**: To allow cross-origin requests from external clients.

---

## Folder Structure

```plaintext
delete-post/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── app.js                # Entry point to start the server
├── config/               # Configuration files (e.g., database, S3, JWT)
├── controllers/          # Logic for handling requests
├── Dockerfile            # Docker configuration to containerize the app
├── middlewares/          # Middlewares for JWT authentication and other functionality
├── models/               # Database models for posts and pets
├── package-lock.json     # Dependency lock file
├── package.json          # NPM configuration file
├── routes/               # API routes for the microservice
├── services/             # Business logic (e.g., image removal from S3)
├── swagger.js            # Swagger configuration for API documentation
└── tests/                # Unit and integration tests
```

---

## Routes

### `DELETE /posts/delete/{postId}`

**Description:** Deletes a post associated with a pet. The image associated with the post is also removed from Amazon S3.

#### Request Parameters

- `postId` (string, UUID): The ID of the post to be deleted.

#### Responses

- `200 OK`: The post has been successfully deleted.
- `400 Bad Request`: Missing postId or invalid data.
- `401 Unauthorized`: Invalid or missing JWT token.
- `403 Forbidden`: User does not have permission to delete the post.

#### Example Request (curl)

```bash
curl -X DELETE http://localhost:4005/posts/delete/<postId> \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Example Response

```json
{
  "message": "Post successfully deleted",
  "postId": "<postId>"
}
```

---

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **Amazon S3**: Set up an Amazon S3 bucket to store and remove images.

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jelizalde04/delete-post.git
   cd delete-post
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in the root directory with the following variables:
   ```
   JWT_SECRET=your_secret_key
   S3_BUCKET_NAME=your_s3_bucket_name
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   # Other necessary variables like database credentials
   ```

4. **Start the server:**
   ```bash
   node app.js
   ```

5. **Access Swagger Documentation:**  
   Once the server is running, you can access the Swagger documentation for the API at:  
   [http://localhost:4005/api-docs-deletePost](http://localhost:4005/api-docs-deletePost)

---

## Authentication

This microservice uses JWT for authentication. The JWT token is passed in the `Authorization` header as `Bearer <token>`.  
The token is verified through a middleware before proceeding with any deletion.

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
It generates the API documentation, which is available at `/api-docs-deletePost` after the server is running.

The documentation includes details about the available endpoints, request bodies, and response formats.

---

## Contribution

Feel free to fork, improve, and submit pull requests. For suggestions or issues, open an issue on GitHub.
