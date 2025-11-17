import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import Courses from './pages/Courses';
import Assignments from './pages/Assignments';
import Projects from './pages/Projects';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
