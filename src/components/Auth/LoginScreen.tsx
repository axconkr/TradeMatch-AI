import React, { useState } from 'react';
import { LogIn, Building, Users } from 'lucide-react';
import { User } from '../../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const testAccounts = [
    { username: 'buyer', password: 'test123', label: '바이어 (구매자)' },
    { username: 'seller', password: 'test123', label: '셀러 (판매자)' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication
    const mockUsers = {
      buyer: {
        id: '1',
        username: 'buyer',
        company: '삼성물산',
        type: 'buyer' as const,
        avatar: '/api/placeholder/40/40',
        email: 'kim.manager@samsung.com',
        country: '대한민국',
        category: '전자부품',
        products: ['반도체', '디스플레이', '전자부품'],
        creditScore: 95,
        totalTransactions: 247,
        rating: 4.8,
        verified: true,
        preferredRegions: ['중국', '일본', '베트남']
      },
      seller: {
        id: '2',
        username: 'seller',
        company: '폭스콘 테크놀로지',
        type: 'seller' as const,
        avatar: '/api/placeholder/40/40',
        email: 'li.manager@foxconn.com',
        country: '중국',
        category: '제조업',
        products: ['스마트폰 부품', 'PCB', '조립 서비스'],
        creditScore: 88,
        totalTransactions: 189,
        rating: 4.6,
        verified: true,
        preferredRegions: ['한국', '일본', '미국']
      }
    };

    if (username === 'buyer' && password === 'test123') {
      onLogin(mockUsers.buyer);
    } else if (username === 'seller' && password === 'test123') {
      onLogin(mockUsers.seller);
    } else {
      setError('잘못된 사용자명 또는 비밀번호입니다.');
    }
  };

  const handleQuickLogin = (account: { username: string; password: string }) => {
    setUsername(account.username);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TradeMatch AI</h1>
            <p className="text-gray-600 mt-2">글로벌 무역 매칭 플랫폼</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                사용자 유형
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                >
                  <option value="">사용자 유형을 선택하세요</option>
                  <option value="buyer">바이어 (구매자)</option>
                  <option value="seller">셀러 (판매자)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              로그인
            </button>
          </form>

          {/* Test Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">테스트 계정</h3>
            <div className="space-y-2">
              {testAccounts.map((account) => (
                <div key={account.username} className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{account.label}</span>
                    <div className="text-gray-600">
                      {account.username} / {account.password}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(account)}
                    className="text-primary hover:text-blue-700 font-medium"
                  >
                    사용
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>© 2024 TradeMatch AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;