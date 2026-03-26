// ============================================================
// Customer 360 Dashboard - Type Definitions
// ============================================================

/** 사용자 역할 */
export type UserRole = 'call_center' | 'store' | 'marketer';

/** 역할별 한글 라벨 */
export const ROLE_LABELS: Record<UserRole, string> = {
  call_center: '고객센터 상담',
  store: '대리점 상담',
  marketer: '내부 마케터',
};

/** 고객 유형 */
export type CustomerType = '개인' | '법인' | '가구';

/** 여정 스테이지 */
export type JourneyStage =
  | '가입초기'
  | '안정이용'
  | '관심탐색'
  | '이탈위험'
  | '이탈진행'
  | '윈백대상';

/** 페르소나 유형 */
export type PersonaType =
  | '디지털 얼리어답터'
  | '가성비 추구형'
  | '브랜드 충성형'
  | '무관심형'
  | '혜택 민감형';

// ---- Module 1: Customer Snapshot ----
export interface CustomerSnapshot {
  customerId: string;
  name: string;
  joinDate: string;
  customerType: CustomerType;
  totalLines: number;
  isBundled: boolean;
  arpu: number;
  ltv: number;
  mainProduct: string;
  mainDevice: string;
  lastContactChannel: string;
  lastContactDate: string;
}

// ---- Module 2: Journey Status ----
export interface JourneyStatus {
  currentStage: JourneyStage;
  stageScore: number;
  confidence: number;
  stageHistory: { stage: JourneyStage; date: string }[];
  nextExpectedStage: JourneyStage;
  journeyPath: JourneyStage[];
}

// ---- Module 3: Persona ----
export interface PersonaInfo {
  personaType: PersonaType;
  summary: string;
  traits: {
    brandOrientation: number;    // 브랜드/혜택 지향 0~100
    digitalAcceptance: number;   // 디지털/AI 수용 0~100
    convenienceDecision: number; // 편의 중심 의사결정 0~100
    innovationSpending: number;  // 혁신/유료 지불 성향 0~100
  };
}

// ---- Module 4: Activity Timeline ----
export interface ActivityItem {
  id: string;
  date: string;
  type: '상담' | '앱' | '웹' | '매장' | '이벤트';
  channel: string;
  title: string;
  description: string;
}

// ---- Module 5: Product & Contract ----
export interface ProductLine {
  lineNumber: string;
  phoneNumber: string;
  plan: string;
  monthlyFee: number;
  device: string;
  contractStatus: '약정중' | '약정만료' | '무약정';
  contractEndDate: string | null;
  bundledProducts: string[];
  vas: string[];  // 부가서비스
  changeEligibleDate: string | null;
  canUpsell: boolean;
}

// ---- Module 6: Usage & Value ----
export interface UsageValue {
  lineNumber: string;
  dataUsageGB: number;
  dataLimitGB: number;
  voiceMinutes: number;
  smsCount: number;
  roamingUsage: number;
  ottServices: string[];
  vasUsage: string[];
  arpuTrend: { month: string; amount: number }[];
  paymentPattern: '정상' | '연체경험' | '자동이체';
}

// ---- Module 7: Risk & Opportunity ----
export interface RiskOpportunity {
  // Risk
  churnRisk: number;          // 0~100
  vocIncrease: boolean;
  usageDecline: boolean;
  competitorSignals: string[];
  // Opportunity
  planChangeEligible: boolean;
  upsellEligible: boolean;
  bundleConversionEligible: boolean;
  vasSubscriptionEligible: boolean;
}

// ---- Module 8: Next Best Action ----
export interface NextBestAction {
  id: string;
  offer: string;
  channel: string;
  timing: string;
  message: string;
  priority: number;
}

// ---- Module 9: Campaign & Response ----
export interface CampaignHistory {
  id: string;
  campaignName: string;
  exposureDate: string;
  channel: string;
  clicked: boolean;
  responded: boolean;
  converted: boolean;
}

export interface CampaignFatigue {
  level: '낮음' | '보통' | '높음' | '매우높음';
  recentCount: number;
  lastCampaignDate: string;
}

// ---- Module 10: AI Summary ----
export interface AISummary {
  statusSummary: string;
  mainInterests: string[];
  riskFactors: string[];
  recommendedStrategy: string;
}

// ---- Billing & Payment (고객센터 추가 정보) ----
export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: '자동이체' | '카드' | '가상계좌' | '현장납부';
  status: '완납' | '미납' | '부분납';
  lineNumber: string;
}

export interface BillingRecord {
  id: string;
  billingMonth: string;
  totalAmount: number;
  planCharge: number;
  deviceInstallment: number;
  vasCharge: number;
  discount: number;
  additionalCharge: number;
  lineNumber: string;
}

export interface DiscountBenefit {
  id: string;
  name: string;
  type: '요금할인' | '데이터보너스' | '제휴할인' | '멤버십';
  discountAmount: number;
  startDate: string;
  endDate: string;
  status: '적용중' | '만료' | '대기';
  lineNumber: string;
}

// ---- Composite Customer Data ----
export interface CustomerData {
  snapshot: CustomerSnapshot;
  journey: JourneyStatus;
  persona: PersonaInfo;
  activities: ActivityItem[];
  products: ProductLine[];
  usage: UsageValue[];
  riskOpportunity: RiskOpportunity;
  nextBestActions: NextBestAction[];
  campaigns: CampaignHistory[];
  campaignFatigue: CampaignFatigue;
  aiSummary: AISummary;
  payments: PaymentRecord[];
  billings: BillingRecord[];
  discounts: DiscountBenefit[];
}

// ---- Role-based module visibility ----
export type ModuleId =
  | 'snapshot'
  | 'journey'
  | 'persona'
  | 'activity'
  | 'product'
  | 'usage'
  | 'risk'
  | 'nba'
  | 'campaign'
  | 'aiSummary'
  | 'payment'
  | 'billing'
  | 'discount';

export const ROLE_MODULES: Record<UserRole, ModuleId[]> = {
  call_center: [
    'snapshot', 'journey', 'persona', 'activity',
    'product', 'usage', 'risk', 'nba',
    'aiSummary', 'payment', 'billing', 'discount',
  ],
  store: [
    'snapshot', 'journey', 'persona',
    'product', 'usage', 'risk', 'nba', 'aiSummary',
  ],
  marketer: [
    'snapshot', 'journey', 'persona', 'activity',
    'usage', 'risk', 'nba', 'campaign', 'aiSummary',
  ],
};
