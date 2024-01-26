# Movie Matrix REST API

## Overview

Welcome to the Movie Matrix REST API, a comprehensive solution designed to empower developers in managing and interacting with movie data effortlessly. This API is crafted with a powerful stack, including Node.js, Express, MongoDB, Mongoose, and essential middleware such as Morgan, Body-parser, Passport, and CORS.

Built to cater to the intricacies of modern movie data management, this API offers a myriad of features, focusing on intuitive data operations, robust authentication and authorization, meticulous data validation, security, and seamless cross-origin resource sharing (CORS).

## Links

- [GitHub Repository](https://github.com/livelife4ursoul/movie-matrix.git)
- [API Documentation](https://yourapi.com/documentation)

## Features

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Comedy”)
- Returns all movies in a specific genre
- Return data about a director (bio, birth year, death year) by name
- Return all movies by a specific director
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

### Data Operations Enabled by HTTP Requests

- **GET /movies**: Retrieve a list of all movies with extensive filtering options.
- **GET /movies/directors/:directorName**: Lookup movies by a specific director.
- **GET /movies/genres/:genreName**: Fetch a list of movies in a specifc genre.
- **GET /movies/:MovieID**: Fetch detailed information about a specific movie by title.
- **GET /directors/:directorName**: Lookup details about specific direcors.
- **GET /genres/:genre**: Retrieve information about a specific genre.
- **PUT /users/:Username**: User may update/change their personal informatiion.
- **POST users/:Username/movies/:MovieID** Seamlessly add a new movie to the database with a structured request.
- **DELETE users/:Username/movies/:MovieID**: Remove a movie from the database securely.
- **DELETE users/:Username**: User can delete their own profile.

### Authentication and Authorization

- **User Login (HTTP Authentication/JWT Token)**:
  - **POST /login**: Register a new user with basic HTTP authentication.
  - Credentials sent securely over HTTPS.
  - Hash passwords securely before storing them in the database.
  - Implement secure user login authentication using Passport middleware.

- **JWT-Based Authentication (All Other Requests)**:
  - Use JSON Web Tokens (JWT) for secure authentication.
  - Obtain a token by logging in with valid credentials.
  - Include the token in the Authorization header for subsequent requests.
  
### Data Validation, Security, and CORS

- Leverage Mongoose for schema validation and robust data modeling, ensuring data integrity.
- Enhance security and visibility with Morgan, logging detailed information about incoming requests.
- Implement Cross-Origin Resource Sharing (CORS) to control access to the API from different domains.
- Hash passwords securely using bcrypt for user registration and updates.
- Validate and sanitize user input data using express-validator to prevent security vulnerabilities.

## Process

### Main Technologies and Dependencies

- **Node.js**: A runtime environment for executing JavaScript code server-side.
- **Express**: A minimalist web application framework for Node.js, simplifying API development.
- **MongoDB**: A NoSQL database, chosen for its flexibility in handling unstructured data like movie information.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, simplifying interaction with the database.
- **Morgan**: An HTTP request logger middleware for Node.js, aiding in debugging and monitoring.
- **Body-parser**: Middleware to parse incoming request bodies before handling them in routes.
- **Passport**: A flexible authentication middleware for Node.js, supporting various authentication strategies.
- **CORS**: Middleware for handling Cross-Origin Resource Sharing, controlling access to the API from different domains.

### Linting and Formatting

- Maintain code consistency and quality using ESLint for static code analysis.
- Enforce code formatting standards with Prettier to enhance readability.

### API Documentation

- Provide developers with a clear understanding of available endpoints, request and response formats, authentication mechanisms, and CORS configuration.
- [API Documentation](https://yourapi.com/documentation)


## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

Before running the project, you wil need to set up your own MongoDB database.

### Setting Up Your MongoDB Database

1. Install MongoDB and set up a local or remote database.
2. Create a new MongoDB database for this project (e.g., `matrixDB`) with the following basic structure:
    ####Colletions####

   - `users`: Stores user data
     
     - `users` Collection Format:
       ```
         "user": {
        "_id": "65af56a19eed006c83b51c06",
        "Username": "sunflower",
        "Password": "$2b$10$4lDCCaG.2WKINi76vomRLOSxfxayvyrO2AZqzZr0ubP1NDWjupZF2",
        "Email": "sunflower@email.com",
        "Birthday": "2005-04-15T07:00:00.000Z",
        "TopMovies": [],
        "__v": 0
          }
       ```
   - `movies`: Stores movie data

      - `movies` Collection Format:
       ```
     {
        "Genre": {
            "Name": "Fantasy",
            "Description": "Movies with magical and otherworldly elements."
        },
        "Director": {
            "Name": "Victor Fleming",
            "Bio": "American film director known for classics like Gone with the Wind.",
            "Birth": "1889-02-23",
            "Death": "1949-01-06"
        },
        "Actors": [],
        "_id": "65aa10ae593e6870408cdae8",
        "Title": "Wizard of Oz",
        "Description": "Musical fantasy film based on the novel by L. Frank Baum.",
        "ImagePath": "wizard_of_oz.png",
        "Featured": false
        }
     ```
    ####Relationships####
     - Individual users can save movies to their own TopMovies List
       
4. Create a `.env` file:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key_for_passport

- For detailed instructions on creating a MongoDB database, please refer to the [MongoDB Documentation](https://docs.mongodb.com/manual/administration/install-community/).

**Installation**

1. _Clone the Repository:_
   Open your terminal and enter the following command to clone the repository:

   `git clone https://github.com/livelife4ursoul/movie-matrix.git`

2. _Navigate to the Project Directory:_
   Change your working directory to the project folder by entering this command:

   `cd movie-matrix`

3. _Install Dependencies:_
   Run the following command to install the required dependencies:

   `npm install`

**Configuration**

1. Open the project in your preferred code editor.

2. Open the `index.js` file.

3. Comment out the remote database connection line:

```js
// mongoose.connect(process.env.CONNECTION_URI);
```

4. Uncomment the local database connection line:

```js
//mongoose.connect('mongodb://localhost:27017/matrixDB');
```

5. Save your changes.

**Run the App:**

1. Start the project using the following command:

   `npm start`

2. Open your web browser and go to `http://localhost:8080` to access the application.

### Your Movie REST API is now up and running, ready to revolutionize your movie data management workflows!

