import { useLocation, useNavigate } from "react-router-dom";
import "../styles/style.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return (
      <div className="container text-center">
        <div className="quiz-card">
          <h2>No Result Found</h2>
          <p>Your quiz results are not available right now.</p>
          <button className="submit-btn" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const score = data?.score || 0;
  const totalQuestions = data?.totalQuestions || 0;
  const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
  const results = data?.results || [];

  return (
    <div className="container">
      <h1 className="title">🎉 Quiz Result</h1>

      <div className="quiz-card text-center">
        <h2>Score: {score} / {totalQuestions}</h2>
        <p className="mb-0">Percentage: {percentage}%</p>
      </div>

      {results.map((item) => (
        <div key={item.id} className="quiz-card">
          <h3>{item.question}</h3>
          <p>
            <strong>Your Answer:</strong> {item.userAnswer}
          </p>
          <p>
            <strong>Correct Answer:</strong> {item.correctAnswer}
          </p>
          <p className={item.correct ? "text-success" : "text-danger"}>
            <strong>{item.correct ? "✅ Correct" : "❌ Incorrect"}</strong>
          </p>
          <p>
            <strong>Explanation:</strong> {item.explanation}
          </p>
        </div>
      ))}

      <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="submit-btn" onClick={() => {
              const catId = data?.categoryId;
              if (catId) navigate(`/quiz/${catId}`); else navigate('/');
            }}>
              Retake Quiz
            </button>
            <button className="prev-btn" onClick={() => navigate("/") }>
              Home
            </button>
      </div>
    </div>
  );
}

export default Result;