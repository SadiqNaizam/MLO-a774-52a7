import React from 'react';
import { cn } from '@/lib/utils'; // For conditional class names

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'FAILED';

interface OrderStatusIndicatorProps {
  status: OrderStatus;
  className?: string;
}

const statusStyles: Record<OrderStatus, { text: string; bgColor: string; textColor: string; dotColor: string }> = {
  PENDING: { text: 'Pending', bgColor: 'bg-gray-100', textColor: 'text-gray-700', dotColor: 'bg-gray-400' },
  CONFIRMED: { text: 'Confirmed', bgColor: 'bg-blue-100', textColor: 'text-blue-700', dotColor: 'bg-blue-500' },
  PREPARING: { text: 'Preparing', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', dotColor: 'bg-yellow-500' },
  OUT_FOR_DELIVERY: { text: 'Out for Delivery', bgColor: 'bg-purple-100', textColor: 'text-purple-700', dotColor: 'bg-purple-500' },
  DELIVERED: { text: 'Delivered', bgColor: 'bg-green-100', textColor: 'text-green-700', dotColor: 'bg-green-500' },
  CANCELLED: { text: 'Cancelled', bgColor: 'bg-red-100', textColor: 'text-red-700', dotColor: 'bg-red-500' },
  FAILED: { text: 'Failed', bgColor: 'bg-pink-100', textColor: 'text-pink-700', dotColor: 'bg-pink-500' },
};

const OrderStatusIndicator: React.FC<OrderStatusIndicatorProps> = ({ status, className }) => {
  console.log("Rendering OrderStatusIndicator with status:", status);
  const style = statusStyles[status] || statusStyles.PENDING; // Fallback to PENDING if status is unknown

  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        style.bgColor,
        style.textColor,
        className
      )}
    >
      <span className={cn('w-2 h-2 mr-1.5 rounded-full', style.dotColor)}></span>
      {style.text}
    </div>
  );
};
export default OrderStatusIndicator;