import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('Creating admin user...')

    // Create the admin user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
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
        JSON.stringify({ error: 'Failed to create user', details: authError }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = authData.user.id
    console.log('Admin user created with ID:', userId)

    // Update all sample data to use the real user ID
    const { error: updateCasesError } = await supabase
      .from('cases')
      .update({ client_id: userId })
      .eq('client_id', '00000000-0000-0000-0000-000000000000')

    if (updateCasesError) {
      console.error('Error updating cases:', updateCasesError)
    }

    const { error: updateBillingError } = await supabase
      .from('billing')
      .update({ client_id: userId })
      .eq('client_id', '00000000-0000-0000-0000-000000000000')

    if (updateBillingError) {
      console.error('Error updating billing:', updateBillingError)
    }

    const { error: updateMessagesError } = await supabase
      .from('messages')
      .update({ 
        sender_id: userId,
        recipient_id: userId 
      })
      .eq('sender_id', '00000000-0000-0000-0000-000000000000')

    if (updateMessagesError) {
      console.error('Error updating messages:', updateMessagesError)
    }

    console.log('Sample data updated successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin user created and sample data updated successfully',
        userId: userId
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})