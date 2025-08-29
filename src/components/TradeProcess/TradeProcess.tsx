import React from 'react';
import { User, TradeProcessStep } from '../../types';
import { buyerProcessSteps, sellerProcessSteps } from '../../data/mockData';
import { CheckCircle, Clock, Circle, ArrowRight } from 'lucide-react';

interface TradeProcessProps {
  user: User;
}

const TradeProcess: React.FC<TradeProcessProps> = ({ user }) => {
  const processSteps = user.type === 'buyer' ? buyerProcessSteps : sellerProcessSteps;

  const getStepIcon = (status: TradeProcessStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'pending':
        return <Circle className="w-6 h-6 text-gray-400" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getProgressBarColor = (progress: number) => {
    if (progress === 100) return 'bg-green-600';
    if (progress > 0) return 'bg-blue-600';
    return 'bg-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">무역 프로세스 관리</h1>
        <p className="text-gray-600">
          {user.type === 'buyer' 
            ? '수입 업무의 전 과정을 단계별로 관리하고 추적하세요' 
            : '수출 업무의 전 과정을 단계별로 관리하고 추적하세요'
          }
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">전체 진행 현황</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(processSteps.reduce((acc, step) => acc + step.progress, 0) / processSteps.length)}%
            </div>
            <div className="text-sm text-gray-600">전체 완료율</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-primary to-blue-700 h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.round(processSteps.reduce((acc, step) => acc + step.progress, 0) / processSteps.length)}%` 
            }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>시작</span>
          <span>완료</span>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {user.type === 'buyer' ? '수입 프로세스 단계' : '수출 프로세스 단계'}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {processSteps.map((step, index) => {
            const isLast = index === processSteps.length - 1;
            
            return (
              <div key={step.id} className="p-6 relative">
                {!isLast && (
                  <div className="absolute left-9 top-16 w-0.5 h-16 bg-gray-200" />
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStepIcon(step.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {step.id}. {step.step}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        {step.status === 'completed' && (
                          <span className="text-green-600 font-medium">완료</span>
                        )}
                        {step.status === 'in_progress' && (
                          <span className="text-blue-600 font-medium">진행중</span>
                        )}
                        {step.status === 'pending' && (
                          <span className="text-gray-500">대기중</span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{step.desc}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>진행률</span>
                          <span>{step.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(step.progress)}`}
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {step.status === 'in_progress' && (
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                          <span>계속하기</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      
                      {step.status === 'pending' && index > 0 && processSteps[index - 1].status === 'completed' && (
                        <button className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2">
                          <span>시작하기</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {step.status === 'completed' && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center text-green-800 text-sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          이 단계가 성공적으로 완료되었습니다.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {processSteps.filter(step => step.status === 'completed').length}
            </div>
            <div className="text-gray-600 text-sm">완료된 단계</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {processSteps.filter(step => step.status === 'in_progress').length}
            </div>
            <div className="text-gray-600 text-sm">진행중인 단계</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">
              {processSteps.filter(step => step.status === 'pending').length}
            </div>
            <div className="text-gray-600 text-sm">대기중인 단계</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeProcess;