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

    // First check if admin user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const adminExists = existingUsers.users?.find(user => user.email === 'admin@pritsinghlaw.com')

    if (adminExists) {
      console.log('Admin user already exists:', adminExists.id)
      
      // Call the sample data setup function for existing user
      const { error: setupError } = await supabaseAdmin.rpc('setup_sample_data_for_user', {
        user_uuid: adminExists.id
      })

      if (setupError) {
        console.error('Setup error:', setupError)
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          user: adminExists,
          message: 'Admin user already exists, sample data updated'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

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

    // Set up sample data for the new admin user
    const adminUserId = authData.user?.id
    if (adminUserId) {
      const { error: setupError } = await supabaseAdmin.rpc('setup_sample_data_for_user', {
        user_uuid: adminUserId
      })

      if (setupError) {
        console.error('Sample data setup error:', setupError)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: authData.user,
        message: 'Admin user created successfully with sample data'
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