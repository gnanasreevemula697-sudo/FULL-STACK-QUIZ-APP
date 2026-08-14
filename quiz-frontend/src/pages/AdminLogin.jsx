import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username.trim() === "admin" && password === "admin123") {
        localStorage.setItem("quizAdminAuth", "true");
        setError("");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password.");
      }
    }, 600);
  };

  return (
    <div className="container">
      <div className="admin-login-hero">
        <div className="login-card glass">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36 }}>🔒</div>
            <h1>Admin Portal</h1>
            <p className="text-muted">Welcome back, Admin</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />

            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
              <button type="button" className="btn btn-outline-dark" style={{ position: 'absolute', right: 6, top: 6 }} onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
              <button className="submit-btn" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
              <Link to="/" className="btn btn-secondary">← Back to Quiz</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;