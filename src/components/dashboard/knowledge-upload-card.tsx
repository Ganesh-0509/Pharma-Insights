'use client';
import { useState, useTransition, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { summarizeUploadedDocuments } from '@/ai/flows/summarize-uploaded-documents';
import { UploadCloud, Loader2, FileText } from 'lucide-react';

type KnowledgeUploadCardProps = {
  onSummaryUpdate: (summary: string) => void;
};

export function KnowledgeUploadCard({
  onSummaryUpdate,
}: KnowledgeUploadCardProps) {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        startTransition(async () => {
          try {
            const result = await summarizeUploadedDocuments({ fileDataUri: dataUri });
            setSummary(result.summary);
            onSummaryUpdate(result.summary);
            toast({
              title: 'Success',
              description: 'Document summarized and integrated.',
            });
          } catch (error) {
            console.error('Summarization failed:', error);
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Failed to summarize the document.',
            });
            setSummary(null);
            setFileName(null);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internal Knowledge Agent</CardTitle>
        <CardDescription>Upload PDF/DOC files for analysis.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          disabled={isPending}
        />
        <Button
          onClick={handleButtonClick}
          disabled={isPending}
          className="w-full"
          variant="outline"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          {isPending ? 'Summarizing...' : 'Upload Document'}
        </Button>
        
        {fileName && (
          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md flex items-center">
            <FileText className="h-4 w-4 mr-2 shrink-0" />
            <span className="truncate flex-1">{fileName}</span>
          </div>
        )}

        {summary && (
          <div className="space-y-2 pt-2">
            <h4 className="font-semibold">Summary:</h4>
            <p className="text-sm text-muted-foreground max-h-40 overflow-y-auto rounded-md border p-3 bg-background">
              {summary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
