'use server';

/**
 * @fileOverview Generates a report compiling data from various agents, including AI insights.
 *
 * - generateReportFromData - A function that handles the report generation process.
 * - GenerateReportFromDataInput - The input type for the generateReportFromData function.
 * - GenerateReportFromDataOutput - The return type for the generateReportFromData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportFromDataInputSchema = z.object({
  query: z.string().describe('The query used to gather the data for the report.'),
  clinicalTrialsData: z.string().describe('Clinical trial data related to the query, in JSON format.'),
  patentData: z.string().describe('Patent information related to the query, in JSON format.'),
  webIntelligenceData: z.string().describe('Web intelligence data (literature, guidelines) related to the query, in JSON format.'),
  internalKnowledgeSummary: z.string().optional().describe('Summary of internal knowledge documents related to the query.'),
  aiInsights: z.string().optional().describe('AI-driven insights and repurposing suggestions for the query.'),
});
export type GenerateReportFromDataInput = z.infer<typeof GenerateReportFromDataInputSchema>;

const GenerateReportFromDataOutputSchema = z.object({
  reportContent: z.string().describe('The content of the generated report in a well-structured markdown format.'),
});
export type GenerateReportFromDataOutput = z.infer<typeof GenerateReportFromDataOutputSchema>;

export async function generateReportFromData(input: GenerateReportFromDataInput): Promise<GenerateReportFromDataOutput> {
  return generateReportFromDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportFromDataPrompt',
  input: {
    schema: GenerateReportFromDataInputSchema,
  },
  output: {
    schema: GenerateReportFromDataOutputSchema,
  },
  prompt: `You are an expert report author for the pharmaceutical industry. Your task is to synthesize the provided data into a comprehensive and well-structured report in Markdown format. The report should be clear, concise, and easy for a researcher or executive to understand.

  **Report Structure:**
  1.  **Executive Summary:** A brief, high-level overview of the key findings for the query.
  2.  **AI-Driven Insights:** If AI insights are available, present them here.
  3.  **Clinical Trials Landscape:** Summarize the clinical trials data. Highlight the total number of trials, key phases, and the most active country. List the most significant trials with their titles and links.
  4.  **Patent Analysis:** Summarize the patent data. Note the total number of patents and the top assignees. List key patents with their titles and links.
  5.  **Literature & Web Intelligence:** Summarize the key findings from scientific literature. Mention the total number of publications and top journals. List the most relevant publications with their titles and links.
  6.  **Internal Knowledge Integration:** If a summary of internal documents is provided, include it here.
  7.  **Conclusion:** A concluding paragraph that synthesizes the information and suggests potential next steps.

  **Input Data:**
  - Query: {{{query}}}
  - Clinical Trials Data (JSON): {{{clinicalTrialsData}}}
  - Patent Data (JSON): {{{patentData}}}
  - Web Intelligence Data (JSON): {{{webIntelligenceData}}}
  {{#if internalKnowledgeSummary}}- Internal Knowledge Summary: {{{internalKnowledgeSummary}}}{{/if}}
  {{#if aiInsights}}- AI Insights: {{{aiInsights}}}{{/if}}

  Now, generate the report content as a single markdown string.
  `,
});

const generateReportFromDataFlow = ai.defineFlow(
  {
    name: 'generateReportFromDataFlow',
    inputSchema: GenerateReportFromDataInputSchema,
    outputSchema: GenerateReportFromDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
