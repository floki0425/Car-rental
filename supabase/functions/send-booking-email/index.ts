// deno-lint-ignore-file no-explicit-any
import { createClient } from 'npm:@supabase/supabase-js@2'
import { Resend } from 'npm:resend@4.0.0'

const contactFromEmail =
Deno.env.get('CONTACT_FROM_EMAIL')?.trim() ||
'onboarding@resend.dev'

const resendApiKey = Deno.env.get('RESEND_API_KEY')?.trim()
const resend = new Resend(resendApiKey)

const corsHeaders = {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/
const allowedRentalOptions = new Set(['Self Drive', 'With Driver'])

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
new Response(JSON.stringify(body), {
status,
headers: {
'Content-Type': 'application/json',
...corsHeaders,
},
})

const escapeHtml = (value: unknown) => {
  return String(value ?? '').replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }

    return entities[char] || char
  })
}

Deno.serve(async (req) => {
if (req.method === 'OPTIONS') {
return new Response('ok', { headers: corsHeaders })
}

if (req.method !== 'POST') {
return jsonResponse({ error: 'Method not allowed' }, 405)
}

try {
if (!resendApiKey) {
return jsonResponse({ error: 'Missing Resend API key' }, 500)
}


const payload = await req.json()

const {
  client_slug = 'car-rental-demo',
  full_name,
  email,
  phone,
  pickup_date,
  return_date,
  pickup_location,
  rental_option,
  message,
  car_name_snapshot,
  car_price_snapshot,
} = payload

const requiredFields = {
  full_name,
  email,
  phone,
  pickup_date,
  return_date,
  pickup_location,
  rental_option,
}

for (const [key, value] of Object.entries(requiredFields)) {
  if (!String(value || '').trim()) {
    return jsonResponse({ error: `Missing required field: ${key}` }, 400)
  }
}

if (!emailPattern.test(String(email))) {
  return jsonResponse({ error: 'Invalid email format' }, 400)
}

if (!allowedRentalOptions.has(String(rental_option))) {
  return jsonResponse({ error: 'Invalid rental_option value' }, 400)
}

const pickupDate = new Date(String(pickup_date))
const returnDate = new Date(String(return_date))

if (Number.isNaN(pickupDate.getTime()) || Number.isNaN(returnDate.getTime())) {
  return jsonResponse({ error: 'Invalid pickup or return date' }, 400)
}

if (returnDate < pickupDate) {
  return jsonResponse({ error: 'Return date cannot be earlier than pickup date' }, 400)
}

const supabaseUrl = Deno.env.get('PROJECT_URL')?.trim()
const supabaseServiceRoleKey = Deno.env.get('SERVICE_ROLE_KEY')?.trim()

if (!supabaseUrl || !supabaseServiceRoleKey) {
  return jsonResponse({ error: 'Missing Supabase server environment variables' }, 500)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const { data: client, error: clientError } = await supabase
  .from('funnel_clients')
  .select('id, slug, business_name, notification_email, is_active')
  .eq('slug', client_slug)
  .eq('is_active', true)
  .single()

if (clientError || !client) {
  return jsonResponse({ error: 'Client funnel not found or inactive' }, 404)
}

if (!client.notification_email) {
  return jsonResponse({ error: 'Missing owner notification email' }, 500)
}

const carName = String(car_name_snapshot || 'Selected Car')
const carPrice = Number(car_price_snapshot || 0)
const carPriceText = carPrice
  ? `PHP ${carPrice.toLocaleString('en-PH')} / day`
  : 'N/A'

const details = {
  car_name: carName,
  car_price_per_day: carPrice || null,
  pickup_date,
  return_date,
  pickup_location,
  rental_option,
}

const { data: inquiry, error: inquiryError } = await supabase
  .from('funnel_inquiries')
  .insert({
    client_id: client.id,
    funnel_type: 'car_rental',
    full_name,
    email,
    phone,
    service: carName,
    message: message || null,
    status: 'new',
    details,
  })
  .select('id')
  .single()

if (inquiryError) {
  return jsonResponse({ error: inquiryError.message }, 500)
}

const safeFullName = escapeHtml(full_name)
const safeEmail = escapeHtml(email)
const safePhone = escapeHtml(phone)
const safePickupLocation = escapeHtml(pickup_location)
const safeRentalOption = escapeHtml(rental_option)
const safeMessage = escapeHtml(message || '-')
const safeCarName = escapeHtml(carName)
const safeCarPriceText = escapeHtml(carPriceText)

let customerEmailSent = false
let ownerEmailSent = false
let emailWarning = null

const customerEmail = await resend.emails.send({
  from: contactFromEmail,
  to: String(email),
  subject: 'We received your car rental inquiry',
  html: `
    <h2>Hi ${safeFullName},</h2>
    <p>We received your car rental inquiry.</p>
    <ul>
      <li><strong>Car:</strong> ${safeCarName}</li>
      <li><strong>Price:</strong> ${safeCarPriceText}</li>
      <li><strong>Pickup Date:</strong> ${escapeHtml(pickup_date)}</li>
      <li><strong>Return Date:</strong> ${escapeHtml(return_date)}</li>
      <li><strong>Pickup Location:</strong> ${safePickupLocation}</li>
      <li><strong>Rental Option:</strong> ${safeRentalOption}</li>
    </ul>
    <p>Our team will contact you soon.</p>
  `,
})

if (customerEmail.error) {
  emailWarning = customerEmail.error.message
} else {
  customerEmailSent = true
}

const ownerEmail = await resend.emails.send({
  from: contactFromEmail,
  to: client.notification_email,
  subject: 'New Car Rental Booking Inquiry',
  html: `
    <h2>New Car Rental Booking Inquiry</h2>
    <ul>
      <li><strong>Name:</strong> ${safeFullName}</li>
      <li><strong>Email:</strong> ${safeEmail}</li>
      <li><strong>Phone:</strong> ${safePhone}</li>
      <li><strong>Car:</strong> ${safeCarName}</li>
      <li><strong>Price:</strong> ${safeCarPriceText}</li>
      <li><strong>Pickup Date:</strong> ${escapeHtml(pickup_date)}</li>
      <li><strong>Return Date:</strong> ${escapeHtml(return_date)}</li>
      <li><strong>Pickup Location:</strong> ${safePickupLocation}</li>
      <li><strong>Rental Option:</strong> ${safeRentalOption}</li>
      <li><strong>Message:</strong> ${safeMessage}</li>
      <li><strong>Inquiry ID:</strong> ${escapeHtml(inquiry.id)}</li>
    </ul>
  `,
})

if (ownerEmail.error) {
  emailWarning = ownerEmail.error.message
} else {
  ownerEmailSent = true
}

return jsonResponse({
  ok: true,
  inquiry_id: inquiry.id,
  customer_email_sent: customerEmailSent,
  owner_email_sent: ownerEmailSent,
  email_warning: emailWarning,
})


} catch (error: any) {
return jsonResponse(
{ error: error.message || 'Failed to process booking inquiry' },
500,
)
}
})
