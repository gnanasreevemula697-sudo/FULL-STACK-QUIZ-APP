import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/style.css";

function AdminDashboard() {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const questionsResponse = await api.get("/question/allQuestions");
      setTotalQuestions(questionsResponse.data?.length || 0);

      const categoriesResponse = await api.get("/category/all");
      setTotalCategories(categoriesResponse.data?.length || 0);
    } catch (error) {
      console.error("Dashboard data error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("quizAdminAuth");
    navigate("/admin");
  };

  return (
    <div className="container">
      <header className="navbar">
        <div className="nav-left">
          <div className="brand" style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>🧠 QuizMaster</div>
          <span className="nav-links">
            <span style={{ color: 'var(--text-secondary)', fontWeight: 700, paddingLeft: 10 }}>🛠️ Admin Console</span>
          </span>
        </div>
        <div className="nav-right">
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="quiz-card">
        <h2 className="mb-3" style={{ fontSize: 28, background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
          Welcome, System Administrator
        </h2>
        <p className="text-muted" style={{ marginBottom: 16 }}>
          Manage your quiz questions, category pools, and monitor platform metrics.
        </p>

        {/* Statistics Grid */}
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon">❓</div>
            <div className="stat-details">
              <h5>Total Questions</h5>
              <h2>{totalQuestions}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon success">🗂️</div>
            <div className="stat-details">
              <h5>Total Categories</h5>
              <h2>{totalCategories}</h2>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="dashboard-actions">
          <Link to="/admin/add" className="btn btn-primary">
            ➕ Add Question
          </Link>
          
          <Link to="/admin/manage" className="btn btn-success">
            📋 Manage Questions
          </Link>

          <Link to="/admin/categories" className="btn btn-warning">
            🗂️ Manage Categories
          </Link>

          <Link to="/" className="btn btn-secondary">
            🏠 Go to App Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;