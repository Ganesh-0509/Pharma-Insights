'use client';

import React, { useState, useTransition, Suspense } from 'react';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { AppHeader } from '@/components/dashboard/header';
import { QueryForm } from '@/components/dashboard/query-form';
import { AiInsightsCard } from '@/components/dashboard/ai-insights-card';
import { DataCard } from '@/components/dashboard/data-card';
import { KnowledgeUploadCard } from '@/components/dashboard/knowledge-upload-card';
import { ReportGenerator } from '@/components/dashboard/report-generator';
import { OnboardingModal } from '@/components/dashboard/onboarding-modal';
import type { GenerateMoleculeRepurposingSuggestionsOutput } from '@/ai/flows/generate-molecule-repurposing-suggestions';
import { generateMoleculeRepurposingSuggestions } from '@/ai/flows/generate-molecule-repurposing-suggestions';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, FileText, TestTube } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type AppState = {
  query: string;
  isInitialState: boolean;
  aiInsights: GenerateMoleculeRepurposingSuggestionsOutput | null;
  internalKnowledgeSummary: string | null;
  clinicalTrialsData: any | null;
  patentData: any | null;
  webIntelligenceData: any | null;
};

const initialState: AppState = {
  query: 'Aspirin',
  isInitialState: true,
  aiInsights: null,
  internalKnowledgeSummary: null,
  clinicalTrialsData: null,
  patentData: null,
  webIntelligenceData: null,
};

const mockData = {
    clinicalTrials: {
        count: 1204,
        summary: 'Numerous studies on efficacy for pain relief and cardiovascular disease prevention.',
        keyTrials: ['NCT00000459 (Physicians\' Health Study)', 'NCT00157753 (ASPREE)'],
    },
    patents: {
        count: 58,
        summary: 'Core patents expired. Recent patents focus on new formulations and delivery methods.',
        keyPatents: ['US2887429A (Original formulation)', 'US9132107B2 (Liquid formulation)'],
    },
    webIntelligence: {
        publications: 25000,
        summary: 'Extensive literature on mechanism of action, side effects, and new therapeutic areas.',
        keyPublications: ['Vane, J. R. (1971). Nature New Biology, 231(25), 232-235.', 'Patrono, C. (2015). New England Journal of Medicine, 373(13), 1251-1260.'],
    }
}

function DashboardInternal() {
  const [state, setState] = useState<AppState>(initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const handleQuerySubmit = (query: string) => {
    setState({ ...initialState, query, isInitialState: false });
    
    // Update URL without reloading page
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('q', query);
    router.push(`${pathname}?${newSearchParams.toString()}`);
    
    startTransition(async () => {
      try {
        const insightsPromise = generateMoleculeRepurposingSuggestions({ moleculeName: query, internalKnowledge: state.internalKnowledgeSummary ?? undefined });
        
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 800));

        const insights = await insightsPromise;

        setState(prevState => ({
          ...prevState,
          query,
          isInitialState: false,
          aiInsights: insights,
          clinicalTrialsData: mockData.clinicalTrials,
          patentData: mockData.patents,
          webIntelligenceData: mockData.webIntelligence,
        }));

      } catch (error) {
        console.error('Error fetching insights:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch AI insights. Please try again.',
        });
        setState(prevState => ({ ...prevState, isInitialState: true, aiInsights: null }));
      }
    });
  };

  const handleSummaryUpdate = (summary: string) => {
    setState(prevState => ({ ...prevState, internalKnowledgeSummary: summary }));
    toast({
        title: 'Knowledge Updated',
        description: 'Internal document summary has been integrated.',
      });
  };

  const allData = {
    query: state.query,
    aiInsights: state.aiInsights?.insights ?? 'Not available.',
    internalKnowledgeSummary: state.internalKnowledgeSummary ?? 'Not available.',
    clinicalTrialsData: JSON.stringify(state.clinicalTrialsData, null, 2),
    patentData: JSON.stringify(state.patentData, null, 2),
    webIntelligenceData: JSON.stringify(state.webIntelligenceData, null, 2),
  }

  const isLoading = isPending || (!state.isInitialState && !state.aiInsights);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
          <QueryForm
            defaultValue={state.query}
            onSubmit={handleQuerySubmit}
            isLoading={isLoading}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in-50 slide-in-from-bottom-16 duration-500">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              <AiInsightsCard data={state.aiInsights} isLoading={isLoading} />
              <div className="grid md:grid-cols-2 gap-6">
                 <DataCard title="Clinical Trials" icon={TestTube} isLoading={isLoading}>
                    {state.clinicalTrialsData && (
                        <div className="space-y-2 text-sm">
                            <p><strong>Trials Found:</strong> {state.clinicalTrialsData.count.toLocaleString()}</p>
                            <p><strong>Summary:</strong> {state.clinicalTrialsData.summary}</p>
                            <p className="font-semibold pt-2">Key Trials:</p>
                            <ul className="list-disc pl-5 text-muted-foreground">
                                {state.clinicalTrialsData.keyTrials.map((t: string) => <li key={t}>{t}</li>)}
                            </ul>
                        </div>
                    )}
                </DataCard>
                <DataCard title="Patents" icon={FileText} isLoading={isLoading}>
                    {state.patentData && (
                         <div className="space-y-2 text-sm">
                            <p><strong>Patents Found:</strong> {state.patentData.count.toLocaleString()}</p>                            <p><strong>Summary:</strong> {state.patentData.summary}</p>
                            <p className="font-semibold pt-2">Key Patents:</p>
                            <ul className="list-disc pl-5 text-muted-foreground">
                                {state.patentData.keyPatents.map((p: string) => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    )}
                </DataCard>
              </div>
            </div>

            {/* Side Column */}
            <div className="lg:col-span-1 space-y-6">
                <KnowledgeUploadCard onSummaryUpdate={handleSummaryUpdate} />
                <DataCard title="Web Intelligence" icon={BookOpen} isLoading={isLoading}>
                   {state.webIntelligenceData && (
                         <div className="space-y-2 text-sm">
                            <p><strong>Publications:</strong> {state.webIntelligenceData.publications.toLocaleString()}+</p>
                            <p><strong>Summary:</strong> {state.webIntelligenceData.summary}</p>
                             <p className="font-semibold pt-2">Key Publications:</p>
                             <ul className="list-disc pl-5 text-muted-foreground">
                                {state.webIntelligenceData.keyPublications.map((p: string) => <li key={p}>{p}</li>)}
                            </ul>
                        </div>
                    )}
                </DataCard>
                <ReportGenerator allData={allData} />
            </div>
          </div>
        </main>
      </SidebarInset>
      <OnboardingModal />
    </SidebarProvider>
  );
}

export function Dashboard() {
  return (
    <Suspense>
      <DashboardInternal />
    </Suspense>
  )
}
