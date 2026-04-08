'use client';
import { DataCard } from '@/components/dashboard/data-card';
import { KnowledgeUploadCard } from '@/components/dashboard/knowledge-upload-card';
import { BookOpen } from 'lucide-react';
import { Suspense, useContext } from 'react';
import { DashboardContext } from '../layout';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

function WebIntelligencePage() {
    const context = useContext(DashboardContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { state, isLoading, handleSummaryUpdate } = context;
    const webIntelligenceData = state.webIntelligenceData;

    const chartData = webIntelligenceData?.publicationYearDistribution.map(d => ({
        year: d.year,
        count: d.count,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <h1 className="text-2xl font-bold">Web Intelligence & Literature</h1>
                <DataCard title="Web & Literature Analysis" icon={BookOpen} isLoading={isLoading}>
                    {webIntelligenceData && (
                        <div className="space-y-4 text-base">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Publications Found:</p>
                                    <p className="text-2xl font-bold text-primary">{webIntelligenceData.totalPublications.toLocaleString()}+</p>
                                 </div>
                                <div>
                                    <p className="font-semibold">Top Journal:</p>
                                    <p className="text-2xl font-bold truncate">{webIntelligenceData.topJournals[0]?.name ?? 'N/A'}</p>
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold pt-2">AI Summary:</p>
                                <p className="text-muted-foreground">{webIntelligenceData.summary}</p>
                            </div>

                            {chartData && chartData.length > 0 && (
                                <div>
                                    <p className="font-semibold pt-4 pb-2">Publications Over Time</p>
                                    <ChartContainer config={{}} className="h-[200px] w-full">
                                        <BarChart accessibilityLayer data={chartData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="year"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                            />
                                            <YAxis tickLine={false} axisLine={false} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            )}

                            <div>
                                <p className="font-semibold pt-4">Key Publications:</p>
                                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                {webIntelligenceData.keyPublications.map((p) => (
                                    <li key={p.id}>
                                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
                                            {p.title}
                                        </a> ({p.journal})
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </DataCard>
            </div>
            <div className="lg:col-span-1 space-y-6">
                <KnowledgeUploadCard onSummaryUpdate={handleSummaryUpdate} />
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <WebIntelligencePage />
        </Suspense>
    )
}
