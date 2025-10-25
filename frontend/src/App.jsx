import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
