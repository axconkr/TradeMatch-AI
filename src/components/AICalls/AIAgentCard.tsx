import React from 'react';
import { AIAgent } from '../../types';
import { Phone, Languages, Star } from 'lucide-react';

interface AIAgentCardProps {
  agent: AIAgent;
  onCallRequest: (agentId: string) => void;
}

const AIAgentCard: React.FC<AIAgentCardProps> = ({ agent, onCallRequest }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{agent.specialty}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Languages className="w-4 h-4 mr-1" />
              <span>{agent.languages.join(', ')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold text-primary">{agent.callsCompleted.toLocaleString()}</p>
              <p className="text-xs text-gray-500">완료된 상담</p>
            </div>
            <div>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-green-600">{agent.successRate}%</p>
                <Star className="w-4 h-4 text-yellow-400 ml-1" />
              </div>
              <p className="text-xs text-gray-500">성공률</p>
            </div>
          </div>
          
          <button
            onClick={() => onCallRequest(agent.id)}
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            상담 요청
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentCard;