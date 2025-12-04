import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from "./components/ProtectedRoutes";

import AuthPage from './pages/AuthPage';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Projects from './pages/Projects';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Messages from './pages/MessagePage';
import CourseDetails from "./pages/CourseDetails";
import AssignmentDetails from "./pages/student/AssignmentDetails";
import ProjectDetails from "./pages/student/ProjectDetails";
import QuizDetails from "./pages/student/QuizDetails";
import Profile from "./pages/Profile";
import ProfessorSubmissions from "./pages/professor/Submissions";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <Assignments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Student Pages */}
          <Route
            path="/student/assignments/:id"
            element={
              <ProtectedRoute>
                <AssignmentDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/quizzes/:id"
            element={
              <ProtectedRoute>
                <QuizDetails />
              </ProtectedRoute>
            }
          />

          {/* Professor */}
          <Route
            path="/professor/assignments/:itemId/submissions"
            element={
              <ProtectedRoute>
                <ProfessorSubmissions itemType="assignment" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/projects/:itemId/submissions"
            element={
              <ProtectedRoute>
                <ProfessorSubmissions itemType="project" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/professor/quizes/:itemId/submissions"
            element={
              <ProtectedRoute>
                <ProfessorSubmissions itemType="quiz" />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
