import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
        status: 500 
      }
    );
  }
});