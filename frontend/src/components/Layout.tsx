import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  ChevronRight, 
  ChevronLeft,
  Sprout,
  RefreshCw,
  PlusCircle,
  User,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Overview' },
    { path: '/accounts', icon: Wallet, label: 'Accounts' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
  ];

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    if (currentPath === '/') return 'Overview';
    return menuItems.find(item => item.path === currentPath)?.label || '';
  };

  return (
    <div className="flex min-h-screen bg-mint-50">
      <nav className={`bg-white shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      } flex flex-col fixed h-full`}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-mint-200" />
            {isExpanded && (
              <span className="text-xl font-bold text-mint-300">Spearmint</span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-mint-50 text-mint-200"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex-1 py-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 space-x-3 ${
                  isActive 
                    ? 'text-mint-300 bg-mint-50' 
                    : 'text-gray-600 hover:bg-mint-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {isExpanded && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <main className={`flex-1 transition-all duration-300 ${
        isExpanded ? 'ml-64' : 'ml-20'
      }`}>
        {/* Header bar */}
        <div className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-mint-300">{getCurrentPageTitle()}</h1>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 text-mint-300 hover:bg-mint-50 rounded-lg transition-colors">
              <RefreshCw className="h-5 w-5 mr-2" />
              Sync
            </button>
            <button className="flex items-center px-4 py-2 text-mint-300 hover:bg-mint-50 rounded-lg transition-colors">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Account
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-lg hover:bg-mint-50 text-mint-300"
              >
                <User className="h-6 w-6" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <button 
                    onClick={() => {
                      // Handle sign out
                      setShowUserMenu(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-mint-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}