'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Loader2 } from 'lucide-react';

type QueryFormProps = {
  onSubmit: (query: string, isDisease: boolean) => void;
  isLoading: boolean;
  defaultValue: string;
};

export function QueryForm({ onSubmit, isLoading, defaultValue }: QueryFormProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isDisease, setIsDisease] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim(), isDisease);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Query molecules or diseases (e.g., Aspirin, Diabetes...)"
          className="w-full pl-10 pr-28 h-12 text-base rounded-full shadow-lg focus-visible:ring-2 focus-visible:ring-primary/50"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 rounded-full px-6"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Explore</span>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Checkbox id="disease-query" checked={isDisease} onCheckedChange={(checked) => setIsDisease(checked as boolean)} disabled={isLoading} />
        <Label htmlFor="disease-query" className="text-sm text-muted-foreground">
          This is a disease query
        </Label>
      </div>
    </form>
  );
}
