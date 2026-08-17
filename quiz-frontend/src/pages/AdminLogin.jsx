import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/style.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/admin/login", {
        username: username.trim(),
        password: password,
      });
      localStorage.setItem("quizAdminAuth", "true");
      localStorage.setItem("quizAdminToken", res.data.token || "");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(typeof err.response.data === "string" ? err.response.data : "Invalid username or password.");
      } else {
        setError("Unable to connect to the authentication service.");
      }
    } finally {
      setLoading(false);
    }
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
            <div style={{ marginBottom: 20 }}>
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  style={{ paddingRight: 70 }}
                />
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', padding: '4px 10px', height: 'auto', minHeight: 'unset' }} 
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <Link to="/" className="btn btn-secondary" style={{ flex: 1 }}>← Back</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;