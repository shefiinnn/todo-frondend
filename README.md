# todo-frondend using react (pushed in master)
This is the frontend for a To-Do application built using React. It connects to a Django REST API backend. The following steps will guide you to set up and run the frontend locally in Visual Studio Code.

Before starting, make sure you have the following installed:

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git
- Visual Studio Code

1. Clone the Repository

   git clone https://github.com/shefiinnn/todo-frondend
   cd todo-frondend

2. Open the Project in VS Code

3. Install Project Dependencies
   npm install

4.If you are running locally you need to change every fetch urls (i have already deployed for making it easy)

fetch(`https://backend-todo-sj1x.onrender.com/api/tasks/`)

change to -> fetch ("http://127.0.0.1:8000/api/tasks/");

5. Start the Frontend Development Server
   npm start

possible errors:-

If the app crashes due to missing packages like jspdf, install them:
npm install jspdf

If npm install fails, try clearing the cache:
npm cache clean --force
rm -rf node_modules
npm install


   



