'use client';
import { ReportGenerator } from '@/components/dashboard/report-generator';
import { Suspense, useContext } from 'react';
import { DashboardContext } from '../layout';

function ReportsPage() {
    const context = useContext(DashboardContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { state } = context;

    // In a real app, this data would come from a shared state or context
    const allData = {
        query: state.query,
        aiInsights: state.aiInsights?.insights,
        internalKnowledgeSummary: state.internalKnowledgeSummary ?? undefined,
        clinicalTrialsData: JSON.stringify(state.clinicalTrialsData, null, 2),
        patentData: JSON.stringify(state.patentData, null, 2),
        webIntelligenceData: JSON.stringify(state.webIntelligenceData, null, 2),
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6">Report Generator</h1>
            <ReportGenerator allData={allData} />
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <ReportsPage />
        </Suspense>
    )
}
