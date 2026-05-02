import { mistral } from "@ai-sdk/mistral";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, pantryData } = await req.json();

  const result = streamText({
    model: mistral("mistral-large-latest"),
    messages,
    system: `You are a helpful assistant for Pantry Finder. 
    You help users find food pantries, understand their hours, and filter for specific needs.
    You have tools to update the search address, radius, and filters.
    When a user asks to find pantries or change location, use the 'updateSearch' tool.
    When a user asks to filter results (like open now, specific day, or food types), use the 'updateFilters' tool.
    When asked about the current results, use 'getPantriesInfo' if you don't have the data in context.
    The current date/time is ${new Date().toLocaleString()}.`,
    maxSteps: 5,
    tools: {
      updateSearch: tool({
        description: "Update the search location and radius",
        parameters: z.object({
          address: z.string().describe("The location to search in"),
          radius: z.string().describe("The radius in miles as a string"),
        }),
        execute: async ({ address, radius }) => {
          return { success: true, address, radius };
        },
      }),
      updateFilters: tool({
        description: "Update the pantry filters",
        parameters: z.object({
          openNow: z.boolean().optional(),
          openDay: z
            .enum([
              "Any day",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ])
            .optional(),
          foodTypes: z.array(z.string()).optional(),
        }),
        execute: async (filters) => {
          return { success: true, ...filters };
        },
      }),
      getPantriesInfo: tool({
        description: "Get information about the pantries currently found",
        parameters: z.object({}),
        execute: async () => {
          return { pantries: pantryData || [] };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
