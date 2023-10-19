# E-Commerce API

This project provides a CRUD operations for both admin and customer of an online shopping website.

### Technologies          
<div>
        <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="Javascript" alt="JavaScript" width="40" height="40"/>&nbsp;
        <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
        <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>&nbsp;
        <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="PostgreSQL" width="40" height="40"/>&nbsp;
        <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express.js" width="40" height="40"/>&nbsp;
        <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="NPM" width="40" height="40"/>&nbsp;
</div>

### Dependencies used
        - bcrypt: ^5.1.1,
        - body-parser: ^1.20.2,
        - cookie-parser: ^1.4.6,
        - cors: ^2.8.5,
        - dotenv: ^16.3.1,
        - express: ^4.18.2,
        - express-session: ^1.17.3,
        - helmet: ^7.0.0,
        - morgan: ^1.10.0,
        - nodemon: ^3.0.1,
        - pg: ^8.11.3

### How to start
Initially, you must have the lastest version of node.js and postgresql(psql) on your machiene.

### Installation
1. Run the command:
**npm install** To install all the dependencies required for the project.

2. Run all the CREATE TABLE queries in db.sql in psql database client, and add some data

3. In .env, fill the following environment variables:
USER - Username of your postgresql <br>
HOST - The hostname used to connect to the database <br>
DATABASE - The database's name <br>
PASSWORD # The password used to connect to the database <br>
PORT_POSGRES - Port's number of your postgresql <br>
PORT_SERVER - The port on which express will listen on <br>
SESSION_SECRET - Your session's secret <br>

### Running the application
First, make sure that the postgresql is running. Then, go to the root's path of the project. In the terminal type **node server.js** to get the project running.

### Acknowledgement
- This project is based on Codeacademy's full-stack-enginer carrer path portfolio project.
- The goal of this project has been completed and expanded. Further update is certain.
-  The author is grateful to some references who help completing the objectives of this project. 