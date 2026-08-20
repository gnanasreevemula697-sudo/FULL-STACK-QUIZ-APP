import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/style.css";

function Quiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes total
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep a ref to handleSubmit to avoid closure stale state in the interval
  const currentSubmitRef = { current: null };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const qres = await api.get(`/question/category/${categoryId}`);
        const qs = qres.data || [];
        if (!mounted) return;
        setQuestions(qs);

        // fetch category names to show the title
        try {
          const cres = await api.get("/category/all");
          const cats = cres.data || [];
          const found = cats.find((c) => String(c.id) === String(categoryId));
          setCategoryName(found ? found.name : "");
        } catch (e) {
          // ignore
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions for this quiz.");
      } finally {
        setLoading(false);
      }
    };
    load();

    return () => { mounted = false; };
  }, [categoryId]);

  // Main single interval timer hook
  useEffect(() => {
    if (loading || !questions.length) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (currentSubmitRef.current) {
            currentSubmitRef.current(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, questions.length]);

  const progressPercent = useMemo(() => {
    if (!questions.length) return 0;
    return ((currentQuestion + 1) / questions.length) * 100;
  }, [currentQuestion, questions.length]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (isTimeExpired = false) => {
    if (submitting) return;

    if (!isTimeExpired) {
      const unanswered = questions.some((q) => !answers[q.id]);
      if (unanswered) {
        setError("Please answer every question before submitting.");
        return;
      }
    }

    const responses = questions.map((q) => ({
      id: q.id,
      response: answers[q.id] || "",
    }));

    try {
      setSubmitting(true);
      setError("");
      const res = await api.post(`/quiz/submitDetails/${categoryId}`, responses);
      // include categoryId so Result can retake same quiz
      const timeUsed = 120 - timeLeft;
      const payload = { ...res.data, categoryId, categoryName, timeUsed };
      navigate("/result", { state: payload });
    } catch (err) {
      console.error(err);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  currentSubmitRef.current = handleSubmit;

  if (loading) {
    return (
      <div className="container quiz-container">
        <div className="quiz-card text-center">Loading quiz...</div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="container quiz-container">
        <div className="quiz-card text-center">
          <h3>No questions are available for this category yet.</h3>
          <p>Please go back to categories or contact the admin.</p>
          <div style={{ marginTop: 12 }}>
            <button className="prev-btn" onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="container quiz-container">
      <header className="navbar" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <div className="nav-left" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div className="brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🧠 QuizMaster</div>
          
          <button className="menu-toggle-btn" aria-label="Toggle menu" style={{ display: 'none', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
        
        <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <button className="nav-link-btn" onClick={() => navigate('/')}>Home</button>
        </nav>

        <div className={`nav-right ${menuOpen ? 'show' : ''}`}>
          {localStorage.getItem("quizAdminAuth") === "true" ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-admin" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
              <button className="prev-btn" style={{ padding: '8px 14px' }} onClick={() => {
                localStorage.removeItem("quizAdminAuth");
                localStorage.removeItem("quizAdminToken");
                navigate('/');
              }}>Logout</button>
            </div>
          ) : (
            <button className="btn-admin" onClick={() => navigate('/admin')}>Admin Portal</button>
          )}
        </div>
      </header>

      <main>
        <div className="quiz-header" style={{ textAlign: 'left', marginTop: 18 }}>
          <h2 style={{ margin: 0, fontSize: 20, color: 'var(--heading)' }}>{categoryName ? `${categoryName} Quiz` : 'Quiz'}</h2>
          <p className="small-muted" style={{ marginTop: 6 }}>Test your knowledge and choose the best answer.</p>
        </div>

        <div className="question-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div className="small-muted">Question {currentQuestion + 1} of {questions.length}</div>
          <div className={`timer ${timeLeft <= 10 ? 'critical' : (timeLeft <= 30 ? 'warning' : '')}`}>
            ⏰ {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2,'0')}
          </div>
        </div>

        <div className="progress" style={{ marginTop: 10 }}>
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Question Palette Navigation Grid */}
        <div className="palette-container" style={{ marginBottom: 16 }}>
          <div className="palette-title">Question Palette</div>
          <div className="palette-grid">
            {questions.map((question, idx) => {
              let statusClass = "";
              if (idx === currentQuestion) statusClass = "current";
              else if (answers[question.id]) statusClass = "answered";
              
              return (
                <button
                  key={question.id}
                  className={`palette-btn ${statusClass}`}
                  onClick={() => {
                    setError('');
                    setCurrentQuestion(idx);
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {error && <div className="alert alert-danger" style={{ marginTop: 10 }}>{error}</div>}

        <div className="quiz-card quiz-main" style={{ marginTop: 12 }}>
          <h3 style={{ color: 'var(--heading)', fontSize: 18 }}>{q.question}</h3>

          {[
            { key: 'option1', value: q.option1 },
            { key: 'option2', value: q.option2 },
            { key: 'option3', value: q.option3 },
            { key: 'option4', value: q.option4 },
          ].map((option) => (
            <label
              key={option.key}
              className={`option-card ${answers[q.id] === option.value ? 'selected' : ''}`}
              onClick={() => handleOptionChange(q.id, option.value)}
            >
              <input type="radio" name={`question-${q.id}`} checked={answers[q.id] === option.value} readOnly />
              <span className="option-label">{option.value}</span>
            </label>
          ))}
        </div>

        <div className="buttons-row" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
          <div>
            {currentQuestion > 0 && (
              <button className="prev-btn" onClick={() => setCurrentQuestion((p) => p - 1)}>← Previous</button>
            )}
          </div>

          <div>
            {currentQuestion < questions.length - 1 ? (
              <button className="next-btn" onClick={() => {
                if (!answers[q.id]) { setError('Please select an option before continuing.'); return; }
                setError('');
                setCurrentQuestion((p) => p + 1);
              }}>Next →</button>
            ) : (
              <button className="submit-btn" onClick={() => handleSubmit(false)} disabled={submitting}>{submitting ? 'Submitting...' : '✅ Submit Quiz'}</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Quiz;