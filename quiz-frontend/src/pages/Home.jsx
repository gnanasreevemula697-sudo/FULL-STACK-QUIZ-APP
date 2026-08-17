import { useCallback, useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/style.css";

function Home() {
  const getCategoryIcon = (name) => {
    if (!name) return '❓';
    const key = name.toLowerCase();
    if (key.includes('java')) return '☕';
    if (key.includes('python')) return '🐍';
    if (key.includes('sql')) return '🗄️';
    if (key.includes('react')) return '⚛️';
    if (key.includes('general')) return '🧠';
    if (key.includes('javascript') || key.includes('js')) return 'JS';
    return '🎯';
  };

  
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const categoryRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToRef = (ref) => {
    try {
      ref.current && ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      // fallback
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNav = (target) => {
    // If already on home route, just scroll. Otherwise navigate to home then scroll after short delay.
    if (location.pathname === "/") {
      if (target === "hero") scrollToRef(heroRef);
      if (target === "categories") scrollToRef(categoryRef);
      if (target === "about") scrollToRef(aboutRef);
      return;
    }
    navigate("/");
    // wait for navigation/DOM to settle then scroll
    setTimeout(() => {
      if (target === "hero") scrollToRef(heroRef);
      if (target === "categories") scrollToRef(categoryRef);
      if (target === "about") scrollToRef(aboutRef);
    }, 180);
  };



  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const res = await api.get("/category/all");
      const cats = res.data || [];
      // fetch counts per category
      const withCounts = await Promise.all(cats.map(async (c) => {
        try {
          const r = await api.get(`/question/category/${c.id}`);
          return { ...c, questionCount: Array.isArray(r.data) ? r.data.length : 0 };
        } catch (err) {
          return { ...c, questionCount: 0 };
        }
      }));

      setCategories(withCounts);
    } catch (err) {
      console.error(err);
      setError("Unable to load categories right now.");
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // quiz loading is handled on the dedicated Quiz page

  // submission is handled by the Quiz page

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // no page-level quiz timer on Home

  // option handling is on the Quiz page

  

  return (
    <div className="container">
      <header className="navbar">
        <div className="nav-left">
          <div className="brand" style={{ cursor: 'pointer' }} onClick={() => handleNav('hero')}>🧠 QuizMaster</div>
          <nav className="nav-links">
            <button className="nav-link-btn" onClick={() => handleNav('hero')}>Home</button>
            <button className="nav-link-btn" onClick={() => handleNav('categories')}>Categories</button>
            <button className="nav-link-btn" onClick={() => handleNav('about')}>About</button>
          </nav>
        </div>

        <div className="nav-right">
          <button className="btn-admin" onClick={() => navigate("/admin")}>Admin Portal</button>
        </div>
      </header>

      <div className="mb-4" ref={heroRef}>
        <div className="hero">
          <div>
            <div className="badge">INTERACTIVE QUIZ PLATFORM</div>
            <h1 style={{ marginTop: 10, marginBottom: 6, fontSize: 32, lineHeight: 1.05 }}>Test Your Knowledge.<br/>Challenge Yourself.</h1>
            <p style={{ marginTop: 8, color: 'var(--text-secondary)' }}>Choose a category, test your skills, and discover how much you know.</p>
            <div style={{ marginTop: 12 }}>
              <button className="cta-explore" onClick={() => handleNav('categories')}>Explore Quizzes →</button>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <img src="/static/media/quiz-illustration.0f3d3b2f.svg" alt="quiz" style={{ maxWidth: 240, opacity: 0.95 }} onError={(e)=>{ e.target.style.display='none'; }} />
          </div>
        </div>
      </div>

      {/* Landing / Category Selection */}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {loadingCategories ? (
        <div className="quiz-card text-center">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="quiz-card text-center">
          <h3>No categories available.</h3>
          <p>Please check back later.</p>
        </div>
      ) : (
        <div>
          <h2 className="section-title">Choose Your Challenge</h2>
          <p className="small-muted" style={{ marginTop: 6 }}>Select a category and start your quiz.</p>
          <div className="category-grid" ref={categoryRef}>
            {categories.map((c) => (
              <div key={c.id} className="category-card" onClick={() => { if (c.questionCount) navigate(`/quiz/${c.id}`); }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div className="category-icon">{getCategoryIcon(c.name)}</div>
                  <div>
                    <h4>{c.name}</h4>
                    <div className="category-meta">{c.questionCount || 0} Questions</div>
                  </div>
                </div>

                <div style={{ marginTop: 6 }}>
                  <p className="category-desc" style={{ marginBottom: 10 }}>{c.description || `Test your ${c.name} knowledge`}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {(!c.questionCount || c.questionCount === 0) ? (
                      <button className="btn btn-secondary" disabled>No Questions Yet</button>
                    ) : (
                      <button className="btn btn-primary" onClick={(e)=>{ e.stopPropagation(); navigate(`/quiz/${c.id}`); }}>Start Quiz →</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="about-section" ref={aboutRef}>
        <div className="card">
          <h2 className="section-title">About QuizMaster</h2>
          <p className="small-muted" style={{ marginTop: 8 }}>QuizMaster is an interactive quiz platform where users can test their knowledge across different categories.</p>

          <div className="features-grid" style={{ marginTop: 18 }}>
            <div className="feature-card">
              <div className="feature-emoji">🧠</div>
              <div>
                <h4>Test Your Knowledge</h4>
                <p className="small-muted">Short quizzes to measure your skills quickly.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">📚</div>
              <div>
                <h4>Multiple Categories</h4>
                <p className="small-muted">Choose from a variety of topics and difficulty levels.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">⚡</div>
              <div>
                <h4>Instant Results</h4>
                <p className="small-muted">Get immediate feedback and a detailed result summary.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">🎯</div>
              <div>
                <h4>Easy to Use</h4>
                <p className="small-muted">A simple, focused interface for learning and improving.</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, textAlign: 'right' }}>
            <button className="btn btn-primary" onClick={() => handleNav('hero')}>Back to Top ↑</button>
          </div>
        </div>
      </section>

      {/* End Home content - Quiz is handled on a separate page */}
      <footer className="footer">
        <div style={{ fontWeight: 800 }}>🧠 QuizMaster</div>
        <div style={{ marginTop: 6 }}>Learn • Practice • Improve</div>
        <div style={{ marginTop: 8 }}>© 2026 QuizMaster. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Home;