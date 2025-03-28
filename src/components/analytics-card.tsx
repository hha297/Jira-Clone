import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
        title: string;
        value: number;
        variant: 'up' | 'down';
        increasedValue: number;
}

export const AnalyticsCard = ({ title, value, variant, increasedValue }: AnalyticsCardProps) => {
        const iconColor = variant === 'up' ? 'text-emerald-500' : 'text-red-500';
        const increasedValueColor = variant === 'up' ? 'text-emerald-500' : 'text-red-500';
        const Icon = variant === 'up' ? FaCaretUp : FaCaretDown;
        return (
                <Card className="shadow-none border-none w-full">
                        <CardHeader>
                                <div className="flex items-center gap-x-2">
                                        <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
                                                <span className="truncate text-base">{title}</span>
                                        </CardDescription>
                                        <div className="flex items-center gap-x-1">
                                                <Icon className={cn('w-4 h-4', iconColor)} />
                                                <span
                                                        className={cn(
                                                                'truncate text-base font-medium',
                                                                increasedValueColor,
                                                        )}
                                                >
                                                        {increasedValue}
                                                </span>
                                        </div>
                                </div>
                                <CardTitle className="text-3xl font-bold">{value}</CardTitle>
                        </CardHeader>
                </Card>
        );
};
