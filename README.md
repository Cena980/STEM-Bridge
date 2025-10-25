🧩 STEM Bridge — Full Stack App
📖 Overview

This project consists of a Node.js + Express backend and a React frontend.
The backend connects to a MySQL database and provides API endpoints for user authentication, courses, and other app features.

⚙️ Prerequisites

Before running the app, make sure you have installed:

Node.js (LTS)
 — comes with npm

MySQL Server

A code editor (recommended: VS Code
)

(Optional) Git
 if you’re cloning from GitHub

Check installation:

node -v
npm -v
mysql --version

🗄️ MySQL Setup

Start MySQL Server (e.g. from XAMPP, WAMP, or MySQL Workbench).
import the mysql backup file available in the main directory.

navigate to backend>db.js
change the database configuration based on your mysql configuration
  host: "localhost",
  user: "username",
  password: "password",
  database: "databasename"

🧠 Backend Setup

Navigate into the backend folder:

cd backend


Install dependencies:

npm install


Start the backend:

node server.js


or (if nodemon is configured):

npm run dev


✅ The backend should run on http://localhost:5000

🖥️ Frontend Setup

Open a new terminal and go to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:

npm start


✅ The app will open at http://localhost:3000

🔗 Connecting Frontend & Backend

Make sure your frontend points to your backend API.
If using environment variables, create a .env file inside /frontend:

REACT_APP_API_URL=http://localhost:5000


Then restart the frontend.

🚀 Common Commands
Purpose	Command
Install dependencies	npm install
Start backend	node server.js
Start backend (dev)	npm run dev
Start frontend	npm start
🧰 Troubleshooting

MySQL error ECONNREFUSED → Check MySQL service is running.

Cannot connect to backend → Verify backend port (5000) and API URL in .env.

Port already in use → Stop existing Node or React processes:

npx kill-port 3000
npx kill-port 5000


Database not found → Recheck your database name and credentials in database.js.

👥 Contributors

Ali Sina Nazari — Lead Developer

[Teammate’s Name] — Frontend / Backend Developer