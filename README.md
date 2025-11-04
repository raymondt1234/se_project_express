# WTWR (What to Wear?): Back End

The WTWR (What to Wear?) backend project is a robust API service that powers the What to Wear application. This server provides the necessary endpoints to manage user profiles and clothing items, helping users make weather-appropriate clothing choices based on their location's current weather.

## Functionality

* User Authentication: Handles user registration and authorization
* Clothing Items Management: Allows users to add, delete, and get clothing items
* Error Handling: Provides clear error messages for various scenarios
* Data Storage: Manages persistent storage of user and clothing item data

## Technologies and Techniques

* **Express.js**: Web application framework for handling HTTP requests
* **MongoDB**: Database for storing user and clothing item information
* **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js
* **Node.js**: Runtime environment for executing JavaScript code
* **ESLint**: Code linting tool following Airbnb style guide
* **Nodemon**: Development utility for automatic server restart
* **bcryptjs**: Password hashing with salt for secure storage
* **cors**: Enables cross-origin requests between frontend and backend
* **jsonwebtoken**: Creates and verifies JSON Web Tokens for user authentication
* **validator**: A library of string validators and sanitizers

## Installation and Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Project
### Development mode with hot reload:
```bash
npm run dev
```
### Production mode:
```bash
npm run start
```
### Run linter:
```bash
npm run lint
```
## API Endpoints
### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Creates a new user |
| POST | /signin | Authenticates a user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users/me | Gets current user information |
| PATCH | /users/me | Update users name and avatar |

### Clothing Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /items | Gets all clothing items |
| POST | /items | Creates a new clothing item |
| DELETE | /items/:clothingItemId | Deletes a clothing item by _id |
| PUT | /items/:clothingItemId/likes | Likes a clothing item by _id |
| DELETE | /items/:clothingItemId/likes | Dislikes a clothing item by _id |


## Error Handling
The application implements comprehensive error handling including:
* Custom error classes for different types of errors
* Centralized error handling middleware
* Proper HTTP status codes and error messages
* Validation error handling for request data

## Links

Deployed Domain:
https://raymondterryswtwr.crabdance.com

https://github.com/raymondt1234/se_project_react

