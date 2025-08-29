import { User, AIAgent, TradeProcessStep, TradeDocument, MarketData, TradingPartner, Notification, AICall } from '../types';

// Mock Users
export const mockUsers: Record<string, User> = {
  buyer: {
    id: '1',
    username: 'buyer',
    company: '삼성물산',
    type: 'buyer',
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
    type: 'seller',
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

// AI Agents
export const aiAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    languages: ['English', '中文', '한국어'],
    specialty: 'Electronics & Manufacturing',
    callsCompleted: 1247,
    successRate: 89,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '2',
    name: 'Hiroshi Tanaka',
    languages: ['日本語', 'English', '한국어'],
    specialty: 'Automotive & Machinery',
    callsCompleted: 956,
    successRate: 92,
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    languages: ['Español', 'English', 'Português'],
    specialty: 'Textiles & Consumer Goods',
    callsCompleted: 1089,
    successRate: 87,
    avatar: '/api/placeholder/60/60'
  }
];

// Buyer Trade Process Steps
export const buyerProcessSteps: TradeProcessStep[] = [
  { id: 1, step: 'Market Research', status: 'completed', desc: '시장 조사 및 공급업체 발굴', progress: 100 },
  { id: 2, step: 'RFQ Preparation', status: 'completed', desc: '견적 요청서 준비', progress: 100 },
  { id: 3, step: 'Supplier Evaluation', status: 'in_progress', desc: '공급업체 평가 및 선정', progress: 65 },
  { id: 4, step: 'Contract Negotiation', status: 'pending', desc: '계약 조건 협상', progress: 0 },
  { id: 5, step: 'LC Opening', status: 'pending', desc: '신용장 개설', progress: 0 },
  { id: 6, step: 'Quality Inspection', status: 'pending', desc: '품질 검사 및 승인', progress: 0 },
  { id: 7, step: 'Shipment Tracking', status: 'pending', desc: '배송 추적', progress: 0 },
  { id: 8, step: 'Customs Clearance', status: 'pending', desc: '통관 처리', progress: 0 }
];

// Seller Trade Process Steps
export const sellerProcessSteps: TradeProcessStep[] = [
  { id: 1, step: 'Lead Generation', status: 'completed', desc: '잠재 고객 발굴', progress: 100 },
  { id: 2, step: 'Quotation Preparation', status: 'completed', desc: '견적서 작성', progress: 100 },
  { id: 3, step: 'Sample Preparation', status: 'completed', desc: '샘플 준비 및 발송', progress: 100 },
  { id: 4, step: 'Contract Finalization', status: 'in_progress', desc: '계약 확정', progress: 45 },
  { id: 5, step: 'Production Planning', status: 'pending', desc: '생산 계획 수립', progress: 0 },
  { id: 6, step: 'Quality Control', status: 'pending', desc: '품질 관리', progress: 0 },
  { id: 7, step: 'Export Documentation', status: 'pending', desc: '수출 서류 준비', progress: 0 },
  { id: 8, step: 'Shipment Execution', status: 'pending', desc: '선적 실행', progress: 0 }
];

// Trade Documents for Buyer
export const buyerDocuments: TradeDocument[] = [
  { id: 1, name: 'Purchase Order Template', type: 'PO', status: 'template', desc: '구매 주문서 템플릿' },
  { id: 2, name: 'L/C Application Form', type: 'LC', status: 'draft', desc: '신용장 개설 신청서' },
  { id: 3, name: 'Import License', type: 'LICENSE', status: 'approved', desc: '수입 허가증' },
  { id: 4, name: 'Quality Specification', type: 'SPEC', status: 'final', desc: '품질 규격서' }
];

// Trade Documents for Seller
export const sellerDocuments: TradeDocument[] = [
  { id: 1, name: 'Commercial Invoice', type: 'INVOICE', status: 'template', desc: '상업송장 템플릿' },
  { id: 2, name: 'Packing List', type: 'PACKING', status: 'ready', desc: '포장명세서' },
  { id: 3, name: 'Certificate of Origin', type: 'COO', status: 'approved', desc: '원산지증명서' },
  { id: 4, name: 'Bill of Lading', type: 'BL', status: 'draft', desc: '선하증권' },
  { id: 5, name: 'Export License', type: 'LICENSE', status: 'final', desc: '수출 허가증' }
];

// Market Data
export const marketData: MarketData[] = [
  { sector: 'Electronics', growthRate: 12.5, trend: 'up', insights: ['AI/ML 부품 수요 급증', '반도체 공급망 안정화'] },
  { sector: 'Automotive', growthRate: 8.3, trend: 'stable', insights: ['전기차 부품 확대', '자율주행 기술 발전'] },
  { sector: 'Textiles', growthRate: -2.1, trend: 'down', insights: ['지속가능성 요구 증가', '원자재 가격 상승'] },
  { sector: 'Machinery', growthRate: 15.7, trend: 'up', insights: ['자동화 장비 붐', '스마트팩토리 투자 확대'] }
];

// Trading Partners
export const tradingPartners: TradingPartner[] = [
  { country: '중국', flag: '🇨🇳', specialty: 'Manufacturing Hub', status: 'growing', matchingRate: 87 },
  { country: '일본', flag: '🇯🇵', specialty: 'High-tech Components', status: 'stable', matchingRate: 92 },
  { country: '베트남', flag: '🇻🇳', specialty: 'Cost-effective Production', status: 'growing', matchingRate: 78 },
  { country: '독일', flag: '🇩🇪', specialty: 'Precision Engineering', status: 'active', matchingRate: 94 },
  { country: '미국', flag: '🇺🇸', specialty: 'Innovation & Tech', status: 'active', matchingRate: 89 }
];

// Notifications
export const mockNotifications: Notification[] = [
  { id: 1, title: '새로운 매칭 결과', desc: '폭스콘 테크놀로지와 95% 매칭됩니다', time: '5분 전', type: 'match' },
  { id: 2, title: 'AI 상담 완료', desc: 'Sarah Chen이 BMW Korea와 상담을 완료했습니다', time: '1시간 전', type: 'call' },
  { id: 3, title: '서류 승인', desc: '수출 허가증이 승인되었습니다', time: '3시간 전', type: 'document' },
  { id: 4, title: '로그인 알림', desc: '새로운 기기에서 로그인되었습니다', time: '1일 전', type: 'login' }
];

// AI Calls
export const mockAICalls: AICall[] = [
  {
    id: '1',
    targetCompany: 'BMW Korea',
    targetContact: 'Park Manager',
    targetPhone: '+82-2-1234-5678',
    targetCountry: '대한민국',
    language: '한국어',
    requestedBy: 'seller',
    callPurpose: '자동차 부품 공급 제안',
    status: 'completed',
    callDate: '2024-08-28',
    callTime: '14:30',
    duration: '23분',
    aiAgent: 'Sarah Chen',
    callSummary: {
      overview: 'BMW Korea와 자동차 부품 공급에 대한 긍정적인 논의가 진행되었습니다.',
      keyPoints: ['월 1000개 단위 납품 가능', '품질 인증서 보유', '가격 경쟁력 확보'],
      concerns: ['배송 일정 조율 필요', '품질 검증 과정 필요'],
      nextSteps: ['샘플 발송', '공장 방문 일정 조율', '정식 견적서 제출'],
      sentiment: 'positive',
      businessPotential: 'high'
    },
    followUpActions: [
      { id: '1', type: 'email', description: '상세 제품 카탈로그 발송', completed: true },
      { id: '2', type: 'sample', description: '샘플 제품 준비 및 발송', completed: false },
      { id: '3', type: 'meeting', description: '공장 견학 일정 조율', completed: false }
    ]
  },
  {
    id: '2',
    targetCompany: 'LG Electronics',
    targetContact: 'Kim Director',
    targetPhone: '+82-2-3333-4444',
    targetCountry: '대한민국',
    language: '한국어',
    requestedBy: 'buyer',
    callPurpose: '디스플레이 패널 구매 문의',
    status: 'scheduled',
    callDate: '2024-08-30',
    callTime: '10:00',
    duration: null,
    aiAgent: 'Hiroshi Tanaka',
    callSummary: null,
    followUpActions: []
  }
];