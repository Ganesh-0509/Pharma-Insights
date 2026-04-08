'use client';
import { DataCard } from '@/components/dashboard/data-card';
import { TestTube } from 'lucide-react';
import { Suspense, useContext } from 'react';
import { DashboardContext } from '../layout';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

function ClinicalTrialsPage() {
    const context = useContext(DashboardContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { state, isLoading } = context;
    const clinicalTrialsData = state.clinicalTrialsData;

    const chartData = clinicalTrialsData?.trialsByPhase.map(p => ({
        phase: `Phase ${p.phase}`,
        count: p.count,
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Clinical Trials</h1>
            <DataCard title="Clinical Trials Analysis" icon={TestTube} isLoading={isLoading}>
                {clinicalTrialsData && (
                    <div className="space-y-4 text-base">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Trials Found:</p>
                                <p className="text-2xl font-bold text-primary">{clinicalTrialsData.totalCount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Most Active Country:</p>
                                <p className="text-2xl font-bold">{clinicalTrialsData.mostActiveCountry}</p>
                            </div>
                        </div>
                        
                        <div>
                            <p className="font-semibold pt-2">AI Summary:</p>
                            <p className="text-muted-foreground">{clinicalTrialsData.summary}</p>
                        </div>
                        
                        {chartData && chartData.length > 0 && (
                            <div>
                                <p className="font-semibold pt-4 pb-2">Trials by Phase</p>
                                <ChartContainer config={{}} className="h-[200px] w-full">
                                    <BarChart accessibilityLayer data={chartData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="phase"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.replace("Phase ", "")}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        )}

                        <div>
                            <p className="font-semibold pt-4">Key Trials:</p>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                {clinicalTrialsData.keyTrials.map((t) => (
                                <li key={t.id}>
                                    <a href={t.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
                                    {t.id}: {t.title}
                                    </a>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </DataCard>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <ClinicalTrialsPage />
        </Suspense>
    )
}
