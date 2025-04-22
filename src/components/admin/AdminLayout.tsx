import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Home, 
  Building, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import grayscaleLogo from "../../../public/images/Grayscale.png";
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Effect to enable normal mouse cursor on admin pages
  useEffect(() => {
    // Enable normal cursor
    document.body.style.cursor = '';
    
    // Override any global cursor: none rules
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        cursor: initial !important;
      }
      a, button, [role="button"], .clickable {
        cursor: pointer !important;
      }
      input, textarea, select {
        cursor: text !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Cleanup function to restore the cursor when leaving admin pages
    return () => {
      document.head.removeChild(styleElement);
      // Only restore 'none' cursor if going back to public pages
      if (!location.pathname.startsWith('/admin')) {
        document.body.style.cursor = 'none';
      }
    };
  }, [location]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/admin/dashboard',
    },
    {
      title: 'Properties',
      icon: <Building className="w-5 h-5" />,
      submenu: [
        { title: 'All Properties', path: '/admin/properties' },
        { title: 'Add Property', path: '/admin/properties/add' },
      ],
    },
    {
      title: 'Blog',
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        { title: 'All Posts', path: '/admin/blog' },
        { title: 'Add Post', path: '/admin/blog/add' },
      ],
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSubmenuActive = (submenuItems: { title: string; path: string }[]) => {
    return submenuItems.some((item) => location.pathname === item.path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar for desktop */}
      <aside
        className={`${
          isSidebarOpen ? 'lg:w-64' : 'lg:w-20'
        } hidden lg:block fixed inset-y-0 z-20 transition-all duration-300 bg-white border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className={`p-4 ${isSidebarOpen ? 'flex justify-between' : 'flex justify-center'} items-center border-b border-gray-200`}>
            {isSidebarOpen && (
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <img src={grayscaleLogo} alt="GrayScale Logo" className="h-8" />
                <span className="font-semibold text-gray-900">Admin</span>
              </Link>
            )}
            {!isSidebarOpen && (
              <img src={grayscaleLogo} alt="GrayScale Logo" className="h-8" />
            )}
            <button
              className="p-1 text-gray-600 rounded-md hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ChevronRight
                className={`w-5 h-5 transform transition-transform ${
                  isSidebarOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Sidebar menu */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div className="mb-1">
                    <button
                      className={`${
                        isSubmenuActive(item.submenu)
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${
                        isSidebarOpen
                          ? 'w-full flex items-center justify-between px-3 py-2'
                          : 'flex flex-col items-center justify-center rounded-md p-2 w-full'
                      } rounded-md text-sm font-medium transition`}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <div className="flex items-center">
                        <span className={isSidebarOpen ? 'mr-3' : 'mb-1'}>{item.icon}</span>
                        {isSidebarOpen && <span>{item.title}</span>}
                      </div>
                      {isSidebarOpen && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openSubmenu === item.title ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    {(openSubmenu === item.title || !isSidebarOpen) && item.submenu && (
                      <div className={`mt-1 space-y-1 ${isSidebarOpen ? 'pl-10' : 'pl-0 flex flex-col items-center'}`}>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.path}
                            className={`${
                              isActive(subItem.path)
                                ? 'bg-orange-100 text-orange-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            } ${
                              isSidebarOpen
                                ? 'block px-3 py-2'
                                : 'p-2 w-full text-center'
                            } rounded-md text-sm transition`}
                          >
                            {isSidebarOpen ? subItem.title : subItem.title.charAt(0)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path!}
                    className={`${
                      isActive(item.path!)
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${
                      isSidebarOpen
                        ? 'flex items-center px-3 py-2'
                        : 'flex flex-col items-center justify-center p-2'
                    } rounded-md text-sm font-medium transition`}
                  >
                    <span className={isSidebarOpen ? 'mr-3' : 'mb-1'}>{item.icon}</span>
                    {isSidebarOpen && <span>{item.title}</span>}
                    {!isSidebarOpen && <span className="text-xs">{item.title}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`${
                isSidebarOpen
                  ? 'flex items-center w-full px-3 py-2'
                  : 'flex flex-col items-center justify-center p-2 w-full'
              } text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium transition`}
            >
              <LogOut className={isSidebarOpen ? 'mr-3 w-5 h-5' : 'mb-1 w-5 h-5'} />
              {isSidebarOpen ? <span>Logout</span> : <span className="text-xs">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile navbar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <img src={grayscaleLogo} alt="GrayScale Logo" className="h-8" />
            <span className="font-semibold text-gray-900">Admin</span>
          </Link>
          <button
            className="p-1 text-gray-600 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-10 bg-gray-900/50" onClick={() => setIsMobileMenuOpen(false)}></div>
        )}

        {/* Mobile menu */}
        <div
          className={`fixed top-[65px] left-0 w-64 h-full z-20 bg-white border-r border-gray-200 transform transition-transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="px-4 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-65px)]">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div className="mb-2">
                    <button
                      className={`${
                        isSubmenuActive(item.submenu)
                          ? 'bg-orange-50 text-orange-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      } w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition`}
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSubmenu === item.title && (
                      <div className="mt-1 space-y-1 pl-10">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.path}
                            className={`${
                              isActive(subItem.path)
                                ? 'bg-orange-100 text-orange-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            } block px-3 py-2 rounded-md text-sm transition`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path!}
                    className={`${
                      isActive(item.path!)
                        ? 'bg-orange-50 text-orange-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    } flex items-center px-3 py-2 rounded-md text-sm font-medium transition`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium transition"
              >
                <LogOut className="mr-3 w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} pt-[65px] lg:pt-0 transition-all duration-300`}>
        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;