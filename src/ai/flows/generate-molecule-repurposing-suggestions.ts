'use server';
/**
 * @fileOverview Generates insights and repurposing suggestions for a given molecule using an AI tool.
 *
 * - generateMoleculeRepurposingSuggestions - A function that generates repurposing suggestions for a molecule.
 * - GenerateMoleculeRepurposingSuggestionsInput - The input type for the generateMoleculeRepurposingSuggestions function.
 * - GenerateMoleculeRepurposingSuggestionsOutput - The return type for the generateMoleculeRepurposingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoleculeRepurposingSuggestionsInputSchema = z.object({
  moleculeName: z.string().describe('The name of the molecule to analyze.'),
  internalKnowledge: z.string().optional().describe('Optional internal knowledge to use for insights, in markdown format.'),
});
export type GenerateMoleculeRepurposingSuggestionsInput = z.infer<typeof GenerateMoleculeRepurposingSuggestionsInputSchema>;

const GenerateMoleculeRepurposingSuggestionsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights and repurposing suggestions for the molecule.'),
  repurposingScore: z.number().int().min(0).max(100).describe('A score (0-100) indicating the potential for repurposing the molecule.'),
});
export type GenerateMoleculeRepurposingSuggestionsOutput = z.infer<typeof GenerateMoleculeRepurposingSuggestionsOutputSchema>;

export async function generateMoleculeRepurposingSuggestions(
  input: GenerateMoleculeRepurposingSuggestionsInput
): Promise<GenerateMoleculeRepurposingSuggestionsOutput> {
  return generateMoleculeRepurposingSuggestionsFlow(input);
}

const moleculeRepurposingPrompt = ai.definePrompt({
  name: 'moleculeRepurposingPrompt',
  input: {schema: GenerateMoleculeRepurposingSuggestionsInputSchema},
  output: {schema: GenerateMoleculeRepurposingSuggestionsOutputSchema},
  prompt: `You are an AI assistant specializing in drug discovery and repurposing.
  Given the name of a molecule and optionally some internal knowledge, you will generate insights and repurposing suggestions for the molecule.
  Also assign a repurposing score (0-100) indicating the potential for repurposing the molecule.

Molecule Name: {{{moleculeName}}}
{{~#if internalKnowledge}}
Internal Knowledge:\n{{internalKnowledge}}
{{~/if}}
`,
});

const generateMoleculeRepurposingSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateMoleculeRepurposingSuggestionsFlow',
    inputSchema: GenerateMoleculeRepurposingSuggestionsInputSchema,
    outputSchema: GenerateMoleculeRepurposingSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await moleculeRepurposingPrompt(input);
    return output!;
  }
);
