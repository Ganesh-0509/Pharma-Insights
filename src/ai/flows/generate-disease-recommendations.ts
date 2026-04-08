'use server';
/**
 * @fileOverview Generates recommendations for a given disease.
 *
 * - generateDiseaseRecommendations - A function that generates recommendations for a disease.
 * - GenerateDiseaseRecommendationsInput - The input type for the generateDiseaseRecommendations function.
 * - GenerateDiseaseRecommendationsOutput - The return type for the generateDiseaseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiseaseRecommendationsInputSchema = z.object({
  diseaseName: z.string().describe('The name of the disease to analyze.'),
});
export type GenerateDiseaseRecommendationsInput = z.infer<typeof GenerateDiseaseRecommendationsInputSchema>;

const RecommendedMoleculeSchema = z.object({
    name: z.string().describe('The name of the recommended molecule.'),
    relevance: z.string().describe('A brief explanation of why this molecule is relevant to the disease.'),
});

const GenerateDiseaseRecommendationsOutputSchema = z.object({
  summary: z.string().describe('A brief AI-generated summary of the disease.'),
  recommendedMolecules: z.array(RecommendedMoleculeSchema).describe('A list of up to 5 molecules recommended for investigating this disease.'),
});
export type GenerateDiseaseRecommendationsOutput = z.infer<typeof GenerateDiseaseRecommendationsOutputSchema>;

export async function generateDiseaseRecommendations(
  input: GenerateDiseaseRecommendationsInput
): Promise<GenerateDiseaseRecommendationsOutput> {
  return generateDiseaseRecommendationsFlow(input);
}

const diseaseRecommendationPrompt = ai.definePrompt({
  name: 'diseaseRecommendationPrompt',
  input: {schema: GenerateDiseaseRecommendationsInputSchema},
  output: {schema: GenerateDiseaseRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in pharmacology and drug discovery.
  For the given disease, provide a brief summary of the condition.
  Then, recommend up to 5 relevant molecules that are either used in treatment, are under investigation, or are otherwise relevant for research.
  For each molecule, provide its name and a concise explanation of its relevance to the disease.

Disease Name: {{{diseaseName}}}
`,
});

const generateDiseaseRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateDiseaseRecommendationsFlow',
    inputSchema: GenerateDiseaseRecommendationsInputSchema,
    outputSchema: GenerateDiseaseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await diseaseRecommendationPrompt(input);
    return output!;
  }
);
