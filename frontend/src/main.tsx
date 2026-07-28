import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";

import { AppLayout } from "./App";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ThemeToggle } from "./components/theme/ThemeToggle";
import { LandingPage } from "./pages/LandingPage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ReportPage } from "./pages/ReportPage";
import { SignInPage } from "./pages/SignInPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingThemeToggle />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

function FloatingThemeToggle() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <div className="fixed bottom-5 right-5 z-[60]"><ThemeToggle /></div>;
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-soft px-6 text-center">
      <p className="text-sm font-semibold text-medical-500">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-navy">Page not found</h1>
      <p className="mt-2 text-navy-300">The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-navy-500 px-5 text-sm font-medium text-white hover:bg-navy-600 transition-colors"
      >
        Back to home
      </a>
    </div>
  );
}
