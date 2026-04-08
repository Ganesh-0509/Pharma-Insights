import { BrainCircuit, Zap, TestTube } from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        name: 'AI-Powered Insights',
        description: 'Leverage generative AI to uncover novel repurposing opportunities and summarize complex data sets in seconds.',
        icon: BrainCircuit,
    },
    {
        name: 'Unified Data Sources',
        description: 'Access integrated data from clinical trials, patent databases, and the latest scientific literature all in one place.',
        icon: Zap,
    },
    {
        name: 'Rapid Reporting',
        description: 'Generate comprehensive, customizable reports in PDF or Excel format with the click of a button.',
        icon: TestTube,
    },
];

export function AboutSection() {
    return (
        <section id="about" className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">About The Project</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Accelerate Drug Discovery with AI
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Pharma Insights Explorer is a revolutionary platform designed to empower researchers and scientists in the pharmaceutical industry. We help you make faster, more informed decisions by automating data aggregation and providing powerful AI-driven insights.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-foreground">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                        <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
