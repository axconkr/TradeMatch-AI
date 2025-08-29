import React, { useState } from 'react';
import { User } from '../../types';
import { buyerDocuments, sellerDocuments } from '../../data/mockData';
import { FileText, Download, Search, BookOpen } from 'lucide-react';

interface DocumentsProps {
  user: User;
}

const Documents: React.FC<DocumentsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'dictionary'>('documents');
  const [searchTerm, setSearchTerm] = useState('');

  const documents = user.type === 'buyer' ? buyerDocuments : sellerDocuments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'template':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'final':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'template':
        return '템플릿';
      case 'draft':
        return '초안';
      case 'ready':
        return '준비완료';
      case 'approved':
        return '승인완료';
      case 'final':
        return '최종본';
      default:
        return '알 수 없음';
    }
  };

  const tradeTerms = [
    {
      category: 'Incoterms',
      terms: [
        { term: 'FOB', full: 'Free On Board', desc: '본선인도조건 - 판매자가 지정된 선적항에서 물품을 본선에 인도하는 조건' },
        { term: 'CIF', full: 'Cost, Insurance and Freight', desc: '운임보험료포함조건 - 운임과 보험료를 포함한 가격' },
        { term: 'EXW', full: 'Ex Works', desc: '공장인도조건 - 판매자의 영업소에서 물품을 인도하는 조건' },
        { term: 'DDP', full: 'Delivered Duty Paid', desc: '관세지급인도조건 - 목적지에서 관세를 지급하고 인도하는 조건' }
      ]
    },
    {
      category: 'Payment Terms',
      terms: [
        { term: 'L/C', full: 'Letter of Credit', desc: '신용장 - 은행이 발행하는 지급확약서' },
        { term: 'T/T', full: 'Telegraphic Transfer', desc: '전신송금 - 은행을 통한 전자 자금 이체' },
        { term: 'D/P', full: 'Documents against Payment', desc: '지급인도 - 대금 지급과 동시에 선적서류 인도' },
        { term: 'D/A', full: 'Documents against Acceptance', desc: '인수인도 - 어음 인수와 동시에 선적서류 인도' }
      ]
    },
    {
      category: 'Documents',
      terms: [
        { term: 'B/L', full: 'Bill of Lading', desc: '선하증권 - 해상운송계약의 증거서류' },
        { term: 'COO', full: 'Certificate of Origin', desc: '원산지증명서 - 물품의 원산지를 증명하는 서류' },
        { term: 'C/I', full: 'Commercial Invoice', desc: '상업송장 - 거래내용을 기재한 송장' },
        { term: 'P/L', full: 'Packing List', desc: '포장명세서 - 포장 내용물을 상세히 기재한 명세서' }
      ]
    },
    {
      category: 'Trading Terms',
      terms: [
        { term: 'MOQ', full: 'Minimum Order Quantity', desc: '최소주문수량 - 주문 가능한 최소 수량' },
        { term: 'HS Code', full: 'Harmonized System Code', desc: '관세품목분류표 - 국제적으로 통일된 상품분류 코드' },
        { term: 'FCL', full: 'Full Container Load', desc: '컨테이너 전체 적재 - 한 컨테이너를 단독으로 사용' },
        { term: 'LCL', full: 'Less than Container Load', desc: '컨테이너 혼재 적재 - 여러 화주가 한 컨테이너를 공유' }
      ]
    }
  ];

  const filteredTerms = tradeTerms.map(category => ({
    ...category,
    terms: category.terms.filter(term => 
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.full.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.desc.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.terms.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">무역 서류 관리</h1>
        <p className="text-gray-600">무역 업무에 필요한 서류를 체계적으로 관리하고 무역 용어를 확인하세요</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'documents', label: '무역 서류', icon: FileText },
          { id: 'dictionary', label: '무역 용어 사전', icon: BookOpen }
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

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">
              {user.type === 'buyer' ? '수입 관련 서류' : '수출 관련 서류'}
            </h2>
            <p className="text-blue-100">
              무역 업무에 필요한 모든 서류를 한 곳에서 관리하고 다운로드하세요
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">서류 목록</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <div key={doc.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-1">{doc.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{doc.desc}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                            {getStatusText(doc.status)}
                          </span>
                          <span className="text-xs text-gray-500">유형: {doc.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dictionary Tab */}
      {activeTab === 'dictionary' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="무역 용어를 검색하세요..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {filteredTerms.length > 0 ? (
            <div className="space-y-6">
              {filteredTerms.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.terms.map((term, termIndex) => (
                      <div key={termIndex} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-xl font-bold text-primary">{term.term}</span>
                              <span className="text-gray-600 text-sm">{term.full}</span>
                            </div>
                            <p className="text-gray-700">{term.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 검색어를 시도해보세요</p>
            </div>
          ) : (
            <div className="space-y-6">
              {tradeTerms.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.terms.map((term, termIndex) => (
                      <div key={termIndex} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-xl font-bold text-primary">{term.term}</span>
                              <span className="text-gray-600 text-sm">{term.full}</span>
                            </div>
                            <p className="text-gray-700">{term.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Documents;