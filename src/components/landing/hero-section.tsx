'use client';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUser } from "@/firebase"

export function HeroSection() {
    const { user } = useUser();
    const getStartedLink = user ? "/dashboard" : "/login";

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse-slow"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                        Unlock Pharmaceutical Insights with the Power of AI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Our platform connects to clinical trials, patents, and web intelligence to provide you with comprehensive, AI-driven insights for drug discovery and repurposing.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild size="lg">
                            <Link href={getStartedLink}>Get started</Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg">
                            <a href="#features">Learn more <span aria-hidden="true">→</span></a>
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-accent/30 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse-slow animation-delay-2000"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    )
}
