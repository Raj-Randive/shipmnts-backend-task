# Project Name

[Hosted link](https://stackoverflow-by-vipul.onrender.com)

## List of APIs created:

- Create User
  - A user can register himself on the system
  - A user can login on the system
- Create Questions
  - User can add a Questions
- Update Questions
  - User can update his Questions
- Delete Questions
  - User can delete his Questions
- All Questions
  - List of the all questions with:
    - search query,
    - sort based on question text,
    - filter based on tags
- Comments:
  - Commenting system for questions and answers.
  - User can add answers by Commenting
- Votes
  - a user can vote (upvotes/downvotes) for questions and answers (comments).

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/) latest version.

## Getting started

- Clone the repository

```
git clone  <git hub url> <project_name>
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

#### Navigate to `http://localhost:4000`

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

This app containes the following API endpoints.

```
- message
- message
- message
- message
```
