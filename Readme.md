# VideoTube Backend

A production-style Node.js backend for a YouTube-inspired video hosting platform. The application provides core features for user authentication, channel management, video publishing, comments, likes, subscriptions, playlists, and social interactions.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens)](https://jwt.io/)

## Overview

This project is a backend API built with Express and MongoDB for a modern video-sharing application. It includes secure user flows, media uploads via Cloudinary, and a modular route/controller structure designed to support a scalable content platform.

## Features

- User registration and login
- JWT authentication with access and refresh tokens
- Role-aware protected routes using middleware
- Password updates and token refresh flow
- Avatar and cover image upload
- Channel profile retrieval
- Watch history support
- Video CRUD and publish toggle flows
- Comments on videos
- Likes for videos, comments, and tweets
- Playlist creation and management
- Channel subscriptions
- Tweet creation and updates
- Dashboard stats and channel video endpoints
- Health check route

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT
- Cloudinary
- Multer
- CORS
- Cookie Parser
- dotenv

## Project Structure

```bash
.
├── src/
│   ├── app.js
│   ├── constants.js
│   ├── index.js
│   ├── controller/
│   │   ├── comment.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── healthcheck.controller.js
│   │   ├── like.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── tweet.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   ├── db/
│   │   └── index.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscription.model.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   ├── routes/
│   │   ├── comment.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── healthcheck.routes.js
│   │   ├── like.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── tweet.routes.js
│   │   ├── user.routes.js
│   │   └── video.routes.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js
├── public/
├── .env
├── package.json
├── Readme.md
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Before running the application, ensure you have:

- Node.js 18 or newer
- MongoDB instance running locally or on MongoDB Atlas
- Cloudinary account credentials
- A `.env` file configured in the project root

### Installation

```bash
git clone <repository-url>
cd VideoHosting_Backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=8000
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=videotube
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the App

Start the backend with:

```bash
node src/index.js
```

For development:

```bash
npx nodemon src/index.js
```

The server runs on the configured `PORT`, defaulting to `8000`.

## Authentication

The project uses JWT authentication and secure cookie-based session management.

- Access tokens are used for protected API routes
- Refresh tokens are used to issue a new access token
- Auth middleware verifies the token before accessing restricted endpoints

Protected endpoints require either:

- a valid `accessToken` cookie, or
- an `Authorization: Bearer <token>` header

## API Routes

Base path:

```bash
/api/v1
```

### User Endpoints

#### Public

- `POST /api/v1/users/register`
- `POST /api/v1/users/login`

#### Protected

- `POST /api/v1/users/logout`
- `POST /api/v1/users/refresh-token`
- `POST /api/v1/users/change-password`
- `GET /api/v1/users/current-user`
- `PATCH /api/v1/users/update-account`
- `PATCH /api/v1/users/avatar`
- `PATCH /api/v1/users/cover-image`
- `GET /api/v1/users/c/:username`
- `GET /api/v1/users/history`

### Video Endpoints

- `GET /api/v1/videos/`
- `POST /api/v1/videos/`
- `GET /api/v1/videos/:videoId`
- `PATCH /api/v1/videos/:videoId`
- `DELETE /api/v1/videos/:videoId`
- `PATCH /api/v1/videos/toggle/publish/:videoId`

### Comment Endpoints

- `GET /api/v1/comments/:videoId`
- `POST /api/v1/comments/:videoId`
- `PATCH /api/v1/comments/c/:commentId`
- `DELETE /api/v1/comments/c/:commentId`

### Like Endpoints

- `POST /api/v1/likes/toggle/v/:videoId`
- `POST /api/v1/likes/toggle/c/:commentId`
- `POST /api/v1/likes/toggle/t/:tweetId`
- `GET /api/v1/likes/videos`

### Playlist Endpoints

- `POST /api/v1/playlists/`
- `GET /api/v1/playlists/:playlistId`
- `PATCH /api/v1/playlists/:playlistId`
- `DELETE /api/v1/playlists/:playlistId`
- `PATCH /api/v1/playlists/add/:videoId/:playlistId`
- `PATCH /api/v1/playlists/remove/:videoId/:playlistId`
- `GET /api/v1/playlists/user/:userId`

### Subscription Endpoints

- `GET /api/v1/subscriptions/c/:channelId`
- `POST /api/v1/subscriptions/c/:channelId`
- `GET /api/v1/subscriptions/u/:subscriberId`

### Tweet Endpoints

- `POST /api/v1/tweets/`
- `GET /api/v1/tweets/user/:userId`
- `PATCH /api/v1/tweets/:tweetId`
- `DELETE /api/v1/tweets/:tweetId`

### Dashboard Endpoints

- `GET /api/v1/dashboard/stats`
- `GET /api/v1/dashboard/videos`

### Health Check

- `GET /api/v1/healthcheck/`

## Database Configuration

The database name is configured in `src/constants.js`:

```js
export const DB_NAME = "videotube";
```

The app connects to MongoDB using:

```js
mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
```

## Media Uploads

The project uses Cloudinary for media storage. File uploads are handled via Multer and the helper in `src/utils/cloudinary.js`.

- Upload the file to Cloudinary
- Store the file URL in the database
- Remove the temporary local file after upload

## Notes

- This is a backend-only project; no frontend is included.
- The project is structured as a scalable video platform API and includes modular support for multiple content features.
- Some route modules exist in the codebase and are designed to be wired into the application as the project expands.

## License

This project is licensed under the ISC license.

## Author

Built as a Node.js-based backend for a video hosting platform.
- The current `src/app.js` mounts the user routes; additional modules may need to be attached if you want the full route set active in the running app.
- There is no dedicated test script configured yet in `package.json`.

## License

This project is licensed under ISC.

## Author

Built as a Node.js-based video hosting platform backend.
