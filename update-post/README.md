# Update-Post Microservice

## Overview

The **Update-Post Microservice** allows authenticated users to update an existing post associated with their pet. This microservice ensures that only the responsible user can update their pet's post. The updated content and image URL are saved in the database.

---

## Functionality

- **Update Post**: Authenticated users can update an existing post associated with a pet by providing the post's ID, new content, and optionally, a new image.
- **JWT Authentication**: Ensures that the user is authorized to update the post.
- **Image Upload**: If a new image is provided, it will be uploaded to **Amazon S3**, and the new image URL will replace the old one in the database.
- **Data Update**: The post's content and image URL are updated in the database.
- **Swagger Documentation**: Provides interactive API documentation to test and explore the endpoints.
 
---

## Architecture

The **Update-Post** microservice follows a typical Node.js/Express architecture with JWT-based authentication and AWS S3 for image storage.

### Technologies Used

- **Node.js** with **Express.js**: Framework for building RESTful APIs.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Amazon S3**: For image file storage and updates.
- **Swagger**: For documenting and testing API endpoints.
- **CORS**: To allow cross-origin requests from external clients.

---

## Folder Structure

```plaintext
update-post/
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

### `PUT /posts/update`

**Description:** Updates an existing post associated with a pet. The post can be updated with new content and/or a new image.

#### Request Body

- `postId` (string, UUID): The ID of the post to update.
- `content` (string): The updated content for the post.
- `image` (file, optional): The new image to be uploaded.

#### Responses

- `200 OK`: Returns the updated post with its new content and image URL.
- `400 Bad Request`: Missing fields or invalid data.
- `401 Unauthorized`: Invalid or missing JWT token.
- `403 Forbidden`: User is not authorized to update the specified post.

#### Example Request (curl)

```bash
curl -X PUT http://localhost:4002/posts/update \
-H "Authorization: Bearer <JWT_TOKEN>" \
-F "content=This is the updated content" \
-F "image=@/path/to/updated_image.jpg" \
-F "postId=<POST_ID>"
```

#### Example Response

```json
{
  "postId": "1234-abcd",
  "petId": "<PET_ID>",
  "content": "This is the updated content",
  "imageUrl": "https://your-bucket-name.s3.amazonaws.com/1234-abcd_updated_post_image.jpg",
  "updatedAt": "2025-06-23T15:00:00Z"
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
   git clone https://github.com/jelizalde04/update-post.git
   cd update-post
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
   [http://localhost:4002/api-docs-updatePost](http://localhost:4002/api-docs-updatePost)

---

## Authentication

This microservice uses JWT for authentication. The JWT token is passed in the `Authorization` header as `Bearer <token>`.  
The token is verified through a middleware before proceeding with any post update.

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
It generates the API documentation, which is available at `/api-docs-updatePost` after the server is running.

The documentation includes details about the available endpoints, request bodies, and response formats.

---

## Contribution

Feel free to fork this repository, make improvements, and submit pull requests. If you encounter any issues or have suggestions, open
