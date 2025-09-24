-- Clean up any existing sample data first
DELETE FROM public.messages WHERE subject IN ('Case Update - Medical Records Received', 'Urgent: Mediation Scheduled');
DELETE FROM public.billing WHERE invoice_number IN ('INV-2024-001', 'INV-2024-002');
DELETE FROM public.cases WHERE case_number IN ('CASE-2024-001', 'CASE-2024-002');

-- We'll add the sample data via the edge function after user creation