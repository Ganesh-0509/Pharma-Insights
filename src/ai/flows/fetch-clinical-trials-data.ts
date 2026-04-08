'use server';
/**
 * @fileOverview Fetches and analyzes clinical trials data for a given query.
 *
 * - fetchClinicalTrialsData - A function that fetches clinical trials data.
 * - FetchClinicalTrialsDataInput - The input type for the fetchClinicalTrialsData function.
 * - FetchClinicalTrialsDataOutput - The return type for the fetchClinicalTrialsData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FetchClinicalTrialsDataInputSchema = z.object({
  query: z.string().describe('The molecule or disease to search for.'),
});
export type FetchClinicalTrialsDataInput = z.infer<typeof FetchClinicalTrialsDataInputSchema>;

const TrialPhaseSchema = z.object({
  phase: z.string().describe('The phase of the trial (e.g., 1, 2, 3, 4).'),
  count: z.number().int().describe('The number of trials in this phase.'),
});

const KeyTrialSchema = z.object({
    id: z.string().describe('The unique identifier of the trial (e.g., NCT number).'),
    title: z.string().describe('The title of the clinical trial.'),
    url: z.string().url().describe('The URL to the clinical trial details.'),
});

const FetchClinicalTrialsDataOutputSchema = z.object({
  totalCount: z.number().int().describe('The total number of clinical trials found.'),
  summary: z.string().describe('An AI-generated summary of the clinical trial landscape for the query.'),
  mostActiveCountry: z.string().describe('The country with the most clinical trials for this query.'),
  trialsByPhase: z.array(TrialPhaseSchema).describe('A breakdown of the number of trials by their phase.'),
  keyTrials: z.array(KeyTrialSchema).describe('A list of up to 5 most significant or relevant clinical trials.'),
});
export type FetchClinicalTrialsDataOutput = z.infer<typeof FetchClinicalTrialsDataOutputSchema>;


export async function fetchClinicalTrialsData(
  input: FetchClinicalTrialsDataInput
): Promise<FetchClinicalTrialsDataOutput> {
    return fetchClinicalTrialsDataFlow(input);
}

const clinicalTrialsPrompt = ai.definePrompt({
  name: 'clinicalTrialsPrompt',
  input: {schema: FetchClinicalTrialsDataInputSchema},
  output: {schema: FetchClinicalTrialsDataOutputSchema},
  prompt: `You are a specialized agent for querying and analyzing data from ClinicalTrials.gov.
For the given query, search for relevant clinical trials.
Provide a comprehensive analysis including the total count, a summary of the landscape, the most active country, a breakdown by phase, and a list of up to 5 key trials.

Query: {{{query}}}
`,
});

const fetchClinicalTrialsDataFlow = ai.defineFlow(
  {
    name: 'fetchClinicalTrialsDataFlow',
    inputSchema: FetchClinicalTrialsDataInputSchema,
    outputSchema: FetchClinicalTrialsDataOutputSchema,
  },
  async input => {
    const {output} = await clinicalTrialsPrompt(input);
    return output!;
  }
);
