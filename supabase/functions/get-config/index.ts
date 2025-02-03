import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse the request body
    const { keys } = await req.json()
    console.log('Requested config keys:', keys)

    if (!Array.isArray(keys)) {
      throw new Error('Keys must be an array')
    }

    // Only return specifically requested keys
    const config: Record<string, string> = {}
    for (const key of keys) {
      const value = Deno.env.get(key)
      if (!value) {
        console.error(`Config key not found: ${key}`)
        throw new Error(`Config key "${key}" not found or not configured`)
      }
      config[key] = value
    }

    console.log('Successfully retrieved config values for:', Object.keys(config))

    return new Response(
      JSON.stringify({ 
        data: config,
        success: true 
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error in get-config function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      }
    )
  }
})