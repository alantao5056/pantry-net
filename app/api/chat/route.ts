import { Mistral } from '@mistralai/mistralai';

export async function POST(req: Request) {
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "MISTRAL_API_KEY is not set in environment variables" }, { status: 500 });
  }

  const client = new Mistral({ apiKey });
  const { messages, pantryData } = await req.json();

  const systemMessage = {
    role: 'system',
    content: `You are a helpful assistant for Pantry Finder. 
    You help users find food pantries, understand their hours, and filter for specific needs.
    You have tools to update the search address, radius, and filters.
    When a user asks to find pantries or change location, use the 'updateSearch' tool.
    When a user asks to filter results (like open now, specific day, or food types), use the 'updateFilters' tool.
    The current date/time is ${new Date().toLocaleString()}.
    Current pantries in context: ${JSON.stringify(pantryData || [])}`
  };

  const tools = [
    {
      type: 'function' as const,
      function: {
        name: 'updateSearch',
        description: 'Update the search location and radius',
        parameters: {
          type: 'object',
          required: ['address', 'radius'],
          properties: {
            address: { type: 'string', description: 'The location to search in' },
            radius: { type: 'string', description: 'The radius in miles as a string' },
          },
        },
      },
    },
    {
      type: 'function' as const,
      function: {
        name: 'updateFilters',
        description: 'Update the pantry filters',
        parameters: {
          type: 'object',
          properties: {
            openNow: { type: 'boolean' },
            openDay: {
              type: 'string',
              enum: [
                'Any day',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
            },
            foodTypes: {
              type: 'array',
              items: { type: 'string' }
            },
          },
        },
      },
    },
  ];

  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [systemMessage, ...messages],
      tools: tools,
    });

    return Response.json(chatResponse.choices[0].message);
  } catch (error) {
    console.error("Mistral API Error:", error);
    return Response.json({ error: "Failed to communicate with AI" }, { status: 500 });
  }
}

