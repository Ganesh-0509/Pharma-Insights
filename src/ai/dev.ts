'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-molecule-repurposing-suggestions.ts';
import '@/ai/flows/generate-report-from-data.ts';
import '@/ai/flows/summarize-uploaded-documents.ts';
import '@/ai/flows/fetch-clinical-trials-data.ts';
import '@/ai/flows/fetch-patents-data.ts';
import '@/ai/flows/fetch-web-intelligence-data.ts';
import '@/ai/flows/generate-disease-recommendations.ts';
