import React from 'react';

type StatusType = 'HEALTHY' | 'LOW' | 'CRITICAL';

interface StatusBadgeProps {
  status: StatusType;
}

const statusStyles = {
  HEALTHY: 'bg-green-100 text-green-800',
  LOW: 'bg-yellow-100 text-yellow-800',
  CRITICAL: 'bg-red-100 text-red-800',
};

const statusLabels = {
  HEALTHY: 'Healthy',
  LOW: 'Low',
  CRITICAL: 'Critical',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
    {statusLabels[status]}
  </span>
);