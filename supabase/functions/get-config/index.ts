import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

console.log("Hello from get-config!")

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { keys } = await req.json()

    if (!Array.isArray(keys)) {
      throw new Error('Keys must be an array')
    }

    const config: Record<string, string> = {}
    
    // Only return requested keys that exist in environment
    keys.forEach(key => {
      const value = Deno.env.get(key)
      if (value) {
        config[key] = value
      }
    })

    return new Response(
      JSON.stringify(config),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    )
  }
})