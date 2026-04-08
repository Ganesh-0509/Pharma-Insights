'use server';
/**
 * @fileOverview Fetches and analyzes web intelligence and scientific literature for a given query.
 *
 * - fetchWebIntelligenceData - A function that fetches web intelligence data.
 * - FetchWebIntelligenceDataInput - The input type for the fetchWebIntelligenceData function.
 * - FetchWebIntelligenceDataOutput - The return type for the fetchWebIntelligenceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FetchWebIntelligenceDataInputSchema = z.object({
  query: z.string().describe('The topic, molecule, or disease to search for in literature.'),
});
export type FetchWebIntelligenceDataInput = z.infer<typeof FetchWebIntelligenceDataInputSchema>;

const TopJournalSchema = z.object({
    name: z.string().describe('The name of the journal.'),
    count: z.number().int().describe('The number of relevant publications in this journal.'),
});

const KeyPublicationSchema = z.object({
    id: z.string().describe('A unique identifier for the publication (e.g., DOI or PubMed ID).'),
    title: z.string().describe('The title of the publication.'),
    journal: z.string().describe('The journal in which it was published.'),
    url: z.string().url().describe('A URL to the publication.'),
});

const PublicationYearDistribution = z.object({
    year: z.number().int().describe('The publication year.'),
    count: z.number().int().describe('The number of publications in that year.'),
});

const FetchWebIntelligenceDataOutputSchema = z.object({
  totalPublications: z.number().int().describe('The total number of relevant publications found.'),
  summary: z.string().describe('An AI-generated summary of the findings from the literature.'),
  topJournals: z.array(TopJournalSchema).describe('A list of the top 5 journals publishing on this topic.'),
  keyPublications: z.array(KeyPublicationSchema).describe('A list of up to 5 of the most cited or significant publications.'),
  publicationYearDistribution: z.array(PublicationYearDistribution).describe('A distribution of publications over the last 10 years.'),
});
export type FetchWebIntelligenceDataOutput = z.infer<typeof FetchWebIntelligenceDataOutputSchema>;


export async function fetchWebIntelligenceData(
  input: FetchWebIntelligenceDataInput
): Promise<FetchWebIntelligenceDataOutput> {
  return fetchWebIntelligenceDataFlow(input);
}

const webIntelligencePrompt = ai.definePrompt({
  name: 'webIntelligencePrompt',
  input: {schema: FetchWebIntelligenceDataInputSchema},
  output: {schema: FetchWebIntelligenceDataOutputSchema},
  prompt: `You are an AI agent that specializes in searching and analyzing scientific literature from sources like PubMed, Google Scholar, and other web sources.
For the given query, find relevant scientific articles and publications.
Provide an analysis including the total number of publications, a summary of the key findings, the top 5 journals, a list of up to 5 key publications, and a distribution of publications over the past 10 years.

Query: {{{query}}}
`,
});

const fetchWebIntelligenceDataFlow = ai.defineFlow(
  {
    name: 'fetchWebIntelligenceDataFlow',
    inputSchema: FetchWebIntelligenceDataInputSchema,
    outputSchema: FetchWebIntelligenceDataOutputSchema,
  },
  async input => {
    const {output} = await webIntelligencePrompt(input);
    return output!;
  }
);
