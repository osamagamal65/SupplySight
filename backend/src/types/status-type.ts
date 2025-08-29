export type StatusType = 'HEALTHY' | 'LOW' | 'CRITICAL';

export function isStatusType(status: string): status is StatusType {
  return ['HEALTHY', 'LOW', 'CRITICAL'].includes(status);
}

export function calculateStatus(stock: number, demand: number): StatusType {
  if (stock > demand) return 'HEALTHY';
  if (stock === demand) return 'LOW';
  return 'CRITICAL';
}