// deno-lint-ignore-file no-explicit-any
import { Resend } from 'npm:resend@4.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
const adminEmail = Deno.env.get('ADMIN_EMAIL')

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  try {
    const payload = await req.json()
    const { full_name, email, phone, pickup_date, return_date, pickup_location, rental_option, message, car_name } = payload

    await resend.emails.send({
      from: 'DriveGo <onboarding@resend.dev>',
      to: email,
      subject: 'We received your car rental inquiry',
      html: `<h2>Hi ${full_name},</h2><p>We received your car rental inquiry.</p><ul><li>Car: ${car_name}</li><li>Pickup Date: ${pickup_date}</li><li>Return Date: ${return_date}</li><li>Pickup Location: ${pickup_location}</li><li>Rental Option: ${rental_option}</li></ul><p>Our team will contact you soon.</p>`,
    })

    if (adminEmail) {
      await resend.emails.send({
        from: 'DriveGo <onboarding@resend.dev>',
        to: adminEmail,
        subject: 'New Car Rental Booking Inquiry',
        html: `<h2>New Car Rental Booking Inquiry</h2><ul><li>Name: ${full_name}</li><li>Email: ${email}</li><li>Phone: ${phone}</li><li>Car: ${car_name}</li><li>Pickup Date: ${pickup_date}</li><li>Return Date: ${return_date}</li><li>Pickup Location: ${pickup_location}</li><li>Rental Option: ${rental_option}</li><li>Message: ${message || '-'}</li></ul>`,
      })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})

