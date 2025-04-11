import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import GenerationPage from './pages/GenerationPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import PrintPage from './pages/PrintPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import GeneratedFlashcardsEditor from './pages/GeneratedFlashcardsEditor';
import SsoCallback from './pages/SsoCallback';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="generate" element={<GenerationPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="print" element={<PrintPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="flashcards-editor"
            element={
              <ProtectedRoute>
                <GeneratedFlashcardsEditor />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login/sso-callback" element={<SsoCallback />} />
        <Route path="/sso-callback" element={<SsoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
