import { Loader } from 'lucide-react';

export const PageLoader = () => {
        return (
                <div className="flex items-center justify-center h-full">
                        <Loader className="size-4 animate-spin text-muted-foreground" />
                </div>
        );
};
