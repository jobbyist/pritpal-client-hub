import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create the admin user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@pritsinghlaw.com',
      password: 'IronHorse1901!',
      email_confirm: true,
      user_metadata: {
        first_name: 'Admin',
        last_name: 'User'
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: authError.message }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Admin user created:', authData.user?.id)

    // Update sample data to use the new admin user ID
    const adminUserId = authData.user?.id

    if (adminUserId) {
      // Update cases
      const { error: casesError } = await supabaseAdmin
        .from('cases')
        .update({ client_id: adminUserId })
        .eq('client_id', '00000000-0000-0000-0000-000000000000')

      // Update billing
      const { error: billingError } = await supabaseAdmin
        .from('billing')
        .update({ client_id: adminUserId })
        .eq('client_id', '00000000-0000-0000-0000-000000000000')

      // Update messages
      const { error: messagesError } = await supabaseAdmin
        .from('messages')
        .update({ 
          sender_id: adminUserId,
          recipient_id: adminUserId 
        })
        .eq('sender_id', '00000000-0000-0000-0000-000000000000')

      if (casesError || billingError || messagesError) {
        console.error('Update errors:', { casesError, billingError, messagesError })
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: authData.user,
        message: 'Admin user created successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})