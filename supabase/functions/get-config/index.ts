import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface RequestBody {
  keys: string[];
}

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { keys } = await req.json() as RequestBody;
    const config: Record<string, string> = {};

    // Get requested keys from environment variables
    for (const key of keys) {
      const value = Deno.env.get(key);
      if (value) {
        config[key] = value;
      }
    }

    return new Response(
      JSON.stringify(config),
      { 
        headers: corsHeaders,
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: corsHeaders,
        status: 500 
      }
    );
  }
});