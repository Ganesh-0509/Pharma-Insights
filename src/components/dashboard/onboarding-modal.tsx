'use client';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

const ONBOARDING_KEY = 'pharma-explorer-onboarded';

export function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasBeenOnboarded = localStorage.getItem(ONBOARDING_KEY);
    if (!hasBeenOnboarded) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
                <Lightbulb className="h-12 w-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold">Welcome to Pharma Insights Explorer!</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Your AI-powered copilot for drug discovery and repurposing.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground space-y-2">
          <p>
            <strong>1. Query:</strong> Start by entering a molecule name (e.g., "Aspirin") or a disease (e.g., "Diabetes") in the search bar.
          </p>
          <p>
            <strong>2. Explore:</strong> Get instant, AI-driven insights, plus real-time data from clinical trials, patents, and scientific publications.
          </p>
          <p>
            <strong>3. Report:</strong> Compile all findings into a comprehensive markdown report from the "Reports" page.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            Let's Get Started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
