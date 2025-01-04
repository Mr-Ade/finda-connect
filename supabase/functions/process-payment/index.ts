import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const FLUTTERWAVE_SECRET_KEY = Deno.env.get('FLUTTERWAVE_SECRET_KEY')
const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { provider, amount, email, phone, name } = await req.json()
    console.log('Processing payment:', { provider, amount, email })

    if (provider === 'flutterwave') {
      const response = await fetch('https://api.flutterwave.com/v3/payments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tx_ref: `tx-${Date.now()}`,
          amount,
          currency: 'NGN',
          payment_options: 'card,banktransfer',
          customer: {
            email,
            phone_number: phone,
            name,
          },
          customizations: {
            title: 'Goodup Payment',
            description: 'Payment for services',
            logo: 'https://your-logo-url.com/logo.png',
          },
          redirect_url: `${req.headers.get('origin')}/payment/callback`,
        }),
      })

      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (provider === 'paystack') {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url: `${req.headers.get('origin')}/payment/callback`,
        }),
      })

      const data = await response.json()
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    throw new Error('Invalid payment provider')
  } catch (error) {
    console.error('Payment processing error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})