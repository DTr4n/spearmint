import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Receipt, 
  ChevronRight, 
  ChevronLeft,
  Sprout,
  Settings,
  User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Overview' },
    { path: '/accounts', icon: Wallet, label: 'Accounts' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className={`bg-white shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      } flex flex-col fixed h-full`}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-emerald-500" />
            {isExpanded && (
              <span className="text-xl font-bold text-emerald-900">Spearmint</span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-700"
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
                    ? 'text-emerald-700 bg-emerald-50' 
                    : 'text-gray-600 hover:bg-gray-50'
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
        <div className="bg-white shadow-md p-4 flex items-center justify-between">
          <div className="flex-1"></div>
          {/* Settings Button */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <Settings className="h-6 w-6" />
          </button>
          {/* Profile Button */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 ml-4">
            <User className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
