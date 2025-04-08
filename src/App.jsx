import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectMode } from './features/mode/modeSlice';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

// Lazy load pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const AddProfilePage = React.lazy(() => import("./pages/AddProfilePage"));
const ProfileIndexPage = React.lazy(() => import("./pages/ProfileIndexPage"));
const ProfileDetailPage = React.lazy(() => import("./pages/ProfileDetailPage"));
const ProfileEditPage = React.lazy(() => import("./pages/ProfileEditPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ChatPage = React.lazy(() => import("./pages/ChatPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const mode = useSelector(selectMode);

  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/add-profile"
              element={
                <ProtectedRoute>
                  <AddProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/profile/:id" element={<ProfileIndexPage />}>
              <Route index element={<ProfileDetailPage />} />
              <Route
                path="edit"
                element={
                  <ProtectedRoute>
                    <ProfileEditPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </HashRouter>
  );
};

export default App;
