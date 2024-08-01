import { cn } from '@/lib/utils';
import tw, { css } from 'twin.macro';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('', className)} css={tw`rounded animate-pulse bg-muted`} {...props} />;
}

export { Skeleton };
