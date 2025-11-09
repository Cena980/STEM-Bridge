import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import CourseDetails from "./pages/CourseDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
