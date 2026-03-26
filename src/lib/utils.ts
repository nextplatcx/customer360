/** 숫자를 한국 원화 형식으로 포맷 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원';
}

/** 날짜 문자열을 한국어 형식으로 포맷 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

/** 퍼센트 바 색상 결정 */
export function getRiskColor(value: number): string {
  if (value <= 30) return 'bg-green-500';
  if (value <= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

/** 여정 스테이지별 색상 */
export function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    '가입초기': 'bg-blue-100 text-blue-800',
    '안정이용': 'bg-green-100 text-green-800',
    '관심탐색': 'bg-yellow-100 text-yellow-800',
    '이탈위험': 'bg-orange-100 text-orange-800',
    '이탈진행': 'bg-red-100 text-red-800',
    '윈백대상': 'bg-purple-100 text-purple-800',
  };
  return colors[stage] || 'bg-gray-100 text-gray-800';
}

/** 활동 타입별 아이콘 이모지 */
export function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    '상담': '🎧',
    '앱': '📱',
    '웹': '🌐',
    '매장': '🏪',
    '이벤트': '📢',
  };
  return icons[type] || '📋';
}

/** className 합치기 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
