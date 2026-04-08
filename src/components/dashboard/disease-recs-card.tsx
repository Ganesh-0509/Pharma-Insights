'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Syringe } from 'lucide-react';
import type { GenerateDiseaseRecommendationsOutput } from '@/ai/flows/generate-disease-recommendations';

type DiseaseRecsCardProps = {
  data: GenerateDiseaseRecommendationsOutput | null;
  isLoading: boolean;
  onMoleculeSelect: (moleculeName: string) => void;
};

export function DiseaseRecsCard({ data, isLoading, onMoleculeSelect }: DiseaseRecsCardProps) {

  return (
    <Card className="shadow-lg border-2 border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-accent" />
            <CardTitle className="text-xl">Disease Analysis & Molecule Suggestions</CardTitle>
        </div>
        <CardDescription className="text-base">AI-generated recommendations for your disease query.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-4 space-y-3">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-8 w-1/2" />
            </div>
          </div>
        ) : data ? (
          <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-2">Disease Summary</h3>
                <p className="text-base text-muted-foreground whitespace-pre-wrap">
                    {data.summary}
                </p>
            </div>
             <div>
                <h3 className="font-semibold text-lg mb-2">Recommended Molecules</h3>
                <div className="space-y-3">
                    {data.recommendedMolecules.map(molecule => (
                        <div key={molecule.name} className="p-3 border rounded-lg bg-background/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold">{molecule.name}</h4>
                                    <p className="text-sm text-muted-foreground">{molecule.relevance}</p>
                                </div>
                                <Button size="sm" variant="ghost" onClick={() => onMoleculeSelect(molecule.name)} className="shrink-0">
                                    <Syringe className="mr-2 h-4 w-4" />
                                    Analyze
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>Submit a disease query to generate recommendations.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
