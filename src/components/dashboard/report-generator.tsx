'use client';
import { useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateReportFromData } from '@/ai/flows/generate-report-from-data';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, FilePieChart } from 'lucide-react';
import { Textarea } from '../ui/textarea';

type ReportGeneratorProps = {
  allData: {
    query: string;
    clinicalTrialsData: string;
    patentData: string;
    webIntelligenceData: string;
    internalKnowledgeSummary?: string;
    aiInsights?: string;
  };
};

export function ReportGenerator({ allData }: ReportGeneratorProps) {
  const [isPending, startTransition] = useTransition();
  const [reportContent, setReportContent] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    startTransition(async () => {
      setReportContent(null);
      try {
        const result = await generateReportFromData(allData);

        setReportContent(result.reportContent);

        toast({
          title: 'Report Generated',
          description: `Your report has been generated below.`,
        });
      } catch (error) {
        console.error('Report generation failed:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to generate the report.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FilePieChart className="h-5 w-5"/> Report Generator</CardTitle>
        <CardDescription>Compile all insights into a single file.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleGenerateReport} disabled={isPending} className="flex-1">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Generate Report
          </Button>
        </div>
        {reportContent && (
            <Textarea
                readOnly
                value={reportContent}
                className="h-64 text-xs bg-muted"
                />
        )}
      </CardContent>
    </Card>
  );
}
