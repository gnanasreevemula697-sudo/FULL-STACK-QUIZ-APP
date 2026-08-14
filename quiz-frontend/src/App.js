import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Result from "./pages/Result";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuestion from "./pages/AddQuestion";
import ManageQuestions from "./pages/ManageQuestions";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageCategories from "./pages/ManageCategories";
import EditQuestion from "./pages/EditQuestion";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/quiz/:categoryId" element={<Quiz />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddQuestion />} />
          <Route path="/admin/manage" element={<ManageQuestions />} />
            <Route path="/admin/edit-question/:id" element={<EditQuestion />} />
          <Route
  path="/admin/categories"
  element={<ManageCategories />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;