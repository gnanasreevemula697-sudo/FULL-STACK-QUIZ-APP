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
      <h1 className="title">🛠 Admin Dashboard</h1>

      <div className="quiz-card">
        <h2 className="mb-3">Welcome Admin</h2>

        <p className="text-muted">
          Manage your quiz content and categories from here.
        </p>

        {/* Statistics */}
        <div className="row g-3 mb-4">

          <div className="col-md-4">
            <div className="quiz-card border">
              <h5>Total Questions</h5>
              <h2>{totalQuestions}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="quiz-card border">
              <h5>Total Categories</h5>
              <h2>{totalCategories}</h2>
            </div>
          </div>

        </div>

        {/* Admin Actions */}
        <div className="d-flex gap-3 flex-wrap">

          <Link
            to="/admin/add"
            className="btn btn-primary"
          >
            ➕ Add Question
          </Link>

          <Link
            to="/admin/manage"
            className="btn btn-success"
          >
            📋 Manage Questions
          </Link>

          <Link
            to="/admin/categories"
            className="btn btn-warning"
          >
            🗂️ Manage Categories
          </Link>

          <button
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>

          <Link
            to="/"
            className="btn btn-outline-dark"
          >
            🏠 Home
          </Link>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;