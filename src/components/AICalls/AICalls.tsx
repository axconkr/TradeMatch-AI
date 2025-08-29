import React, { useState } from 'react';
import { aiAgents, mockAICalls } from '../../data/mockData';
import { User } from '../../types';
import AIAgentCard from './AIAgentCard';
import { Phone, Clock, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

interface AICallsProps {
  user: User;
}

const AICalls: React.FC<AICallsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'agents' | 'status' | 'pricing'>('agents');

  const pricingPlans = [
    {
      name: '기본',
      price: '$29',
      features: ['15분 통화', '기본 보고서', '이메일 전송', '2개 언어 지원'],
      color: 'border-gray-200'
    },
    {
      name: '프리미엄',
      price: '$59',
      features: ['30분 통화', '상세 분석 보고서', '자동 후속조치', '음성파일 제공', '5개 언어 지원'],
      color: 'border-primary bg-blue-50',
      popular: true
    },
    {
      name: '엔터프라이즈',
      price: '$149',
      features: ['무제한 통화', '전문 컨설팅', '화상회의 지원', '전담 상담사', '모든 언어 지원'],
      color: 'border-gray-200'
    }
  ];

  const handleCallRequest = (agentId: string) => {
    alert(`${agentId} 에이전트에게 상담을 요청했습니다.`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '예정';
      case 'in_progress':
        return '진행중';
      case 'completed':
        return '완료';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI 전화상담</h1>
        <p className="text-gray-600">24/7 전 세계 어디든 현지 언어로 자동 비즈니스 상담</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'agents', label: 'AI 에이전트', icon: Phone },
          { id: 'status', label: '상담 현황', icon: Clock },
          { id: 'pricing', label: '요금 안내', icon: DollarSign }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* AI Agents Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">글로벌 전문 AI 에이전트</h2>
            <p className="text-blue-100">
              각 지역별 전문 AI 에이전트가 현지 언어와 문화를 고려한 맞춤형 비즈니스 상담을 제공합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent) => (
              <AIAgentCard
                key={agent.id}
                agent={agent}
                onCallRequest={handleCallRequest}
              />
            ))}
          </div>
        </div>
      )}

      {/* Status Tab */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">상담 현황</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockAICalls.map((call) => (
                <div key={call.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(call.status)}
                        <span className="text-sm font-medium text-gray-600">
                          {getStatusText(call.status)}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {call.targetCompany}
                      </h3>
                      <p className="text-gray-600 mb-2">{call.callPurpose}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>담당: {call.aiAgent}</span>
                        <span>언어: {call.language}</span>
                        <span>일시: {call.callDate} {call.callTime}</span>
                        {call.duration && <span>통화시간: {call.duration}</span>}
                      </div>
                    </div>
                  </div>
                  
                  {call.callSummary && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">상담 요약</h4>
                      <p className="text-gray-700 text-sm mb-3">{call.callSummary.overview}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">주요 포인트</h5>
                          <ul className="text-gray-600 space-y-1">
                            {call.callSummary.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">우려사항</h5>
                          <ul className="text-gray-600 space-y-1">
                            {call.callSummary.concerns.map((concern, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">다음 단계</h5>
                          <ul className="text-gray-600 space-y-1">
                            {call.callSummary.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            call.callSummary.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                            call.callSummary.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            감정: {call.callSummary.sentiment === 'positive' ? '긍정적' : 
                                  call.callSummary.sentiment === 'neutral' ? '중립적' : '부정적'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            call.callSummary.businessPotential === 'high' ? 'bg-green-100 text-green-800' :
                            call.callSummary.businessPotential === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            비즈니스 가능성: {call.callSummary.businessPotential === 'high' ? '높음' : 
                                            call.callSummary.businessPotential === 'medium' ? '보통' : '낮음'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">투명한 가격 정책</h2>
            <p className="text-gray-600">비즈니스 규모에 맞는 최적의 플랜을 선택하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl border-2 ${plan.color} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">인기</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{plan.price}</div>
                  <p className="text-gray-600 text-sm">per call</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-primary text-white hover:bg-blue-700' 
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}>
                  플랜 선택
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AICalls;