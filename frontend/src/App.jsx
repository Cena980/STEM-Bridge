import { AuthProvider } from './contexts/AuthContext';
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
          <Route
            path="/professor/assignments/:itemId/submissions"
            element={<ProfessorSubmissions itemType="assignment" />}
          />
          <Route
            path="/professor/projects/:itemId/submissions"
            element={<ProfessorSubmissions itemType="project" />}
          />
          <Route
            path="/professor/quizes/:itemId/submissions"
            element={<ProfessorSubmissions itemType="quiz" />}
          />
          <Route path="/" element={<AuthPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/student/assignments/:id" element={<AssignmentDetails />} />
          <Route path="/student/projects/:id" element={<ProjectDetails />} />
          <Route path="/student/quizzes/:id" element={<QuizDetails />} />
        

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
