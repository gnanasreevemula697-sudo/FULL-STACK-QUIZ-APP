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

  // Calculate detailed stats
  const correctCount = score;
  const unansweredCount = results.filter(
    (item) => !item.userAnswer || item.userAnswer.trim() === ""
  ).length;
  const wrongCount = totalQuestions - correctCount - unansweredCount;

  const formatTime = (secs) => {
    if (!secs && secs !== 0) return "N/A";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <header className="navbar">
        <div className="nav-left">
          <div className="brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🧠 QuizMaster</div>
          <nav className="nav-links">
            <button className="nav-link-btn" onClick={() => navigate('/')}>Home</button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 className="title">🎉 Quiz Result</h1>

        <div className="quiz-card text-center">
          <h2>Score: {score} / {totalQuestions}</h2>
          <p className="mb-0">Percentage: {percentage}%</p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', fontSize: '15px' }}>
            <div><strong>🟢 Correct:</strong> {correctCount}</div>
            <div><strong>🔴 Wrong:</strong> {wrongCount}</div>
            <div><strong>⚪ Unanswered:</strong> {unansweredCount}</div>
            {data?.timeUsed !== undefined && (
              <div><strong>⏱️ Time:</strong> {formatTime(data.timeUsed)}</div>
            )}
          </div>
        </div>

        {results.map((item) => (
          <div key={item.id} className="quiz-card">
            <h3 style={{ color: 'var(--heading)', fontSize: '18px' }}>{item.question}</h3>
            <p style={{ marginTop: '10px' }}>
              <strong>Your Answer:</strong> <span style={{ color: item.correct ? 'var(--success)' : (item.userAnswer ? 'var(--danger)' : 'var(--muted)') }}>{item.userAnswer || "None"}</span>
            </p>
            <p>
              <strong>Correct Answer:</strong> <span style={{ color: 'var(--success)' }}>{item.correctAnswer}</span>
            </p>
            <p className={item.correct ? "text-success" : "text-danger"} style={{ fontWeight: '700' }}>
              {item.correct ? "✅ Correct" : "❌ Incorrect"}
            </p>
            {item.explanation && (
              <p style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '3px solid var(--primary)', fontSize: '14px' }}>
                <strong>Explanation:</strong> {item.explanation}
              </p>
            )}
          </div>
        ))}

        <div className="d-flex gap-3 justify-content-center flex-wrap" style={{ marginTop: '24px' }}>
          <button className="submit-btn" onClick={() => {
            const catId = data?.categoryId;
            if (catId) navigate(`/quiz/${catId}`); else navigate('/');
          }}>
            Try Again
          </button>
          <button className="prev-btn" onClick={() => navigate("/", { state: { scrollTo: "categories" } })}>
            Back to Categories
          </button>
          <button className="prev-btn" onClick={() => navigate("/") }>
            Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default Result;