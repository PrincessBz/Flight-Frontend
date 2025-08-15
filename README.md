# Flight Tracker UI

A clean and modern web interface for viewing live flight departure information, built as the frontend for the [Flight Tracker API](https://github.com/PrincessBz/FlightTrackerSprint.git). This application is built with React and Vite and is deployed globally via AWS S3.


## Features
-   **Airport Selection:** Select an airport from a dynamic dropdown list populated by the backend API.
-   **Live Flight Data:** View a real-time table of flight departures for the selected airport.
-   **Enhanced User Experience:**
    -   Color-coded flight statuses for at-a-glance information (On Time, Delayed, etc.).
    -   A loading spinner is displayed while data is being fetched.
    -   Clear error messages are shown if the API connection fails.
-   **CI/CD:** Fully automated testing, building, and deployment pipeline using GitHub Actions.

---

## Technology Stack
-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A modern, high-performance frontend build tool.
-   **JavaScript (ES6+):** Utilizes modern features like `useState` and `useEffect` hooks.
-   **CSS3:** Custom styling for a clean and responsive layout.
-   **AWS S3:** For static website hosting and global deployment.
-   **GitHub Actions:** For continuous integration and deployment (CI/CD).

---

## Architecture and Design

### Component Structure
The application follows a simple, single-component architecture for this Minimum Viable Product (MVP).
-   **`App.jsx`**: This is the main and only component. It is responsible for:
    -   Managing all application state.
    -   Fetching data from the backend API.
    -   Rendering the entire user interface, including the airport selector and the flights table.

### State Management
State is managed locally within the `App` component using React Hooks:
-   `useState` is used to store the list of airports, the selected airport ID, the list of flights, and the current loading/error status.
-   `useEffect` is used to trigger API calls when the component mounts (to fetch airports) and when the selected airport changes (to fetch flights).

### API Integration
This frontend consumes the following endpoints from the backend API:
-   `GET /api/airports`: To populate the airport selection dropdown.
-   `GET /api/flights/departures?airportId={id}`: To fetch the list of departing flights for the selected airport.

---

## Local Development

### Prerequisites
* Node.js and npm
* A running instance of the backend API.

### Running Locally
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PrincessBz/Flight-Frontend.git
    cd flight-frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Connect to the backend:**
    * Ensure the backend API is running locally on `http://localhost:8080`.
    * The `fetch` calls in `src/App.jsx` are configured to point to this address for local development.
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or a similar port).

---

## Deployment
This repository is configured with a GitHub Actions workflow (`.github/workflows/main.yml`) that automatically builds and deploys the application. On a push to the `main` branch, the workflow will:
1.  Install dependencies and run tests using `vitest`.
2.  Build the production version of the React app (`npm run build`).
3.  Sync the contents of the `dist` folder to the designated **AWS S3 bucket**, making it live.

BY PRINCESS
