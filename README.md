# LinguaGen Quiz: AI-Powered Interactive Quizzes

<p align="center">
  A dynamic and engaging web application leveraging Google's Gemini AI to generate interactive, customizable quizzes on a wide array of topics. Perfect for language learning, trivia, or educational content creation.
</p>

## ✨ Key Features

*   **Intelligent Quiz Generation:** Harness the power of Google's Gemini AI to effortlessly create unique and relevant quiz questions and answers based on your specified topic.
*   **Interactive User Interface:** Enjoy a smooth and responsive quiz experience, built with React and styled with the efficiency of Tailwind CSS.
*   **Seamless AI Integration:** Easily connect to the Gemini API with straightforward environment variable setup.
*   **Modern Frontend Development:** Benefit from a fast and efficient development workflow powered by Vite, ensuring quick build times and hot module reloading.
*   **Type-Safe Codebase:** Developed using TypeScript for enhanced code quality, maintainability, and fewer runtime errors.
*   **Intuitive Iconography:** Integrates Lucide React for a clean, consistent, and customizable set of vector icons.

## 🚀 Getting Started

Follow these instructions to set up and run LinguaGen Quiz on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: LTS version recommended (includes npm).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Stepanda1/LingueGen-Quiz.git
    cd LingueGen-Quiz
    ```

2.  **Install project dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your Google Gemini API Key:**
    *   If you don't have one, generate a Gemini API key from [Google AI Studio](https://ai.google.dev/).
    *   Create a new file named `.env.local` in the root directory of your project.
    *   Add your API key to this file in the following format:

        ```ini
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
    *   Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key.

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Access the application:**
    Open your web browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

## 💡 Usage Guide

Once the LinguaGen Quiz application is running, you can start generating and interacting with quizzes:

1.  **Input Your Topic:** On the application's interface, you will find an input field. Enter the subject matter for which you'd like to create a quiz (e.g., "French Revolution," "Python Programming Basics," "World Capitals," "Types of Clouds").
2.  **Generate Quiz:** With your topic entered, the application will communicate with the Gemini AI to dynamically generate a set of questions and corresponding answers.
3.  **Take the Quiz:** Engage with the presented questions, select your answers, and receive immediate feedback on your performance.
4.  **Explore and Learn:** Use the quizzes as a tool for self-assessment, learning new subjects, or simply for fun!

## 🛠️ Tech Stack

LinguaGen Quiz is built using a robust and modern collection of technologies:

*   **Frontend Framework:** ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) [React](https://react.dev/) – A declarative, efficient, and flexible JavaScript library for building user interfaces.
*   **Styling:** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white) [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for rapidly building custom designs.
*   **AI Integration:** ![Google GenAI](https://img.shields.io/badge/Google_GenAI-1.x-4285F4?logo=google&logoColor=white) [@google/genai](https://www.npmjs.com/package/@google/genai) – The official client library for interacting with Google's generative AI models (Gemini).
*   **Bundler & Dev Server:** ![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white) [Vite](https://vitejs.dev/) – A next-generation frontend tooling that offers an incredibly fast development experience.
*   **Language:** ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white) [TypeScript](https://www.typescriptlang.org/) – A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality.
*   **Icon Library:** ![Lucide React](https://img.shields.io/badge/Lucide_React-0.554-F8F8F2?logo=lucide&logoColor=black) [Lucide React](https://lucide.dev/) – A beautiful and customizable icon set, packaged for React applications.
*   **Package Manager:** ![NPM](https://img.shields.io/badge/npm-9.x-CB3837?logo=npm&logoColor=white) [npm](https://www.npmjs.com/) – The default package manager for Node.js, used for managing project dependencies.

## 📁 Project Structure

The project follows a typical structure for a modern React application built with Vite and TypeScript:

```
.
├── src/                    # Contains all the core application source code (React components, AI logic, styles, etc.)
│   └── ...
├── .env.local              # Local environment variables (e.g., your GEMINI_API_KEY)
├── index.html              # The main HTML entry point for the application.
├── package.json            # Defines project metadata, scripts, and dependencies.
├── tsconfig.json           # TypeScript compiler configuration.
└── README.md               # The file you're currently reading.
```
