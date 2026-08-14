import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";

function AddQuestion() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [question, setQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    explanation: "",
    category: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [submitting, setSubmitting] = useState(false);

  // Load categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category/all");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories:", error);

      setMessage({
        type: "danger",
        text: "Failed to load categories.",
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !question.question.trim() ||
      !question.option1.trim() ||
      !question.option2.trim() ||
      !question.option3.trim() ||
      !question.option4.trim() ||
      !question.correctAnswer.trim() ||
      !question.explanation.trim() ||
      !question.category
    ) {
      setMessage({
        type: "danger",
        text: "Please fill in all fields.",
      });

      return;
    }

    try {
      setSubmitting(true);
      setMessage({
        type: "",
        text: "",
      });

      // Find selected category object
      const selectedCategory = categories.find(
        (category) => String(category.id) === String(question.category)
      );

      if (!selectedCategory) {
        setMessage({
          type: "danger",
          text: "Please select a valid category.",
        });

        return;
      }

      const questionData = {
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,

        category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
        },
      };

      await api.post("/question/add", questionData);

      setMessage({
        type: "success",
        text: "Question added successfully.",
      });

      setQuestion({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        explanation: "",
        category: "",
      });

      setTimeout(() => {
        navigate("/admin/manage");
      }, 800);
    } catch (err) {
      console.error("Add question error:", err);

      setMessage({
        type: "danger",
        text:
          err.response?.data?.message ||
          "Failed to add question. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">➕ Add New Question</h1>
      <p className="text-center text-white">Create a question and assign it to a category.</p>

      <form className="quiz-card" onSubmit={handleSubmit}>
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Question */}
        <div className="mb-3">
          <label className="form-label">Question</label>

          <input
            className="form-control"
            type="text"
            name="question"
            value={question.question}
            onChange={handleChange}
            placeholder="Enter your question"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>

          <select
            className="form-control"
            name="category"
            value={question.category}
            onChange={handleChange}
            disabled={loadingCategories}
          >
            <option value="">
              {loadingCategories
                ? "Loading categories..."
                : "Select a category"}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Options */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Option 1</label>

            <input
              className="form-control"
              type="text"
              name="option1"
              value={question.option1}
              onChange={handleChange}
              placeholder="Enter option 1"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Option 2</label>

            <input
              className="form-control"
              type="text"
              name="option2"
              value={question.option2}
              onChange={handleChange}
              placeholder="Enter option 2"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Option 3</label>

            <input
              className="form-control"
              type="text"
              name="option3"
              value={question.option3}
              onChange={handleChange}
              placeholder="Enter option 3"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Option 4</label>

            <input
              className="form-control"
              type="text"
              name="option4"
              value={question.option4}
              onChange={handleChange}
              placeholder="Enter option 4"
            />
          </div>
        </div>

        {/* Correct Answer */}
        <div className="mt-3">
          <label className="form-label">Correct Answer</label>

          <input
            className="form-control"
            type="text"
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={handleChange}
            placeholder="Enter the correct answer"
          />
        </div>

        {/* Explanation */}
        <div className="mt-3">
          <label className="form-label">Explanation</label>

          <textarea
            className="form-control"
            name="explanation"
            rows="4"
            value={question.explanation}
            onChange={handleChange}
            placeholder="Explain why this answer is correct"
          />
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3 mt-4 flex-wrap">
          <button
            className="submit-btn"
            type="submit"
            disabled={submitting || loadingCategories}
          >
            {submitting ? "Saving..." : "Save Question"}
          </button>

          <Link
            to="/admin/dashboard"
            className="btn btn-secondary"
          >
            ← Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddQuestion;