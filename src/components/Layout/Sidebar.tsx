import React from 'react';
import { Home, Phone, FileText, TrendingUp, User, LogOut, Building2 } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userType: 'buyer' | 'seller';
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, userType, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: Home },
    { id: 'ai-calls', label: 'AI 전화상담', icon: Phone },
    { id: 'trade-process', label: '무역 프로세스', icon: Building2 },
    { id: 'documents', label: '무역 서류', icon: FileText },
    { id: 'market-analysis', label: '시장 분석', icon: TrendingUp },
    { id: 'profile', label: '프로필 관리', icon: User },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">TradeMatch AI</h1>
        <p className="text-sm text-gray-600 mt-1">
          {userType === 'buyer' ? '바이어 포털' : '셀러 포털'}
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Sidebar;