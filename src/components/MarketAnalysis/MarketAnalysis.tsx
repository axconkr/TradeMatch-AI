import React from 'react';
import { User } from '../../types';
import { marketData, tradingPartners } from '../../data/mockData';
import { TrendingUp, TrendingDown, Minus, Star, Users, Globe } from 'lucide-react';

interface MarketAnalysisProps {
  user: User;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ user }) => {
  const getTrendIcon = (trend: 'up' | 'stable' | 'down') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'stable':
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'stable' | 'down') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status: 'active' | 'stable' | 'growing') => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'stable':
        return 'bg-blue-100 text-blue-800';
      case 'growing':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getStatusText = (status: 'active' | 'stable' | 'growing') => {
    switch (status) {
      case 'active':
        return '활발';
      case 'stable':
        return '안정';
      case 'growing':
        return '성장';
    }
  };

  const getRecommendations = () => {
    if (user.type === 'buyer') {
      return [
        {
          title: '중국 제조업체 매칭',
          desc: '전자부품 분야에서 높은 매칭률을 보이는 중국 제조업체들과의 연결을 추천합니다.',
          score: 95,
          region: '🇨🇳 중국'
        },
        {
          title: '일본 정밀부품 공급업체',
          desc: '고품질 정밀부품이 필요한 경우 일본 공급업체들이 최적의 선택입니다.',
          score: 92,
          region: '🇯🇵 일본'
        },
        {
          title: '베트남 비용효율 제조',
          desc: '비용 효율적인 대량 생산을 위한 베트남 제조업체들을 고려해보세요.',
          score: 78,
          region: '🇻🇳 베트남'
        }
      ];
    } else {
      return [
        {
          title: '한국 전자업체 진출',
          desc: '스마트폰 부품에 대한 높은 수요를 보이는 한국 시장 진출을 추천합니다.',
          score: 89,
          region: '🇰🇷 한국'
        },
        {
          title: '미국 테크 기업 공급',
          desc: '혁신적인 기술 제품에 대한 수요가 높은 미국 시장을 타겟하세요.',
          score: 87,
          region: '🇺🇸 미국'
        },
        {
          title: '독일 자동차 부품 시장',
          desc: '정밀 가공 기술을 활용한 독일 자동차 부품 시장 진출을 고려하세요.',
          score: 85,
          region: '🇩🇪 독일'
        }
      ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">시장 분석</h1>
        <p className="text-gray-600">실시간 시장 동향과 데이터 기반 인사이트를 확인하세요</p>
      </div>

      {/* Market Overview */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">시장 개요</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-blue-100 text-sm">매칭 성공률</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24시간</div>
            <div className="text-blue-100 text-sm">평균 매칭 시간</div>
          </div>
          <div>
            <div className="text-2xl font-bold">156개국</div>
            <div className="text-blue-100 text-sm">서비스 지역</div>
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">업종별 시장 동향</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketData.map((sector, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{sector.sector}</h3>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(sector.trend)}
                    <span className={`font-semibold ${getTrendColor(sector.trend)}`}>
                      {sector.growthRate > 0 ? '+' : ''}{sector.growthRate}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {sector.insights.map((insight, insightIndex) => (
                    <div key={insightIndex} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Partners */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">주요 교역국 현황</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tradingPartners.map((partner, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{partner.flag}</span>
                    <span className="font-medium text-gray-900">{partner.country}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                    {getStatusText(partner.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">{partner.specialty}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">매칭률</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {partner.matchingRate}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${partner.matchingRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              {user.type === 'buyer' ? '추천 공급업체 지역' : '추천 진출 시장'}
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{rec.title}</h3>
                      <span className="text-sm text-gray-500">{rec.region}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.desc}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">추천 점수</span>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-primary mr-1" />
                        <span className="font-medium text-primary">{rec.score}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{rec.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;