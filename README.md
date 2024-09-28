# AI Content Scheduler and Generator

## Overview

The AI Content Scheduler and Generator is a web application that leverages artificial intelligence to generate social media content, schedule posts, and provide engagement analytics. This project consists of a React frontend and a Node.js/Express backend, with MongoDB as the database.

## Features

- AI-powered content generation for various social media platforms
- Content scheduling and management
- Analytics dashboard for tracking post engagement
- RESTful API for easy integration with other services

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- AI Integration: OpenAI GPT-3
- Additional Libraries: Axios, Mongoose, dotenv, cors

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)
- An OpenAI API key

## Installation and Setup

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

## Usage

After starting both the backend and frontend servers, you can access the application by opening a web browser and navigating to `http://localhost:3000`.

1. Generate Content: Use the content generator to create AI-powered social media posts.
2. Schedule Content: Set up posting schedules for your generated content.
3. View Analytics: Check the analytics dashboard to see engagement metrics for your posts.

## API Endpoints

- `POST /api/content/generate`: Generate new content
- `GET /api/content`: Retrieve all content
- `POST /api/scheduler/schedule`: Schedule a post
- `GET /api/scheduler/scheduled`: Get all scheduled posts
- `GET /api/analytics/summary`: Get engagement analytics summary

## Contributing

Contributions to the AI Content Scheduler and Generator are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.

## Acknowledgements

- OpenAI for providing the GPT-3 API
- The React and Node.js communities for their excellent documentation and resources
