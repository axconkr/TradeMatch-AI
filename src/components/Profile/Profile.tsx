import React, { useState } from 'react';
import { User } from '../../types';
import { Building, Mail, MapPin, Star, Shield, Calendar, Award, Edit3 } from 'lucide-react';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [products, setProducts] = useState(user.products.join(', '));
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProducts = () => {
    // 실제 구현시에는 API 호출
    setIsEditing(false);
    alert('거래 품목이 업데이트되었습니다.');
  };

  const certifications = [
    { name: 'Email 인증', status: true, icon: Mail },
    { name: '사업자등록증', status: user.verified, icon: Building },
    { name: 'ISO 9001', status: user.creditScore > 90, icon: Award },
    { name: '신용평가', status: user.creditScore > 80, icon: Shield }
  ];

  const stats = [
    { label: '가입일', value: '2023.03.15', icon: Calendar },
    { label: '총 거래', value: `${user.totalTransactions}건`, icon: Building },
    { label: '신용점수', value: user.creditScore, icon: Star },
    { label: '성공률', value: `${(user.rating * 20).toFixed(0)}%`, icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">프로필 관리</h1>
        <p className="text-gray-600">회사 정보와 계정 통계를 확인하고 관리하세요</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <img
              src={user.avatar}
              alt={user.company}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{user.company}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.type === 'buyer' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.type === 'buyer' ? '바이어' : '셀러'}
                </span>
                {user.verified && (
                  <Shield className="w-5 h-5 text-green-600" />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.country}
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  {user.category}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  {user.rating.toFixed(1)} ({user.totalTransactions}건)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">거래 품목</h3>
              <button
                onClick={() => isEditing ? handleSaveProducts() : setIsEditing(true)}
                className="flex items-center space-x-1 text-primary hover:text-blue-700 font-medium text-sm"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? '저장' : '편집'}</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            {isEditing ? (
              <div>
                <textarea
                  value={products}
                  onChange={(e) => setProducts(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  rows={4}
                  placeholder="거래 품목을 쉼표(,)로 구분하여 입력하세요"
                />
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={handleSaveProducts}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setProducts(user.products.join(', '));
                    }}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.products.map((product, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">인증 현황</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        cert.status ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          cert.status ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className="text-gray-900">{cert.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.status 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {cert.status ? '완료' : '미완료'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Credit Score Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">신용 점수 상세</h3>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">전체 신용 점수</span>
            <span className="text-2xl font-bold text-primary">{user.creditScore}/100</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-primary to-blue-700 h-3 rounded-full transition-all duration-500"
              style={{ width: `${user.creditScore}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">98</div>
              <div className="text-gray-600">거래 이행률</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">95</div>
              <div className="text-gray-600">결제 신뢰도</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">92</div>
              <div className="text-gray-600">서비스 만족도</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;