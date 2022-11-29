# DB-PROJECT

Project for Databases. (Hotel Management System)

# Please Note:

- Make sure to go over the main-server file with great depth. I have commented every file with great detail.

  ## Steps to run the server on your local machine

  1. Navigate to db.js file in the utilities folder, and replace the following credentials with yours. You could make a .env file (as we had in the second assignment).

     ```js
     const pool = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "", // add your own
       database: "authorization",
     });
     ```

     > We won't be running this server on the localhost as soon as we deploy our app on https://railway.app/ or heroku (whatever suits best)

  2. Now, execute the following queries on your localhost's server:

     ```sql
     CREATE DATABASE authorization;

     CREATE TABLE users(
         user_id SERIAL,
         user_name VARCHAR(255) NOT NULL,
         user_email VARCHAR(255) NOT NULL UNIQUE,
         user_password VARCHAR(255) NOT NULL,
         PRIMARY KEY(user_id)
     );
     ```

  3. We have our database and relevant tables ready.
  4. Install the necessary dependencies by typing the following command in your terminal:
     ```bash
     npm install
     ```
     For these files to properly get installed, make sure you are in the root (main-server) directory and have access to the package.json file
  5. Assuming all your dependencies are installed, it's time to start the server.
  6. Type the following (while staying in the rood-dir -- main-server):
     ```bash
     npm run start
     ```
  7. The following output must appear on your terminal:

     ```bash
     > server@1.0.0 start
     > nodemon index.js

     [nodemon] 2.0.20
     [nodemon] to restart at any time, enter `rs`
     [nodemon] watching path(s): *.*
     [nodemon] watching extensions: js,mjs,json
     [nodemon] starting `node index.js`
     SERVER IS LISTENING AT 5000
     ```

  8. Make sure `nodemon` is installed as well.
  9. Okay, your server is running now.
