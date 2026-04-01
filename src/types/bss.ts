// ============================================================
// BSS Customer 360 - TO-BE Type Definitions
// ============================================================

/** 고객 등급 */
export type CustomerGrade = 'VVIP' | 'VIP' | '우수' | '일반';

/** 주의 플래그 심각도 */
export type AlertSeverity = 'critical' | 'warning' | 'info';

/** 주의 플래그 유형 */
export type AlertType =
  | '미납'
  | '정지'
  | '민원'
  | '해지의향'
  | '약정만료'
  | '품질이슈'
  | '반복문의'
  | 'VIP'
  | '요금민감';

/** 주의/강조 플래그 */
export interface AlertFlag {
  type: AlertType;
  severity: AlertSeverity;
  message: string;
}

// ============================================================
// Module 1: 고객 식별 헤더
// ============================================================
export interface CustomerHeaderData {
  customerId: string;
  name: string;
  birthDate: string;
  customerType: '개인' | '법인' | '개인사업자';
  grade: CustomerGrade;
  isVIP: boolean;
  identityVerified: boolean;
  accountStatus: '정상' | '정지' | '해지';
  totalServices: number;
  activeLines: number;
  alertFlags: AlertFlag[];
  lastContactDate: string;
  lastContactChannel: string;
  managedChannel: string;
}

// ============================================================
// Module 2: 고객 관계 및 계정 구조
// ============================================================
export interface AccountStructure {
  representativeAccount: string;
  billingAccount: string;
  paymentAccount: string;
  accountHolder: string;
  actualUser: string;
  billingAddress: string;
  installAddress?: string;
  isBundled: boolean;
  bundleGroupId?: string;
  bundleName?: string;
  familyLines: { lineNumber: string; name: string; relation: string }[];
  b2bOrg?: string;
  b2bDept?: string;
}

// ============================================================
// Module 3: 보유 서비스/회선 통합 포트폴리오
// ============================================================
export type ServiceType = 'mobile' | 'internet' | 'iptv' | 'phone' | 'vas';
export type ServiceStatus = '사용중' | '일시정지' | '해지예정' | '해지';

export interface ServiceItem {
  serviceId: string;
  type: ServiceType;
  typeLabel: string;
  serviceNumber: string;
  productName: string;
  planName: string;
  monthlyFee: number;
  status: ServiceStatus;
  activationDate: string;
  usagePeriodMonths: number;
  isRepresentative: boolean;
  isBundled: boolean;
  holderName: string;
  actualUserName: string;
  alertFlags: AlertType[];
}

// ============================================================
// Module 4: 선택 서비스 상세 360
// ============================================================
export interface ServiceDetail {
  serviceId: string;

  /** 4-1. 상품/계약 */
  product: {
    planName: string;
    planFee: number;
    contractType: '약정중' | '약정만료' | '무약정';
    contractMonths: number;
    contractEndDate: string | null;
    activationDate: string;
    lastChangeDate: string;
    vas: { name: string; fee: number }[];
    discounts: { name: string; amount: number; endDate: string }[];
    bundleProducts: string[];
  };

  /** 4-2. 청구/납부 */
  billing: {
    currentMonthAmount: number;
    lastPaymentStatus: '완납' | '미납' | '부분납';
    lastPaymentDate: string;
    paymentMethod: '자동이체' | '카드' | '가상계좌' | '현장';
    paymentAccount: string;
    isOverdue: boolean;
    overdueAmount: number;
    overdueMonths: number;
    billingMethod: '이메일' | '우편' | '앱';
  };

  /** 4-3. 단말/장비 */
  device: {
    model: string;
    manufacturer: string;
    imei: string;
    usimNumber: string;
    esimYn: boolean;
    networkType: '5G' | 'LTE' | '3G' | '유선' | 'N/A';
    deviceStatus: '정상' | '분실' | '파손' | '교체중';
    installmentMonthly: number;
    installmentRemaining: number;
    deviceHistory: { date: string; model: string; event: string }[];
  };

  /** 4-4. 이용/품질 */
  usage: {
    dataUsedGB: number;
    dataLimitGB: number;
    voiceMinutes: number;
    smsCount: number;
    roamingActive: boolean;
    roamingCountry?: string;
    vasUsage: string[];
    qualityIssueFlag: boolean;
    recentIssues: string[];
    relatedInquiry: string | null;
  };
}

// ============================================================
// Module 5: 상담 인사이트 및 주의정보
// ============================================================
export interface ConsultingInsightData {
  priorityAlerts: {
    type: string;
    message: string;
    severity: AlertSeverity;
    actionLabel?: string;
  }[];
  recentConsultSummary: string;
  vocMemo: string | null;
  repeatIssues: string[];
  internalNotes: string[];
  recommendedActions: {
    id: string;
    action: string;
    reason: string;
    channel: string;
    priority: number;
  }[];
}

// ============================================================
// Module 6: 타임라인/이력
// ============================================================
export type TimelineCategory =
  | '전체'
  | '서비스변경'
  | '청구수납'
  | '상담'
  | '단말'
  | '장애품질'
  | '민원'
  | '혜택';

export interface TimelineItem {
  id: string;
  date: string;
  category: TimelineCategory;
  serviceId?: string;
  serviceLabel?: string;
  title: string;
  description: string;
  channel?: string;
  operator?: string;
}

// ============================================================
// Bottom Tab: VOC/상담
// ============================================================
export interface VOCRecord {
  id: string;
  date: string;
  type: '문의' | '불만' | '제안' | '칭찬';
  channel: string;
  title: string;
  status: '처리완료' | '처리중' | '접수';
  assignee: string;
  summary: string;
  relatedServiceId?: string;
}

// ============================================================
// Bottom Tab: 혜택/약정
// ============================================================
export interface BenefitRecord {
  id: string;
  name: string;
  type: '요금할인' | '데이터보너스' | '제휴할인' | '멤버십' | '프로모션';
  discountAmount: number;
  startDate: string;
  endDate: string;
  status: '적용중' | '만료' | '대기';
  serviceId: string;
  serviceLabel: string;
}

// ============================================================
// Quick Action
// ============================================================
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  category: '요금' | '단말' | '서비스' | '상담' | '청구';
  requiredRole: ('call_center' | 'store' | 'marketer')[];
}

// ============================================================
// 전체 BSS 고객 데이터
// ============================================================
export interface BSSCustomerData {
  header: CustomerHeaderData;
  accountStructure: AccountStructure;
  services: ServiceItem[];
  serviceDetails: Record<string, ServiceDetail>;
  consultingInsight: ConsultingInsightData;
  timeline: TimelineItem[];
  vocRecords: VOCRecord[];
  benefits: BenefitRecord[];
}
