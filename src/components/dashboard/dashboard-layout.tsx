'use client';

import React, { useState, useTransition, useCallback, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { AppHeader } from '@/components/dashboard/header';
import { useToast } from '@/hooks/use-toast';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import type { GenerateMoleculeRepurposingSuggestionsOutput } from '@/ai/flows/generate-molecule-repurposing-suggestions';
import { generateMoleculeRepurposingSuggestions } from '@/ai/flows/generate-molecule-repurposing-suggestions';
import type { FetchClinicalTrialsDataOutput } from '@/ai/flows/fetch-clinical-trials-data';
import { fetchClinicalTrialsData } from '@/ai/flows/fetch-clinical-trials-data';
import type { FetchPatentsDataOutput } from '@/ai/flows/fetch-patents-data';
import { fetchPatentsData } from '@/ai/flows/fetch-patents-data';
import type { FetchWebIntelligenceDataOutput } from '@/ai/flows/fetch-web-intelligence-data';
import { fetchWebIntelligenceData } from '@/ai/flows/fetch-web-intelligence-data';
import type { GenerateDiseaseRecommendationsOutput } from '@/ai/flows/generate-disease-recommendations';
import { generateDiseaseRecommendations } from '@/ai/flows/generate-disease-recommendations';

import { QueryForm } from '@/components/dashboard/query-form';
import { OnboardingModal } from '@/components/dashboard/onboarding-modal';

export type AppState = {
  query: string;
  isInitialState: boolean;
  isDiseaseQuery: boolean;
  aiInsights: GenerateMoleculeRepurposingSuggestionsOutput | null;
  diseaseRecommendations: GenerateDiseaseRecommendationsOutput | null;
  internalKnowledgeSummary: string | null;
  clinicalTrialsData: FetchClinicalTrialsDataOutput | null;
  patentData: FetchPatentsDataOutput | null;
  webIntelligenceData: FetchWebIntelligenceDataOutput | null;
};

const initialState: AppState = {
  query: 'Aspirin',
  isInitialState: true,
  isDiseaseQuery: false,
  aiInsights: null,
  diseaseRecommendations: null,
  internalKnowledgeSummary: null,
  clinicalTrialsData: null,
  patentData: null,
  webIntelligenceData: null,
};

type Cache = {
    [key: string]: AppState;
}

export const DashboardContext = React.createContext<{
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  isLoading: boolean;
  handleQuerySubmit: (query: string, isDisease?: boolean) => void;
  handleSummaryUpdate: (summary: string) => void;
} | null>(null);


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || 'Aspirin';

  const [state, setState] = useState<AppState>({ ...initialState, query: initialQuery });
  const [cache, setCache] = useState<Cache>({});
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const firestore = useFirestore();

  const handleQuerySubmit = useCallback( (query: string, isDisease: boolean = false) => {
      const cacheKey = `${query}-${isDisease}`;
      if (cache[cacheKey]) {
        setState(cache[cacheKey]);
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set('q', query);
        router.push(`/dashboard?${newSearchParams.toString()}`);
        return;
      }

      setState(prev => ({ ...initialState, query, isInitialState: false, isDiseaseQuery: isDisease, }));

      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.set('q', query);
      router.push(`/dashboard?${newSearchParams.toString()}`);

      startTransition(async () => {
        try {
          if (user && firestore) {
            const historyCollection = isDisease ? 'diseaseQueries' : 'moleculeQueries';
            await addDoc(collection(firestore, 'users', user.uid, historyCollection), {
                queryText: query,
                timestamp: serverTimestamp(),
            });
          }

          let newState: AppState;

          if (isDisease) {
            const diseasePromise = generateDiseaseRecommendations({ diseaseName: query });
            const [diseaseData] = await Promise.all([diseasePromise]);
            newState = {
              ...initialState,
              query,
              isInitialState: false,
              isDiseaseQuery: true,
              diseaseRecommendations: diseaseData,
            };
          } else {
            const insightsPromise = generateMoleculeRepurposingSuggestions({ moleculeName: query, internalKnowledge: state.internalKnowledgeSummary ?? undefined });
            const clinicalPromise = fetchClinicalTrialsData({ query });
            const patentsPromise = fetchPatentsData({ query });
            const webPromise = fetchWebIntelligenceData({ query });
            
            const [insights, clinical, patents, web] = await Promise.all([
              insightsPromise,
              clinicalPromise,
              patentsPromise,
              webPromise
            ]);

            newState = {
              ...initialState,
              query,
              isInitialState: false,
              isDiseaseQuery: false,
              aiInsights: insights,
              clinicalTrialsData: clinical,
              patentData: patents,
              webIntelligenceData: web,
              diseaseRecommendations: null,
            };
          }

          setCache(prevCache => ({...prevCache, [cacheKey]: newState}));
          setState(newState);

        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error Fetching Data',
            description: 'An external service is temporarily unavailable. Please try again later.',
          });
          setState(prevState => ({ ...prevState, isInitialState: true }));
        }
      });
    }, [state.internalKnowledgeSummary, pathname, router, toast, user, firestore, cache]
  );
  
  // Effect to run query on initial load or when query param changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== state.query && !isPending) {
        // This simple check is a placeholder. A real app would have more robust logic
        // to determine if a query is a disease or a molecule.
        const isDisease = q.toLowerCase().includes('disease') || q.toLowerCase().includes('syndrome') || q.toLowerCase().includes('diabetes');
        handleQuerySubmit(q, isDisease);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSummaryUpdate = useCallback((summary: string) => {
    setState(prevState => ({ ...prevState, internalKnowledgeSummary: summary }));
    toast({
        title: 'Knowledge Updated',
        description: 'Internal document summary has been integrated.',
      });
  }, [toast]);

  const isLoading = isPending;

  const contextValue = {
    state,
    setState,
    isLoading,
    handleQuerySubmit,
    handleSummaryUpdate,
  };
  
  return (
    <DashboardContext.Provider value={contextValue}>
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
              {children}
          </main>
        </SidebarInset>
        <OnboardingModal />
      </SidebarProvider>
    </DashboardContext.Provider>
  );
}
