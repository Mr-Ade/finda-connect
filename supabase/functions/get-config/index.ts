import { serve } from 'https://deno.fresh.dev/std@v9.6.1/http/server.ts';

interface RequestBody {
  keys: string[];
}

serve(async (req) => {
  try {
    const { keys } = (await req.json()) as RequestBody;
    
    const config: Record<string, string> = {};
    
    for (const key of keys) {
      config[key] = Deno.env.get(key) || '';
    }
    
    return new Response(
      JSON.stringify(config),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});