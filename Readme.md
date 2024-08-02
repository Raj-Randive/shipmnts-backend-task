# Automated Email Scheduling APP

[Hosted link](https://shipmnts-backend-automated-email.onrender.com/)

## List of APIs created:

- Create User

  - A user can register himself on the system.
  - A user can login on the system (With JWT Tokens Stored in the Cookies).
  - A user can logout on the system.

- Schedule Emails
  - User can schedule emails using date and time (UTC).
    - A user can send Recipient's email address, Subject of the email, Body of the email and Attachments along with the emails.
  - User can get all the upcoming schedule emails.
  - User can get specific scheduled email by the Id stored in the database.
  - User can cancel scheduled emails.

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/) latest version.

## Getting started

- Clone the repository

```
git clone https://github.com/Raj-Randive/shipmnts-backend-task.git
```

- Install dependencies

```
cd <project_name>
npm install
```

#### Create .env file at root directory of this project

```
# Environment vars

This project uses the following environment variables:

| Name       | Description                     | Default Value |
| ---------- | ------------------------------- | ------------- |
| PORT       | Enter PORT No.                  | 4000          |
| MONGO_URI  | Enter your MongoDB Database URL |               |
| JWT_SECRET | Enter your own JWT SECRET Key   |               |

```

- Build and run the project

```
npm run dev
```

#### Navigate to `http://localhost:<your specified port>`

## Project Structure

The folder structure of this app is explained below:

| Name              | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| **config**        | Contains the configuration files for database connection and jsonwebtoken  |
| **controllers**   | Contains the functions to handle various express routes.                   |
| **middlewares**   | Contains middleware functions to handle request processing.                |
| **models**        | Defines the data schema and interacts with the database.                   |
| **routes**        | Defines the application's routing logic.                                   |
| .env              | Contains environment variables for the app.                                |
| .gitignore        | Specifies which files and directories to ignore in git.                    |
| index.js          | Entry point to the express app.                                            |
| package-lock.json | Contains the exact versions of npm dependencies installed.                 |
| package.json      | Contains project metadata and npm dependencies, and defines build scripts. |

## Api Endpoints

### Specification

This app contains the following API endpoints.

### User Endpoints

`POST` /api/auth/register/ <br/>
`POST` /api/auth/login/ <br/>
`POST` /api/auth/logout/ <br/>

### Schedule Email Endpoints

`POST` /api/emails/schedule-email <br/>
`GET` /api/emails/scheduled-emails <br/>
`GET` /api/emails/scheduled-emails/{id} <br/>
`DELETE` /api/emails/scheduled-emails/{id} <br/>
