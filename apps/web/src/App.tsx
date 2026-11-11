import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "./lib/i18n";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { NotFoundPage } from "./pages/NotFoundPage";
import { BioLinksPage } from "./pages/BioLinksPage";
import { InquiryTrackingPage } from "./pages/InquiryTrackingPage";

// Feature modules public API imports
import { HomePage } from "./features/home";
import { ProjectsPage, ProjectDetailPage } from "./features/portfolio";
import { BlogPage, PostDetailPage } from "./features/blog";
import { ContactPage } from "./features/inquiries";
import {
  AdminLayout,
  AdminLoginPage,
  AdminDashboardPage,
  AdminInquiriesPage,
  AdminProjectsPage,
  AdminPostsPage,
  AdminBioLinksPage,
  AdminSettingsPage,
} from "./features/admin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1
    }
  }
});

// Layout wrapper to conditionally show public Navbar/Footer
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isBioPage = location.pathname.startsWith("/links") || location.pathname.startsWith("/bio");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAdmin && !isBioPage) {
      // F10: Cookieless aggregate page view counter
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: location.pathname }),
      }).catch(() => {});
    }
  }, [location.pathname, isAdmin, isBioPage]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && !isBioPage && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && !isBioPage && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<PostDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/track" element={<InquiryTrackingPage />} />
              <Route path="/track/:trackingCode" element={<InquiryTrackingPage />} />

              {/* Bio Links Standalone Route */}
              <Route path="/links" element={<BioLinksPage />} />
              <Route path="/bio" element={<Navigate to="/links" replace />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="inquiries" element={<AdminInquiriesPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="posts" element={<AdminPostsPage />} />
                <Route path="links" element={<AdminBioLinksPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
