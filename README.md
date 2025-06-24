# Post-Domain 

## Overview
The **Post-Domain** handles the creation, management, and retrieval of posts related to pets. This domain includes microservices that allow users (responsible parties for pets) to create, update, delete, and view posts associated with their pets. The domain is composed of five key microservices:

1. **create-post**: Create a new post associated with a pet.
2. **delete-post**: Delete an existing post associated with a pet.
3. **get-all-post**: Retrieve all posts associated with pets.
4. **get-post-by-id**: Retrieve a specific post by its ID.
5. **update-post**: Update an existing post associated with a pet.

## Architecture

The **Post-Domain** architecture is based on **microservices**. Each microservice is responsible for a specific operation related to posts, such as creating, deleting, or retrieving posts.

### Technologies Used:
- **Node.js** with **Express.js**: Framework used for building RESTful APIs.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Amazon S3**: For uploading and storing post images.
- **Swagger**: For documenting and testing API endpoints.
- **CORS**: Enabled to allow cross-origin requests from various clients.

### Microservices Overview:

#### 1. **Create-Post Microservice**
- **Functionality**: This microservice allows an authenticated user (responsible for a pet) to create a new post associated with a pet. The post includes text content and an image uploaded to Amazon S3.
- **Endpoint**: `POST /posts`
- **Swagger Documentation**: Available at `/api-docs` for interactive API testing.
  
#### 2. **Delete-Post Microservice**
- **Functionality**: This microservice allows an authenticated user to delete an existing post associated with their pet. The image associated with the post is also removed from Amazon S3.
- **Endpoint**: `DELETE /posts/delete/{postId}`
- **Swagger Documentation**: Available at `/api-docs-deletePost` for interactive API testing.

#### 3. **Get-All-Post Microservice**
- **Functionality**: This microservice retrieves all posts associated with pets. It ensures that only authenticated users can access the data.
- **Endpoint**: `GET /posts`
- **Swagger Documentation**: Available at `/api-docs-getAllPosts` for interactive API testing.

#### 4. **Get-Post-By-ID Microservice**
- **Functionality**: This microservice retrieves a specific post by its ID.
- **Endpoint**: `GET /posts/{postId}`
- **Swagger Documentation**: Available at `/api-docs-getPostById` for interactive API testing.

#### 5. **Update-Post Microservice**
- **Functionality**: This microservice allows an authenticated user to update an existing post associated with a pet.
- **Endpoint**: `PUT /posts/update`
- **Swagger Documentation**: Available at `/api-docs-updatePost` for interactive API testing.

## How It Works

1. **JWT Authentication**:
   Each microservice requires **JWT** authentication. Users must be authenticated before performing any operations (creating, deleting, updating, or retrieving posts).
   - The JWT token is passed in the request header (Authorization: Bearer `<token>`).
   - Middleware checks the token and validates the responsible user.

2. **Amazon S3 Image Storage**:
   - Images for posts are uploaded to **Amazon S3**. The `PostService` handles uploading images, generating unique names for them (using the `postId`), and storing the URL in the database.
   - The URL of the uploaded image is then associated with the post.

3. **CORS**:
   - **Cross-Origin Resource Sharing (CORS)** is enabled to allow external client applications to interact with the APIs.

4. **Swagger UI**:
   - Swagger is used to document and test the API endpoints interactively. It provides a user-friendly interface for developers to understand and interact with the endpoints.

## Installation and Setup

### Prerequisites:
- **Node.js**: Make sure you have **Node.js** installed. You can download it from [here](https://nodejs.org/).
- **npm**: The Node package manager, which comes with Node.js.

### Setup

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/jelizalde04/post-domain.git
   cd post-domain
   ```

2. **Instala las dependencias**  
   Ejecuta el siguiente comando en cada directorio de microservicio para instalar las dependencias requeridas:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**  
   Crea un archivo `.env` en la raíz de cada microservicio con las siguientes variables:
   ```
   JWT_SECRET=tu_clave_secreta
   S3_BUCKET_NAME=nombre_de_tu_bucket_s3
   # Otras variables necesarias como credenciales de base de datos
   ```

4. **Inicia los microservicios**  
   Cada microservicio puede iniciarse individualmente ejecutando:
   ```bash
   node app.js
   ```

   Puertos por defecto para cada servicio:
   - Create-Post: `4001`
   - Delete-Post: `4005`
   - Get-All-Post: `4003`
   - Get-Post-By-ID: `4004`
   - Update-Post: `4002`

5. **Accede a la documentación Swagger**  
   Después de iniciar los servicios, puedes acceder a la documentación Swagger UI en los siguientes endpoints:
   - Create-Post: `GET /api-docs-createPost/`
   - Delete-Post: `GET /api-docs-deletePost`
   - Get-All-Post: `GET /api-docs-getAllPosts`
   - Get-Post-By-ID: `GET /api-docs-getPostById`
   - Update-Post: `GET /api-docs-updatePost`