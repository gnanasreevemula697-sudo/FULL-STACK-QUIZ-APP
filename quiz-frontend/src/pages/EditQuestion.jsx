import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/style.css";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [catsRes, questionRes] = await Promise.all([
          api.get("/category/all"),
          api.get(`/question/${id}`),
        ]);

        setCategories(catsRes.data || []);

        const found = questionRes.data;
        if (!found) {
          setMessage({ type: "danger", text: "Question not found." });
          return;
        }

        // Ensure category is object
        if (!found.category) found.category = null;

        setQuestion(found);
      } catch (err) {
        console.error(err);
        setMessage({ type: "danger", text: "Failed to load question." });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    const selected = categories.find((c) => String(c.id) === String(val));
    setQuestion((prev) => ({ ...prev, category: selected || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/question/update", question);
      navigate("/admin/manage", { state: { message: "Question updated successfully." } });
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Failed to update question." });
    }
  };

  return (
    <div className="container">
      <h1 className="title">✏️ Edit Question</h1>

      <div className="quiz-card">
        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

        {loading || !question ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category *</label>
              <select className="form-control" name="category" value={question.category?.id || ""} onChange={handleCategoryChange}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Question *</label>
              <input className="form-control" name="question" value={question.question || ""} onChange={handleChange} />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Option 1</label>
                <input className="form-control" name="option1" value={question.option1 || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Option 2</label>
                <input className="form-control" name="option2" value={question.option2 || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Option 3</label>
                <input className="form-control" name="option3" value={question.option3 || ""} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Option 4</label>
                <input className="form-control" name="option4" value={question.option4 || ""} onChange={handleChange} />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Correct Answer *</label>
              <input className="form-control" name="correctAnswer" value={question.correctAnswer || ""} onChange={handleChange} />
            </div>

            <div className="mt-3">
              <label className="form-label">Explanation</label>
              <textarea className="form-control" name="explanation" rows="4" value={question.explanation || ""} onChange={handleChange} />
            </div>

            <div className="d-flex gap-3 mt-4">
              <button className="submit-btn" type="submit">Save Changes</button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/admin/manage')}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditQuestion;
