-- Create a more robust sample data setup that doesn't depend on specific user IDs
-- First, let's create a function to set up sample data for any user

CREATE OR REPLACE FUNCTION public.setup_sample_data_for_user(user_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    case_1_id UUID;
    case_2_id UUID;
BEGIN
    -- Insert sample cases and capture IDs
    INSERT INTO public.cases (
        id,
        client_id,
        case_number,
        title,
        description,
        case_type,
        status,
        priority,
        assigned_attorney,
        case_value,
        court_name,
        next_hearing_date
    ) VALUES 
    (
        gen_random_uuid(),
        user_uuid,
        'CASE-2024-001',
        'Personal Injury - Auto Accident',
        'Motor vehicle accident resulting in personal injury claim against defendant driver.',
        'Personal Injury',
        'active',
        'high',
        'Pritpal Singh',
        75000.00,
        'Superior Court of California',
        '2024-10-15 10:00:00+00'
    ) RETURNING id INTO case_1_id;

    INSERT INTO public.cases (
        id,
        client_id,
        case_number,
        title,
        description,
        case_type,
        status,
        priority,
        assigned_attorney,
        case_value,
        court_name,
        next_hearing_date
    ) VALUES
    (
        gen_random_uuid(),
        user_uuid,
        'CASE-2024-002',
        'Contract Dispute Resolution',
        'Business contract dispute regarding service delivery and payment terms.',
        'Business Law',
        'active',
        'medium',
        'Pritpal Singh',
        25000.00,
        'Santa Clara County Superior Court',
        '2024-10-22 14:30:00+00'
    ) RETURNING id INTO case_2_id;

    -- Insert sample billing records
    INSERT INTO public.billing (
        id,
        client_id,
        case_id,
        invoice_number,
        description,
        amount,
        hourly_rate,
        hours_worked,
        status,
        due_date,
        payment_date,
        payment_method
    ) VALUES
    (
        gen_random_uuid(),
        user_uuid,
        case_1_id,
        'INV-2024-001',
        'Legal consultation and case preparation',
        3750.00,
        250.00,
        15.0,
        'paid',
        '2024-09-15',
        '2024-09-10',
        'Credit Card'
    ),
    (
        gen_random_uuid(),
        user_uuid,
        case_2_id,
        'INV-2024-002',
        'Contract review and mediation preparation',
        2000.00,
        250.00,
        8.0,
        'pending',
        '2024-10-15',
        NULL,
        NULL
    );

    -- Insert sample messages
    INSERT INTO public.messages (
        id,
        sender_id,
        recipient_id,
        case_id,
        subject,
        content,
        message_type,
        is_urgent,
        is_read
    ) VALUES
    (
        gen_random_uuid(),
        user_uuid,
        user_uuid,
        case_1_id,
        'Case Update - Medical Records Received',
        'We have successfully obtained all medical records from your treating physicians. The documentation supports your injury claims and we are preparing for the next phase of negotiations.',
        'case_update',
        false,
        true
    ),
    (
        gen_random_uuid(),
        user_uuid,
        user_uuid,
        case_2_id,
        'Urgent: Mediation Scheduled',
        'The mediation session has been scheduled for October 25th at 2:00 PM. Please review the settlement parameters we discussed and confirm your availability.',
        'appointment',
        true,
        false
    );

END;
$$;