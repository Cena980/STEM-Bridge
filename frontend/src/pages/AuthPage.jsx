import { useState, useEffect } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      {isLogin ? (
        <LoginForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onToggleMode={() => setIsLogin(true)} />
      )}
    </div>
  );
}

function LoginForm({ onToggleMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const {user, error} = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }
    console.log("User after sign in:", user);

    if (user) {
      navigate("/Dashboard");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-r from-gray-900 via-teal-950 to-cyan-900 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <LogIn className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8">Sign in to continue</p>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="px-4 w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="px-4 w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-gray-200 py-3 rounded-md hover:bg-blue-700  transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <button onClick={onToggleMode} className="text-blue-600 font-semibold hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
}

function SignUpForm({ onToggleMode }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signUp(email, password, fullName, role); // 👈 AuthContext

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-700 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-400 mb-2">Create Account</h2>
        <p className="text-center text-gray-400 mb-8">Join our learning platform today</p>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Full Name"
            className="px-4 w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="px-4 w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            minLength={6}
            className="px-4 w-full py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          {/* Avatar Upload */}
          <div className="px-20">
            <label className="block mb-1 text-gray-300">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full text-gray-200"
            />
            {avatar && (
              <p className="mt-2 text-sm text-gray-400">Selected: {avatar.name}</p>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <label>
              <input className="scale-150 mr-1" type="radio" value="student" checked={role === "student"} onChange={(e) => setRole(e.target.value)} /> Student
            </label>
            <label>
              <input className="scale-150 mr-1" type="radio" value="professor" checked={role === "professor"} onChange={(e) => setRole(e.target.value)} /> Professor
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-gray-200 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button onClick={onToggleMode} className="text-blue-600 font-semibold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
}

