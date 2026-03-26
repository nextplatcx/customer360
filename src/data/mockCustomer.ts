import { CustomerData } from '@/types/customer';

export const mockCustomerData: CustomerData = {
  snapshot: {
    customerId: 'C-2024-00382',
    name: '김민수',
    joinDate: '2019-03-15',
    customerType: '개인',
    totalLines: 3,
    isBundled: true,
    arpu: 68500,
    ltv: 4_932_000,
    mainProduct: '5G 프리미어 플러스',
    mainDevice: 'Galaxy S25 Ultra',
    lastContactChannel: '고객센터',
    lastContactDate: '2026-03-20',
  },

  journey: {
    currentStage: '안정이용',
    stageScore: 78,
    confidence: 85,
    stageHistory: [
      { stage: '가입초기', date: '2019-03-15' },
      { stage: '안정이용', date: '2019-09-01' },
      { stage: '관심탐색', date: '2023-06-15' },
      { stage: '안정이용', date: '2023-08-01' },
    ],
    nextExpectedStage: '안정이용',
    journeyPath: ['가입초기', '안정이용', '관심탐색', '안정이용'],
  },

  persona: {
    personaType: '디지털 얼리어답터',
    summary:
      '최신 기술과 디지털 서비스에 높은 관심을 보이며, 신규 서비스 출시 시 빠르게 가입하는 경향. 프리미엄 요금제를 선호하고, OTT 및 부가서비스 이용률이 높음.',
    traits: {
      brandOrientation: 65,
      digitalAcceptance: 92,
      convenienceDecision: 78,
      innovationSpending: 85,
    },
  },

  activities: [
    {
      id: 'ACT-001',
      date: '2026-03-20',
      type: '상담',
      channel: '고객센터',
      title: '요금제 변경 문의',
      description: '5G 프리미어 에센셜로 요금제 하향 문의. 데이터 사용량 확인 후 유지 결정.',
    },
    {
      id: 'ACT-002',
      date: '2026-03-18',
      type: '앱',
      channel: 'T앱',
      title: '실시간 데이터 사용량 조회',
      description: '이번 달 데이터 사용량 82% 확인.',
    },
    {
      id: 'ACT-003',
      date: '2026-03-15',
      type: '이벤트',
      channel: '마케팅',
      title: '결합 할인 프로모션 노출',
      description: '인터넷+TV 결합 할인 프로모션 푸시 알림 수신. 미클릭.',
    },
    {
      id: 'ACT-004',
      date: '2026-03-10',
      type: '매장',
      channel: '대리점',
      title: '단말 체험',
      description: 'Galaxy S25 Ultra 체험 방문. 기변 상담 진행.',
    },
    {
      id: 'ACT-005',
      date: '2026-03-05',
      type: '웹',
      channel: '홈페이지',
      title: '로밍 요금제 조회',
      description: '일본 로밍 요금제 비교 페이지 열람.',
    },
    {
      id: 'ACT-006',
      date: '2026-02-28',
      type: '상담',
      channel: '챗봇',
      title: '청구서 재발행 요청',
      description: '2월 청구서 이메일 재발행 요청 처리 완료.',
    },
  ],

  products: [
    {
      lineNumber: 'L001',
      phoneNumber: '010-1234-5678',
      plan: '5G 프리미어 플러스',
      monthlyFee: 89000,
      device: 'Galaxy S25 Ultra',
      contractStatus: '약정중',
      contractEndDate: '2027-01-15',
      bundledProducts: ['인터넷 기가라이트', 'IPTV 베이직'],
      vas: ['클라우드 100GB', '스팸차단'],
      changeEligibleDate: '2026-07-15',
      canUpsell: false,
    },
    {
      lineNumber: 'L002',
      phoneNumber: '010-1234-9012',
      plan: 'LTE 선택 49',
      monthlyFee: 49000,
      device: 'iPhone 15',
      contractStatus: '약정만료',
      contractEndDate: null,
      bundledProducts: [],
      vas: ['멜론 스트리밍'],
      changeEligibleDate: null,
      canUpsell: true,
    },
    {
      lineNumber: 'L003',
      phoneNumber: '010-5678-3456',
      plan: 'LTE 데이터 33',
      monthlyFee: 33000,
      device: 'Galaxy A35',
      contractStatus: '약정중',
      contractEndDate: '2026-06-30',
      bundledProducts: [],
      vas: [],
      changeEligibleDate: '2026-06-30',
      canUpsell: true,
    },
  ],

  usage: [
    {
      lineNumber: 'L001',
      dataUsageGB: 45.2,
      dataLimitGB: 100,
      voiceMinutes: 320,
      smsCount: 45,
      roamingUsage: 2.1,
      ottServices: ['Netflix', 'Disney+', 'Wavve'],
      vasUsage: ['클라우드 100GB', '스팸차단'],
      arpuTrend: [
        { month: '2025-10', amount: 91000 },
        { month: '2025-11', amount: 89500 },
        { month: '2025-12', amount: 92000 },
        { month: '2026-01', amount: 88000 },
        { month: '2026-02', amount: 87500 },
        { month: '2026-03', amount: 89000 },
      ],
      paymentPattern: '자동이체',
    },
    {
      lineNumber: 'L002',
      dataUsageGB: 12.8,
      dataLimitGB: 15,
      voiceMinutes: 180,
      smsCount: 20,
      roamingUsage: 0,
      ottServices: ['멜론'],
      vasUsage: ['멜론 스트리밍'],
      arpuTrend: [
        { month: '2025-10', amount: 52000 },
        { month: '2025-11', amount: 49000 },
        { month: '2025-12', amount: 49000 },
        { month: '2026-01', amount: 49000 },
        { month: '2026-02', amount: 51000 },
        { month: '2026-03', amount: 49000 },
      ],
      paymentPattern: '자동이체',
    },
    {
      lineNumber: 'L003',
      dataUsageGB: 8.5,
      dataLimitGB: 11,
      voiceMinutes: 90,
      smsCount: 10,
      roamingUsage: 0,
      ottServices: [],
      vasUsage: [],
      arpuTrend: [
        { month: '2025-10', amount: 33000 },
        { month: '2025-11', amount: 33000 },
        { month: '2025-12', amount: 33000 },
        { month: '2026-01', amount: 33000 },
        { month: '2026-02', amount: 33000 },
        { month: '2026-03', amount: 33000 },
      ],
      paymentPattern: '자동이체',
    },
  ],

  riskOpportunity: {
    churnRisk: 25,
    vocIncrease: false,
    usageDecline: false,
    competitorSignals: [],
    planChangeEligible: true,
    upsellEligible: true,
    bundleConversionEligible: true,
    vasSubscriptionEligible: true,
  },

  nextBestActions: [
    {
      id: 'NBA-001',
      offer: '2회선 5G 업그레이드 + 가족결합 할인',
      channel: '고객센터',
      timing: '즉시',
      message:
        '현재 약정 만료된 2회선을 5G로 업그레이드하시면 가족결합 추가 할인 15%를 받으실 수 있습니다.',
      priority: 1,
    },
    {
      id: 'NBA-002',
      offer: '인터넷+TV 결합 업그레이드',
      channel: '대리점',
      timing: '이번 달 내',
      message:
        '현재 기가라이트에서 기가프리미엄으로 업그레이드 시 월 5,000원 추가로 속도 2배 제공.',
      priority: 2,
    },
    {
      id: 'NBA-003',
      offer: '로밍 패키지 추천',
      channel: '앱 푸시',
      timing: '출국 2주 전',
      message:
        '일본 로밍 요금제를 조회하신 이력이 있습니다. 프리미어 고객 전용 로밍 무료 제공 안내드립니다.',
      priority: 3,
    },
  ],

  campaigns: [
    {
      id: 'CMP-001',
      campaignName: '봄맞이 결합상품 프로모션',
      exposureDate: '2026-03-15',
      channel: '앱 푸시',
      clicked: false,
      responded: false,
      converted: false,
    },
    {
      id: 'CMP-002',
      campaignName: '5G 업그레이드 캠페인',
      exposureDate: '2026-02-20',
      channel: 'LMS',
      clicked: true,
      responded: true,
      converted: false,
    },
    {
      id: 'CMP-003',
      campaignName: '멤버십 포인트 2배 적립',
      exposureDate: '2026-02-01',
      channel: '이메일',
      clicked: true,
      responded: false,
      converted: false,
    },
    {
      id: 'CMP-004',
      campaignName: '신규 OTT 번들 출시',
      exposureDate: '2026-01-10',
      channel: '앱 푸시',
      clicked: true,
      responded: true,
      converted: true,
    },
  ],

  campaignFatigue: {
    level: '보통',
    recentCount: 4,
    lastCampaignDate: '2026-03-15',
  },

  aiSummary: {
    statusSummary:
      '7년차 프리미엄 고객으로 안정적 이용 중. 최근 요금제 하향 문의가 있었으나, 데이터 사용량 확인 후 유지 결정. 2회선 약정 만료 상태로 이탈 리스크는 낮으나 기변/요금제 변경 가능성 존재.',
    mainInterests: ['요금 최적화', '로밍 서비스', '최신 단말'],
    riskFactors: ['요금제 하향 문의 이력', '프로모션 무반응 증가'],
    recommendedStrategy:
      '2회선 5G 업그레이드를 통한 가족결합 강화 제안. 프리미어 전용 로밍 혜택을 활용한 프리미엄 경험 유지. 요금 민감도 대응으로 포인트/할인 혜택 강조.',
  },

  payments: [
    { id: 'PAY-001', date: '2026-03-10', amount: 171000, method: '자동이체', status: '완납', lineNumber: 'ALL' },
    { id: 'PAY-002', date: '2026-02-10', amount: 171500, method: '자동이체', status: '완납', lineNumber: 'ALL' },
    { id: 'PAY-003', date: '2026-01-10', amount: 174000, method: '자동이체', status: '완납', lineNumber: 'ALL' },
    { id: 'PAY-004', date: '2025-12-10', amount: 174000, method: '자동이체', status: '완납', lineNumber: 'ALL' },
    { id: 'PAY-005', date: '2025-11-10', amount: 171500, method: '자동이체', status: '완납', lineNumber: 'ALL' },
    { id: 'PAY-006', date: '2025-10-10', amount: 176000, method: '자동이체', status: '완납', lineNumber: 'ALL' },
  ],

  billings: [
    {
      id: 'BIL-001', billingMonth: '2026-03', totalAmount: 171000,
      planCharge: 171000, deviceInstallment: 42000, vasCharge: 8900,
      discount: -55900, additionalCharge: 5000, lineNumber: 'ALL',
    },
    {
      id: 'BIL-002', billingMonth: '2026-02', totalAmount: 171500,
      planCharge: 171000, deviceInstallment: 42000, vasCharge: 8900,
      discount: -55400, additionalCharge: 5000, lineNumber: 'ALL',
    },
    {
      id: 'BIL-003', billingMonth: '2026-01', totalAmount: 174000,
      planCharge: 171000, deviceInstallment: 42000, vasCharge: 8900,
      discount: -52900, additionalCharge: 5000, lineNumber: 'ALL',
    },
    {
      id: 'BIL-004', billingMonth: '2025-12', totalAmount: 174000,
      planCharge: 171000, deviceInstallment: 42000, vasCharge: 8900,
      discount: -52900, additionalCharge: 5000, lineNumber: 'ALL',
    },
    {
      id: 'BIL-005', billingMonth: '2025-11', totalAmount: 171500,
      planCharge: 171000, deviceInstallment: 42000, vasCharge: 8900,
      discount: -55400, additionalCharge: 5000, lineNumber: 'ALL',
    },
    {
      id: 'BIL-006', billingMonth: '2025-10', totalAmount: 176000,
      planCharge: 171000, deviceInstallment: 42000, vasCharge: 8900,
      discount: -50900, additionalCharge: 5000, lineNumber: 'ALL',
    },
  ],

  discounts: [
    {
      id: 'DSC-001', name: '가족결합 할인', type: '요금할인',
      discountAmount: 25000, startDate: '2022-01-01', endDate: '2027-01-01',
      status: '적용중', lineNumber: 'L001',
    },
    {
      id: 'DSC-002', name: '장기고객 할인', type: '요금할인',
      discountAmount: 15000, startDate: '2024-03-15', endDate: '2027-03-15',
      status: '적용중', lineNumber: 'L001',
    },
    {
      id: 'DSC-003', name: '약정 단말 할인', type: '요금할인',
      discountAmount: 12000, startDate: '2025-01-15', endDate: '2027-01-15',
      status: '적용중', lineNumber: 'L001',
    },
    {
      id: 'DSC-004', name: '멤버십 VIP 혜택', type: '멤버십',
      discountAmount: 5000, startDate: '2026-01-01', endDate: '2026-12-31',
      status: '적용중', lineNumber: 'ALL',
    },
    {
      id: 'DSC-005', name: 'T데이터 쿠폰', type: '데이터보너스',
      discountAmount: 0, startDate: '2026-03-01', endDate: '2026-03-31',
      status: '적용중', lineNumber: 'L001',
    },
    {
      id: 'DSC-006', name: '제휴카드 할인', type: '제휴할인',
      discountAmount: 8000, startDate: '2025-06-01', endDate: '2026-05-31',
      status: '적용중', lineNumber: 'ALL',
    },
  ],
};

/** 더미 고객 리스트 (검색용) */
export const mockCustomerList = [
  { customerId: 'C-2024-00382', name: '김민수', phoneNumber: '010-1234-5678', customerType: '개인' as const, arpu: 68500, churnRisk: 25 },
  { customerId: 'C-2024-00127', name: '이서연', phoneNumber: '010-9876-5432', customerType: '개인' as const, arpu: 52000, churnRisk: 45 },
  { customerId: 'C-2024-00531', name: '(주)테크솔루션', phoneNumber: '02-555-1234', customerType: '법인' as const, arpu: 2450000, churnRisk: 15 },
  { customerId: 'C-2024-00298', name: '박지훈', phoneNumber: '010-5555-7890', customerType: '개인' as const, arpu: 42000, churnRisk: 62 },
  { customerId: 'C-2024-00445', name: '최영희 가구', phoneNumber: '010-3333-4444', customerType: '가구' as const, arpu: 185000, churnRisk: 8 },
];
