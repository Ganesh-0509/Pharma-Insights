'use client';

import React, { useContext } from 'react';
import { AiInsightsCard } from '@/components/dashboard/ai-insights-card';
import { DiseaseRecsCard } from '@/components/dashboard/disease-recs-card';
import { DashboardContext } from './layout';

export default function DashboardPage() {
  const context = useContext(DashboardContext);

  if (!context) {
    // This can be a loading spinner or some fallback UI
    return <div>Loading...</div>;
  }
  
  const { state, isLoading, handleQuerySubmit } = context;

  return (
    <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-16 duration-500">
        <h1 className="text-2xl font-bold">AI Insights</h1>
        {state.isDiseaseQuery ? (
          <DiseaseRecsCard data={state.diseaseRecommendations} isLoading={isLoading} onMoleculeSelect={(molecule) => handleQuerySubmit(molecule, false)} />
        ) : (
          <AiInsightsCard data={state.aiInsights} isLoading={isLoading} />
        )}
    </div>
  );
}
