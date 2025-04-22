import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useCursorManager } from "./hooks/useCursorManager";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import PropertiesList from "./pages/admin/PropertiesList";
import AddProperty from "./pages/admin/AddProperty";
import EditProperty from "./pages/admin/EditProperty";
import BlogList from "./pages/admin/BlogList";
import AddBlogPost from "./pages/admin/AddBlogPost";
import EditBlogPost from "./pages/admin/EditBlogPost";
import Settings from "./pages/admin/Settings";
import AdminLayout from "./components/admin/AdminLayout";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const queryClient = new QueryClient();

// This component is used to apply the useCursorManager hook
const CursorManager = ({ children }: { children: React.ReactNode }) => {
  useCursorManager();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CursorManager>
          <AdminAuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<Properties />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/properties" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <PropertiesList />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/properties/add" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <AddProperty />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/properties/edit/:id" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <EditProperty />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/blog" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <BlogList />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/blog/add" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <AddBlogPost />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/blog/edit/:id" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <EditBlogPost />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <AdminProtectedRoute>
                  <AdminLayout>
                    <Settings />
                  </AdminLayout>
                </AdminProtectedRoute>
              } />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </CursorManager>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;