import carsData from './fallbackCars'

export const heroImage = '/hero-bg.png'
export const whyImage = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90'

export const services = [
  {
    title: 'Self-Drive Rentals',
    text: 'Private daily rentals for city drives, errands, and weekend trips.',
    icon: 'car',
  },
  {
    title: 'With Driver',
    text: 'Professional driver option for business travel, events, and family trips.',
    icon: 'driver',
  },
  {
    title: 'Airport Transfers',
    text: 'Coordinated airport and hotel pickup for smoother arrivals and departures.',
    icon: 'location',
  },
  {
    title: 'Booking Support',
    text: 'Fast assistance for availability, requirements, and custom rental needs.',
    icon: 'headset',
  },
]

export const categories = [
  { name: 'Sedan', count: '1 Model', image: carsData[2].image_url },
  { name: 'Electric MPV', count: '1 Model', image: carsData[0].image_url },
  { name: 'MPV', count: '1 Model', image: carsData[1].image_url },
]

export const whyChooseUs = [
  {
    title: 'Best Prices',
    text: 'Competitive rates with no hidden fees or surprise charges.',
    icon: 'price',
  },
  {
    title: 'Well Maintained',
    text: 'Clean, inspected, and road-ready vehicles for every trip.',
    icon: 'shield',
  },
  {
    title: 'With Driver Option',
    text: 'Professional chauffeurs available for extra comfort.',
    icon: 'driver',
  },
  {
    title: '24/7 Support',
    text: 'Round-the-clock road and booking assistance.',
    icon: 'headset',
  },
]

export const testimonials = [
  {
    quote: 'Super easy booking process and smooth ride. The vehicle was in showroom condition.',
    name: 'Robert Jenkins',
    type: 'Business Traveler',
  },
  {
    quote: 'Great value and very clean vehicles. We used an SUV for our family trip and it was perfect.',
    name: 'Sarah Miller',
    type: 'Family Travel',
  },
  {
    quote: 'Customer support was fast and helpful. They adjusted my booking within minutes when my flight was delayed.',
    name: 'Michael Chen',
    type: 'Frequent Flyer',
  },
]

export const faqs = [
  {
    question: 'What documents do I need to rent a car?',
    answer: 'You will need a valid government ID, a valid driver license for self-drive rentals, and a refundable security deposit.',
  },
  {
    question: 'Can I book a car with a driver?',
    answer: 'Yes. You can choose either Self Drive or With Driver when submitting a booking inquiry, and our team will confirm availability.',
  },
  {
    question: 'Are rates fixed for every booking?',
    answer: 'Daily rates are shown as a starting guide. Final pricing may vary based on rental duration, delivery location, driver option, and add-ons.',
  },
  {
    question: 'How fast will you respond to my inquiry?',
    answer: 'Our team reviews every inquiry as soon as possible and will contact you by phone, email, or WhatsApp to confirm the details.',
  },
]

export const heroHighlights = [
  { title: 'Best Prices', text: 'No hidden charges', icon: 'price' },
  { title: 'Well Maintained', text: 'Safe and clean cars', icon: 'car' },
  { title: '24/7 Support', text: 'We are here to help', icon: 'headset' },
]

export const conciergeStandards = [
  'Inspected vehicles',
  'Transparent rates',
  'Responsive support',
]
