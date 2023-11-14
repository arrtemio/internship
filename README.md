# React Internship Application

This project is a React-based application for an internship.

Tasks are created by interacting with an input at the top of the page, and all tasks are listed below the input.
Each task has its status, which can be changed by selecting the desired status from a dropdown list.
Clicking on a task opens a menu where you can add subtasks to the selected task.
If all subtasks are "Completed", the task is automatically marked as "Completed".
If a task is marked as "Completed" but you add a subtask to it, the status of the main task changes to "In progress."

## Installation

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run lint:ts`

Lints all TypeScript files in the project.

### `npm run lint:ts:fix`

Lints all TypeScript files and fixes auto-fixable issues.

### `npm run eject`

Ejects the project and provides more advanced configuration options.

## Dependencies

This project includes several dependencies for development and runtime. Also app use Material ui as ui kit and redux toolkit for state managment. Key dependencies include:

- React
- React-DOM
- React-redux
- Redux-toolkit
- Material ui
- Web Vitals

For a complete list of all dependencies, check the `package.json` file.

## Configuration

This project uses ESLint with the following configuration:

- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- TypeScript ESLint parser and plugin

Additionally, it employs Husky for Git hooks and integrates various testing libraries and TypeScript support.
