import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/style.css";

function ManageCategories() {

  const getCategoryIcon = (name) => {
    if (!name) return '❓';
    const key = name.toLowerCase();
    if (key.includes('java')) return '☕';
    if (key.includes('python')) return '🐍';
    if (key.includes('sql')) return '🗄️';
    if (key.includes('react')) return '⚛️';
    if (key.includes('general')) return '🧠';
    return '📚';
  };


  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category/all");
      const cats = response.data || [];
      // attempt to fetch question counts per category
      const withCounts = await Promise.all(cats.map(async (c) => {
        try {
          const res = await api.get(`/question/category/${c.id}`);
          const qcount = Array.isArray(res.data) ? res.data.length : 0;
          return { ...c, questionCount: qcount };
        } catch (err) {
          return { ...c, questionCount: 0 };
        }
      }));
      setCategories(withCounts);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "danger",
        text: "Failed to load categories.",
      });
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setMessage({
        type: "danger",
        text: "Please enter a category name.",
      });
      return;
    }

    try {
      setLoading(true);

      await api.post("/category/add", {
        name: categoryName.trim(),
      });

      setCategoryName("");

      setMessage({
        type: "success",
        text: "Category added successfully.",
      });

      fetchCategories();

    } catch (error) {
      console.error(error);

      setMessage({
        type: "danger",
        text:
          error.response?.data?.message ||
          "Failed to add category.",
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setMessage({
      type: "",
      text: "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleUpdateCategory = async (id) => {

    if (!editingName.trim()) {
      setMessage({
        type: "danger",
        text: "Category name cannot be empty.",
      });
      return;
    }

    try {

      await api.put("/category/update", {
        id: id,
        name: editingName.trim(),
      });

      setEditingId(null);
      setEditingName("");

      setMessage({
        type: "success",
        text: "Category updated successfully.",
      });

      fetchCategories();

    } catch (error) {
      console.error(error);

      setMessage({
        type: "danger",
        text: "Failed to update category.",
      });
    }
  };

  const handleDeleteCategory = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {

      await api.delete(`/category/delete/${id}`);

      setMessage({
        type: "success",
        text: "Category deleted successfully.",
      });

      fetchCategories();

    } catch (error) {
      console.error(error);

      setMessage({
        type: "danger",
        text:
          error.response?.data?.message ||
          "Failed to delete category.",
      });
    }
  };

  return (
    <div className="container">

      <h1 className="title">
        🗂️ Manage Categories
      </h1>

      {/* Add Category */}
      <div className="quiz-card">

        <h2>Add New Category</h2>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleAddCategory}
          className="d-flex gap-3 flex-wrap"
        >

          <input
            className="form-control"
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{ maxWidth: "400px" }}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Adding..." : "➕ Add Category"}
          </button>

        </form>

      </div>

      {/* Category List */}
      <div className="quiz-card">

        <h2>Categories</h2>

        {categories.length === 0 ? (

          <div className="text-muted">
            No categories available. Add your first category.
          </div>

        ) : (

          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card quiz-card">
                {editingId === category.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <label className="form-label">Edit Category Name</label>
                      <input
                        className="form-control"
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <button className="btn btn-primary" onClick={() => handleUpdateCategory(category.id)}>Save</button>
                      <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 28 }}>{getCategoryIcon(category.name)}</div>
                      <div>
                        <h4 style={{ margin: 0 }}>{category.name}</h4>
                        <div className="text-muted">{category.questionCount || 0} Questions</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <Link to={`/admin/manage?categoryId=${category.id}`} className="btn btn-outline-primary">View Questions</Link>
                      <button className="btn btn-warning" onClick={() => startEdit(category)}>✏️ Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>🗑️ Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

        )}

      </div>

      {/* Back */}
      <div className="mt-4">

        <Link
          to="/admin/dashboard"
          className="btn btn-secondary"
        >
          ← Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default ManageCategories;