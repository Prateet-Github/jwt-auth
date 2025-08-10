import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;