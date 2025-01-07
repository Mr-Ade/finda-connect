import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { latitude, longitude } = await req.json()

    console.log('Geocoding coordinates:', { latitude, longitude })

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=155e6c1220b94de0a87f628b659b430b`
    )
    
    const data = await response.json()
    
    console.log('OpenCage API response:', data)

    if (data.status.code !== 200) {
      throw new Error(`OpenCage API error: ${data.status.message}`)
    }

    if (!data.results || data.results.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'No results found',
          status: 'ZERO_RESULTS'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404
        }
      )
    }

    // Transform response to match Google Maps API format
    const transformedData = {
      results: [{
        address_components: data.results[0].components,
        formatted_address: data.results[0].formatted
      }]
    }

    return new Response(
      JSON.stringify(transformedData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Geocoding error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'Error occurred during geocoding request'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})