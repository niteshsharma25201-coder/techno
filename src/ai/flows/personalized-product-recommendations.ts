'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user history and preferences.
 *
 * - getPersonalizedRecommendations - A function that generates personalized product recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('The user viewing history, as a comma separated list of product ids.'),
  searchBehavior: z
    .string()
    .describe('The user search behavior, as a comma separated list of search queries.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  productRecommendations: z
    .string()
    .describe(
      'A comma separated list of product ids that are recommended for the user.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert product recommendation system for Technoii Optics, an e-commerce website selling sunglasses, eyewear, lenses and contact lenses.

  Based on the user's viewing history and search behavior, provide a list of product recommendations.
  The product recommendations should be a comma separated list of product ids.

  Viewing History: {{{viewingHistory}}}
  Search Behavior: {{{searchBehavior}}}
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

