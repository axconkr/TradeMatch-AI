import React from 'react';
import { User } from '../../types';
import { mockNotifications } from '../../data/mockData';
import MetricCard from './MetricCard';
import { Users, Phone, TrendingUp, Star, Bell, ArrowRight } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const getMetrics = () => {
    if (user.type === 'buyer') {
      return [
        { title: '이번 달 매칭', value: 12, icon: Users, change: { value: 25, type: 'increase' as const }, color: 'blue' as const },
        { title: 'AI 상담 완료', value: 8, icon: Phone, change: { value: 33, type: 'increase' as const }, color: 'green' as const },
        { title: '진행 중인 거래', value: 3, icon: TrendingUp, color: 'purple' as const },
        { title: '신용 점수', value: user.creditScore, icon: Star, change: { value: 2, type: 'increase' as const }, color: 'orange' as const }
      ];
    } else {
      return [
        { title: '이번 달 매칭', value: 18, icon: Users, change: { value: 42, type: 'increase' as const }, color: 'blue' as const },
        { title: 'AI 상담 완료', value: 15, icon: Phone, change: { value: 25, type: 'increase' as const }, color: 'green' as const },
        { title: '진행 중인 거래', value: 7, icon: TrendingUp, color: 'purple' as const },
        { title: '신용 점수', value: user.creditScore, icon: Star, change: { value: 3, type: 'increase' as const }, color: 'orange' as const }
      ];
    }
  };

  const getQuickActions = () => {
    if (user.type === 'buyer') {
      return [
        { title: '새 공급업체 찾기', desc: 'AI 매칭으로 최적의 공급업체를 찾아보세요', action: '매칭 시작' },
        { title: 'AI 전화상담 요청', desc: '전문 AI 에이전트가 비즈니스 상담을 도와드립니다', action: '상담 요청' },
        { title: '수입 프로세스 관리', desc: '현재 진행 중인 수입 단계를 확인하세요', action: '프로세스 보기' }
      ];
    } else {
      return [
        { title: '새 바이어 발굴', desc: 'AI가 추천하는 잠재 고객을 확인해보세요', action: '바이어 찾기' },
        { title: '시장 기회 탐색', desc: '수출 추천 지역과 트렌드를 분석해보세요', action: '시장 분석' },
        { title: '수출 프로세스 관리', desc: '현재 진행 중인 수출 단계를 확인하세요', action: '프로세스 보기' }
      ];
    }
  };

  const metrics = getMetrics();
  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">안녕하세요, {user.company}님!</h1>
        <p className="text-blue-100">
          {user.type === 'buyer' 
            ? '오늘도 최고의 공급업체를 찾아드릴게요.' 
            : '새로운 비즈니스 기회를 발견해보세요.'
          }
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            change={metric.change}
            color={metric.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 시작</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.desc}</p>
                  </div>
                  <button className="flex items-center text-primary hover:text-blue-700 font-medium text-sm">
                    {action.action}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">최근 알림</h2>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockNotifications.slice(0, 4).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'match' ? 'bg-green-500' :
                  notification.type === 'call' ? 'bg-blue-500' :
                  notification.type === 'document' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.desc}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-primary hover:text-blue-700 font-medium text-sm mt-4 pt-4 border-t border-gray-200">
            모든 알림 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;