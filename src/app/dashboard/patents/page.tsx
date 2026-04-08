'use client';
import { DataCard } from '@/components/dashboard/data-card';
import { FileText } from 'lucide-react';
import { Suspense, useContext } from 'react';
import { DashboardContext } from '../layout';
import { Pie, PieChart, Cell } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
  } from "@/components/ui/chart"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

function PatentsPage() {
    const context = useContext(DashboardContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { state, isLoading } = context;
    const patentData = state.patentData;

    const chartData = patentData?.topAssignees.map(a => ({
        name: a.name,
        value: a.count,
    }));

    const chartConfig = chartData ? Object.fromEntries(
        chartData.map((item, index) => [
          item.name,
          {
            label: item.name,
            color: COLORS[index % COLORS.length],
          },
        ])
      ) : {};

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Patent Analysis</h1>
            <DataCard title="Patent Landscape" icon={FileText} isLoading={isLoading}>
                {patentData && (
                    <div className="space-y-4 text-base">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-semibold">Patents Found:</p>
                                <p className="text-2xl font-bold text-primary">{patentData.totalCount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Top Filer:</p>
                                <p className="text-2xl font-bold truncate">{patentData.topAssignees[0]?.name ?? 'N/A'}</p>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold pt-2">AI Summary:</p>
                            <p className="text-muted-foreground">{patentData.summary}</p>
                        </div>
                        
                        {chartData && chartData.length > 0 && (
                             <div>
                                <p className="font-semibold pt-4 pb-2">Top Patent Assignees</p>
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={50}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <ChartLegend content={<ChartLegendContent />} />
                                    </PieChart>
                                </ChartContainer>
                            </div>
                        )}

                        <div>
                            <p className="font-semibold pt-4">Key Patents:</p>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                {patentData.keyPatents.map((p) => (
                                     <li key={p.id}>
                                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
                                            {p.id}: {p.title}
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
            <PatentsPage />
        </Suspense>
    )
}
