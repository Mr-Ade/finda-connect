import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { latitude, longitude } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')

    if (!apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    console.log('Geocoding coordinates:', { latitude, longitude })

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    )
    
    const data = await response.json()
    
    console.log('Google Maps API response:', data)

    // Handle API errors more gracefully
    if (data.error_message) {
      // Return a more user-friendly response
      return new Response(
        JSON.stringify({
          error: "Location service temporarily unavailable",
          details: "Please enter location details manually"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 // Changed to 200 to handle this gracefully on the frontend
        }
      )
    }

    if (!data.results || data.status === 'ZERO_RESULTS') {
      return new Response(
        JSON.stringify({ 
          error: 'No results found',
          status: data.status
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Geocoding error:', error)
    return new Response(
      JSON.stringify({
        error: "Location service temporarily unavailable",
        details: "Please enter location details manually"
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  }
})