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

    // Insert sample cases data
    const { error: casesError } = await supabase
      .from('cases')
      .insert([
        {
          client_id: userId,
          case_number: 'CASE-2024-001',
          title: 'Personal Injury - Auto Accident',
          description: 'Motor vehicle accident resulting in personal injury claim against defendant driver.',
          case_type: 'Personal Injury',
          status: 'active',
          priority: 'high',
          assigned_attorney: 'Pritpal Singh',
          case_value: 75000.00,
          court_name: 'Superior Court of California',
          next_hearing_date: '2024-10-15T10:00:00Z'
        },
        {
          client_id: userId,
          case_number: 'CASE-2024-002',
          title: 'Contract Dispute Resolution',
          description: 'Business contract dispute regarding service delivery and payment terms.',
          case_type: 'Business Law',
          status: 'active',
          priority: 'medium',
          assigned_attorney: 'Pritpal Singh',
          case_value: 25000.00,
          court_name: 'Santa Clara County Superior Court',
          next_hearing_date: '2024-10-22T14:30:00Z'
        }
      ])

    if (casesError) {
      console.error('Error creating cases:', casesError)
    }

    // Get case IDs for billing and messages
    const { data: casesData } = await supabase
      .from('cases')
      .select('id, case_number')
      .eq('client_id', userId)

    const case1 = casesData?.find(c => c.case_number === 'CASE-2024-001')
    const case2 = casesData?.find(c => c.case_number === 'CASE-2024-002')

    // Insert sample billing records
    if (case1 && case2) {
      const { error: billingError } = await supabase
        .from('billing')
        .insert([
          {
            client_id: userId,
            case_id: case1.id,
            invoice_number: 'INV-2024-001',
            description: 'Legal consultation and case preparation',
            amount: 3750.00,
            hourly_rate: 250.00,
            hours_worked: 15.0,
            status: 'paid',
            due_date: '2024-09-15',
            payment_date: '2024-09-10T00:00:00Z',
            payment_method: 'Credit Card'
          },
          {
            client_id: userId,
            case_id: case2.id,
            invoice_number: 'INV-2024-002',
            description: 'Contract review and mediation preparation',
            amount: 2000.00,
            hourly_rate: 250.00,
            hours_worked: 8.0,
            status: 'pending',
            due_date: '2024-10-15'
          }
        ])

      if (billingError) {
        console.error('Error creating billing:', billingError)
      }

      // Insert sample messages
      const { error: messagesError } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: userId,
            recipient_id: userId,
            case_id: case1.id,
            subject: 'Case Update - Medical Records Received',
            content: 'We have successfully obtained all medical records from your treating physicians. The documentation supports your injury claims and we are preparing for the next phase of negotiations.',
            message_type: 'case_update',
            is_urgent: false,
            is_read: true
          },
          {
            sender_id: userId,
            recipient_id: userId,
            case_id: case2.id,
            subject: 'Urgent: Mediation Scheduled',
            content: 'The mediation session has been scheduled for October 25th at 2:00 PM. Please review the settlement parameters we discussed and confirm your availability.',
            message_type: 'appointment',
            is_urgent: true,
            is_read: false
          }
        ])

      if (messagesError) {
        console.error('Error creating messages:', messagesError)
      }
    }

    console.log('Sample data created successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin user and sample data created successfully',
        userId: userId,
        credentials: {
          email: 'admin@pritsinghlaw.com',
          password: 'IronHorse1901!'
        }
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