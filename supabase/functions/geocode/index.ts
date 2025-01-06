import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { latitude, longitude } = await req.json()
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')

    if (!apiKey) {
      console.error('Google Maps API key not configured')
      return new Response(
        JSON.stringify({ 
          error: 'Google Maps API key not configured',
          details: 'Please configure GOOGLE_MAPS_API_KEY in Supabase Edge Function Secrets'
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }

    console.log('Fetching geocoding data for:', { latitude, longitude })
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    )

    const data = await response.json()
    console.log('Geocoding response:', data)

    if (data.status === 'REQUEST_DENIED') {
      console.error('Geocoding request denied:', data.error_message)
      return new Response(
        JSON.stringify({
          error: 'Geocoding request denied',
          details: data.error_message || 'Please check if the Geocoding API is enabled in your Google Cloud Console'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403
        }
      )
    }

    if (data.status !== 'OK') {
      console.error('Geocoding error:', data.status, data.error_message)
      return new Response(
        JSON.stringify({
          error: 'Geocoding failed',
          details: data.error_message || `Status: ${data.status}`
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Geocoding error:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})