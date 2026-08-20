import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import "../styles/style.css";

function ManageQuestions() {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [filterCategoryId, setFilterCategoryId] = useState("");

  useEffect(() => {
    fetchCategories();

    const initialCategory = searchParams.get("categoryId") || "";
    setFilterCategoryId(initialCategory);
    fetchQuestions(initialCategory);
  }, [searchParams]);

  const fetchQuestions = async (categoryId = "") => {
    try {
      setLoading(true);

      let res;

      if (categoryId) {
        res = await api.get(`/question/category/${categoryId}`);
      } else {
        res = await api.get("/question/allQuestions");
      }

      setQuestions(res.data || []);
      setMessage({ type: "", text: "" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Failed to load questions." });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category/all");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const handleFilterChange = (e) => {
    const id = e.target.value;
    setFilterCategoryId(id);
    fetchQuestions(id);
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      await api.delete(`/question/delete/${id}`);
      setQuestions((prev) => prev.filter((question) => question.id !== id));
      setMessage({ type: "success", text: "Question deleted successfully." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: err.response?.data || "Delete failed. Please try again." });
    }
  };

  // Read message from navigation state (e.g., after edit)
  useEffect(() => {
    if (location.state?.message) {
      setMessage({ type: "success", text: location.state.message });
      // clear the history state message to avoid repetition
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="container">
      <h1 className="title">📋 Manage Questions</h1>
      <p className="text-center text-secondary">Manage and organize your quiz questions</p>

      <div className="quiz-card">
        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

        {loading ? (
          <p>Loading questions...</p>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div>
                  <select value={filterCategoryId} onChange={handleFilterChange} className="form-control" style={{ display: 'inline-block', width: 220 }}>
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input placeholder="Search Questions 🔍" className="form-control" style={{ width: 320 }} onChange={(e) => {
                    const q = e.target.value.toLowerCase();
                    if (!q) return fetchQuestions(filterCategoryId);
                    setQuestions((prev) => prev.filter(item => (item.question || '').toLowerCase().includes(q)));
                  }} />
                </div>
              </div>

              <div>
                <Link to="/admin/add" className="btn btn-primary">➕ Add Question</Link>
              </div>
            </div>

            <div className="table-responsive">
            <table className="question-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Correct Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
               <tbody>
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "24px", color: "var(--muted)" }}>
                      No questions found. Add a new question or adjust the filters.
                    </td>
                  </tr>
                ) : (
                  questions.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td style={{ maxWidth: 420 }}>{q.question}</td>
                      <td>
                        <span className="badge-category">{q.category?.name || "Uncategorized"}</span>
                      </td>
                      <td>{q.correctAnswer}</td>
                      <td>
                        <div className="d-flex gap-2 flex-wrap">
                          <Link to={`/admin/edit-question/${q.id}`} className="btn btn-primary btn-sm">Edit</Link>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteQuestion(q.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </>
        )}

        <div className="mt-4">
          <Link to="/admin/dashboard" className="btn btn-secondary">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Inline edit removed - editing is a separate page */}
    </div>
  );
}

export default ManageQuestions;