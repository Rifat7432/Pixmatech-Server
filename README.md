
# Pixmatech Server

Here’s a concise project description for the file upload REST API:

---

### **Project Description: File Upload REST API**

This project implements a RESTful API for user authentication and secure file uploads. Users must register and log in to access the API's file upload feature. Each user's uploads are stored in a private directory, ensuring isolation and security.

---

### **Key Features**
1. **User Authentication**:
   - Registration and login endpoints.
   - Passwords are securely hashed using bcrypt.
   - JWT-based authentication for protected routes.

2. **File Upload**:
   - Authenticated users can upload files.
   - Each user’s uploads are stored in a separate folder structure: `/uploads/{userId}`.
   - Files are validated for type (JPEG, PNG, GIF) and size (maximum 2MB).

3. **Secure File Storage**:
   - Dynamic directory creation for each user.
   - Returns the URL of the uploaded file in the API response.

4. **Scalable Design**:
   - Implements middleware for role-based authentication and file validation.
   - Built with TypeScript for type safety and maintainability.

---

### **Technologies Used**
- **Backend**: Node.js, Express.js, TypeScript
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **File Handling**: Multer
- **Environment Management**: dotenv

---

### **How It Works**
1. **Registration & Login**:
   - Users register with a username and password.
   - Upon login, a JWT is issued to authenticate the user for subsequent requests.

2. **File Upload**:
   - Authenticated users send a file via a POST request.
   - The API validates the file and stores it in a user-specific directory.
   - The API responds with the file’s relative URL.

3. **Protected Routes**:
   - Middleware checks the JWT in the Authorization header.
   - Only authenticated users can access the file upload endpoint.

---

This project is a robust and scalable solution for file uploads, ensuring data privacy and security with modern web development practices.



## Run This Code In Your Terminal

```
git clone https://github.com/Rifat7432/Pixmatech-Server.git

cd Pixmatech-Server

npm install

```
### change .env.example to .env and edit it, and run
```
npm run dev
```



## Auth API Reference


```http
  POST /api/v2/auth/login
```
```json
{
  "email":"md@gmail.com",
  "password":"12345678"
}
```

```http
  POST /api/v2/auth/register
```
```
{
  name":"rifat",
  "email":"md@gmail.com",
  "password":"12345678"
}
```

```http
  POST /api/v2/auth/register-admin
```
```
{
  name":"rifat",
  "email":"md@gmail.com",
  "password":"12345678"
}
```


```http
  POST /api/v2/auth/change-password
```
```
{
  name":"rifat",
  "email":"md@gmail.com",
  "password":"12345678"
}
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |


```http
  POST /api/v2/auth/refresh-token
```
```
{
  name":"rifat",
  "email":"md@gmail.com",
  "password":"12345678"
}
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `cookies` | `string` | **Required**. Your API key |



## User API Reference


```http
  GET /api/v2/users/admin
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |

```http
  GET /api/v2/users/user
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |

```http
  GET /api/v2/users/
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |


```http
  GET /api/v2/users/:id
```
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |


## Gallery API Reference


```http
  POST /api/v2/gallery/upload-image
```
### Need upload image as file

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |

```http
  GET /api/v2/gallery/get-image/:userId
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Heater.Authorization` | `string` | **Required**. Your API key |




