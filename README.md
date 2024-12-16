# Movie Recommendation Backend

This is a backend application for a movie recommendation system built using Node.js, Express.js, and MongoDB. The system provides user authentication via JWT and includes functionality for recommending movies based on user queries.

## Features
- **User Authentication**: Registration and login using JWT-based authentication.
- **Movie Recommendation**: Provides movie recommendations based on user input.
- **Secure Routes**: Protected endpoints using middleware to verify tokens.

## Technologies Used
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Management**: dotenv
- **Password Security**: bcrypt for password hashing

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run the Application
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-recommendation-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the project root and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   SECRET_KEY=<your_secret_key>
   ```

4. Connect to MongoDB:
   Ensure your MongoDB server is running and that the `MONGO_URI` in your `.env` file is correct.

5. Start the application:
   ```bash
   npm start
   ```

6. The backend will run on `http://localhost:5000` by default.

## API Endpoints

### User Routes

#### POST `/api/user/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<user_id>",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "<hashed_password>"
  }
  ```

#### POST `/api/user/login`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Login successfully",
    "token": "<jwt_token>"
  }
  ```

### Movie Routes

#### GET `/api/movies/movie_recommendation`
- **Description**: Get movie recommendations.
- **Query Parameters**:
  - `title` (string): The title of the movie.
- **Headers**:
  - `Authorization`: Bearer token.
- **Response**:
  ```json
  {
    "recommendations": ["Movie 1", "Movie 2", "Movie 3"]
  }
  ```

## Middleware
- **authMiddleware**: Protects routes by verifying the JWT token provided in the `Authorization` header. Returns a `401 Unauthorized` error for invalid or expired tokens.

## Project Structure
```
project-root/
|-- config/
|   |-- db.js          # MongoDB connection setup
|
|-- controllers/
|   |-- authMiddleware.js # JWT authentication middleware
|   |-- userController.js # User authentication logic
|
|-- models/
|   |-- userModel.js      # Mongoose schema for users
|
|-- routes/
|   |-- userRouter.js     # Routes for user authentication
|   |-- movieRoutes.js    # Routes for movie recommendations
|
|-- .env                # Environment variables
|-- app.js              # Main entry point of the application
```

## Known Issues
- Token expiration is currently set to a default of 1 hour. Consider implementing a refresh token mechanism for improved UX.

## Future Improvements
- Add more sophisticated movie recommendation algorithms.
- Implement user profiles and preferences.
- Add pagination and filtering for movie results.

## License
This project is licensed under the MIT License.

# By yara Sayed
