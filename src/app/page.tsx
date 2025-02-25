import { Button } from '@/components/ui/button';

export default function Home() {
        return (
                <div className="flex flex-col gap-4 p-6">
                        <div className="grid grid-cols-3 gap-4">
                                <Button variant="primary">Primary</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="muted">Muted</Button>
                                <Button variant="teritary">Teritary</Button>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                                <Button size="xs">XS</Button>
                                <Button size="sm">SM</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">LG</Button>
                                <Button size="icon">Icon</Button>
                        </div>
                </div>
        );
}
