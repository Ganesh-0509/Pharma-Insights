'use server';
/**
 * @fileOverview Fetches and analyzes patent data for a given query.
 *
 * - fetchPatentsData - A function that fetches patent data.
 * - FetchPatentsDataInput - The input type for the fetchPatentsData function.
 * - FetchPatentsDataOutput - The return type for the fetchPatentsData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FetchPatentsDataInputSchema = z.object({
  query: z.string().describe('The molecule or technology to search for patents.'),
});
export type FetchPatentsDataInput = z.infer<typeof FetchPatentsDataInputSchema>;

const TopAssigneeSchema = z.object({
  name: z.string().describe('The name of the patent assignee (company or institution).'),
  count: z.number().int().describe('The number of patents held by this assignee.'),
});

const KeyPatentSchema = z.object({
    id: z.string().describe('The patent number or identifier.'),
    title: z.string().describe('The title of the patent.'),
    url: z.string().url().describe('A URL to view the patent details.'),
});

const FetchPatentsDataOutputSchema = z.object({
  totalCount: z.number().int().describe('The total number of patents found.'),
  summary: z.string().describe('An AI-generated summary of the patent landscape.'),
  topAssignees: z.array(TopAssigneeSchema).describe('A list of the top 5 patent assignees by patent count.'),
  keyPatents: z.array(KeyPatentSchema).describe('A list of up to 5 of the most relevant or foundational patents.'),
});
export type FetchPatentsDataOutput = z.infer<typeof FetchPatentsDataOutputSchema>;

export async function fetchPatentsData(
  input: FetchPatentsDataInput
): Promise<FetchPatentsDataOutput> {
  return fetchPatentsDataFlow(input);
}

const patentsPrompt = ai.definePrompt({
  name: 'patentsPrompt',
  input: {schema: FetchPatentsDataInputSchema},
  output: {schema: FetchPatentsDataOutputSchema},
  prompt: `You are an AI agent expert in searching and analyzing patent databases (like USPTO, Google Patents).
For the given query, find relevant patents.
Provide an analysis including total patent count, a summary, the top 5 assignees, and up to 5 key patents.

Query: {{{query}}}
`,
});

const fetchPatentsDataFlow = ai.defineFlow(
  {
    name: 'fetchPatentsDataFlow',
    inputSchema: FetchPatentsDataInputSchema,
    outputSchema: FetchPatentsDataOutputSchema,
  },
  async input => {
    const {output} = await patentsPrompt(input);
    return output!;
  }
);
