# Create-Post Microservice

## Overview

The **Create-Post Microservice** allows authenticated users (pet owners) to create new posts associated with a pet. Each post includes text content and an image that is uploaded to Amazon S3. This microservice ensures that only authorized users can create posts related to their pets. 

---

## Functionality

- **Create Post**: Authenticated users can create a post with a title, description, and an image.
- **JWT Authentication**: Ensures the user is authorized to create a post for the specified pet.
- **Image Upload**: Images are uploaded to **Amazon S3**, and the image URL is stored in the database along with the post content.
- **Data Storage**: The post content, image URL, and associated `petId` are stored in the database.
- **Swagger Documentation**: Provides interactive API documentation to test and explore endpoints.

---

## Architecture

The **Create-Post** microservice follows a typical Node.js/Express architecture with JWT-based authentication and AWS S3 for image storage.

### Technologies Used

- **Node.js** with **Express.js**: Framework for building RESTful APIs.
- **JWT (JSON Web Tokens)**: For user authentication.
- **Amazon S3**: For image file storage.
- **Swagger**: For documenting and testing API endpoints.
- **CORS**: To allow cross-origin requests from external clients.

---

## Folder Structure

```plaintext
create-post/
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
├── services/             # Business logic (e.g., image upload to S3)
├── swagger.js            # Swagger configuration for API documentation
└── tests/                # Unit and integration tests
```

---

## Routes

### `POST /posts`

**Description:** Creates a new post associated with a pet.

#### Request Body

- `petId` (string, UUID): Pet ID.
- `content` (string): Post content.
- `image` (file): Image to upload.

#### Responses

- `200 OK`: Returns the created post with the image URL.
- `400 Bad Request`: Missing fields or invalid data.
- `401 Unauthorized`: Invalid or missing JWT.
- `403 Forbidden`: User not authorized for the pet.

#### Example Request (curl)

```bash
curl -X POST http://localhost:4001/posts \
-H "Authorization: Bearer <JWT_TOKEN>" \
-F "content=This is a post" \
-F "image=@/path/to/image.jpg" \
-F "petId=<PET_ID>"
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

- **Node.js**: Download it [here](https://nodejs.org/).
- **Amazon S3**: Set up a bucket to store images.

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jelizalde04/post-domain.git
   cd create-post
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in the root with:
   ```
   JWT_SECRET=your_secret_key
   S3_BUCKET_NAME=your_s3_bucket_name
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   # Other required variables such as database credentials
   ```

4. **Start the server:**
   ```bash
   node app.js
   ```

5. **Access Swagger documentation:**  
   Go to [http://localhost:4001/api-docs-createPost](http://localhost:4001/api-docs-createPost) to interact with the API.

---

## Authentication

This microservice uses JWT. The token is sent in the `Authorization` header as `Bearer <token>`.  
The `authenticateToken` middleware verifies the JWT on each request. If valid, the request
