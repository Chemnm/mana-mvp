# Mana MVP Project 1.3

Welcome to the Mana MVP project repository. This project is a monorepo containing the complete codebase for the Mana application, including the backend server, the AI service, and the frontend web application.

## Project Structure

The project is organized into three main components, located in their respective directories at the root of this repository:

### 1. `/backend`

This directory contains the core backend server for the Mana application.

-   **Technology:** It is a Node.js application built with the Express.js framework.
-   **Purpose:** It serves as the primary API for the frontend application, handling data requests, user authentication, and business logic. It connects to a MongoDB database to store and retrieve data.
-   **CI/CD:** The backend is configured for continuous deployment. Any push to the `main` branch that includes changes within the `/backend` directory will automatically trigger a GitHub Actions workflow. This workflow builds a Docker container, pushes it to Amazon ECR, and deploys the new version to **AWS App Runner**.

### 2. `/mana_ai_lambda`

This directory contains the serverless function that powers Navi, the AI assistant.

-   **Technology:** This is a Node.js function designed to be deployed as an **AWS Lambda** function.
-   **Purpose:** It handles all AI-related tasks, including processing user messages and generating intelligent responses. It integrates with the Gemini API and connects to the MongoDB database to fetch relevant data for providing context-aware answers.
-   **CI/CD:** The Lambda function is also set up for continuous deployment. Any push to the `main` branch with changes in the `/mana_ai_lambda` directory will trigger a GitHub Actions workflow. This workflow installs dependencies, packages the code into a zip file, and deploys it to AWS Lambda.

### 3. `/react/mana_dashboard`

This directory contains the frontend application for the Mana dashboard.

-   **Technology:** It is a modern web application built with **React**.
-   **Purpose:** It provides the user interface for the Mana platform, allowing users to view dashboards, analyze data, and interact with the Navi AI assistant. It communicates with the `/backend` server to fetch and display data.
-   **Deployment:** The frontend is set up for continuous deployment through **AWS Amplify**. It is connected to this GitHub repository and will automatically build and deploy any changes pushed to the `main` branch.

---

This centralized structure allows for streamlined development and automated deployments, ensuring that all components of the Mana MVP are always up-to-date.
