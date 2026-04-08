// Summarizes uploaded documents using a transformer model.

'use server';

/**
 * @fileOverview Summarizes uploaded documents using a transformer model and integrates the information into the knowledge base.
 *
 * - summarizeUploadedDocuments - A function that handles the summarization of uploaded documents.
 * - SummarizeUploadedDocumentsInput - The input type for the summarizeUploadedDocuments function.
 * - SummarizeUploadedDocumentsOutput - The return type for the summarizeUploadedDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedDocumentsInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeUploadedDocumentsInput = z.infer<
  typeof SummarizeUploadedDocumentsInputSchema
>;

const SummarizeUploadedDocumentsOutputSchema = z.object({
  summary: z.string().describe('The summary of the uploaded document.'),
});
export type SummarizeUploadedDocumentsOutput = z.infer<
  typeof SummarizeUploadedDocumentsOutputSchema
>;

export async function summarizeUploadedDocuments(
  input: SummarizeUploadedDocumentsInput
): Promise<SummarizeUploadedDocumentsOutput> {
  return summarizeUploadedDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentsPrompt',
  input: {schema: SummarizeUploadedDocumentsInputSchema},
  output: {schema: SummarizeUploadedDocumentsOutputSchema},
  prompt: `You are an expert document summarizer.

You will use this information to summarize the document, and extract the key information from it.

Document: {{fileDataUri}}`,
});

const summarizeUploadedDocumentsFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentsFlow',
    inputSchema: SummarizeUploadedDocumentsInputSchema,
    outputSchema: SummarizeUploadedDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
