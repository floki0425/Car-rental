import bydEmaxImage from './byd-emax.png'
import bydEmaxInside1 from './byd-emax-inside-1.png'
import bydEmaxInside2 from './byd-emax-inside-2.png'
import bydEmaxInside3 from './byd-emax-inside-3.png'
import sealion6Image from './SEALION-6.png'
import sealion6Inside1 from './Sealion-6-inside-1.png'
import sealion6Inside2 from './sealion-6-inside-2.png'
import sealion6Inside3 from './Sealion-6-inside-3.png'
import xpanderImage from './xpander.png'
import xpanderInside1 from './xpander-inside-1.png'
import xpanderInside2 from './xpander-inside-2.png'
import xpanderInside3 from './xpander-inside-3.png'

const carsData = [
  {
    id: 'fallback-1',
    name: 'BYD EMAX 7',
    slug: 'byd-emax-7',
    type: 'Electric MPV',
    transmission: 'Automatic',
    fuel_type: 'Electric',
    seats: 7,
    doors: 4,
    price_per_day: 3200,
    image_url: bydEmaxImage,
    gallery: [bydEmaxInside1, bydEmaxInside2, bydEmaxInside3],
    overview: 'Comfortable electric MPV ideal for family trips, airport transfers, and eco-friendly city travel.',
    features: ['100% Electric', 'Automatic', 'Cold AC'],
    requirements: ['Valid ID', 'Driver License', 'Security Deposit'],
    is_available: true,
  },
  {
    id: 'fallback-2',
    name: 'Xpander',
    slug: 'xpander',
    type: 'MPV',
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    seats: 7,
    doors: 5,
    price_per_day: 2800,
    image_url: xpanderImage,
    gallery: [xpanderInside1, xpanderInside2, xpanderInside3],
    overview: 'Reliable and spacious MPV for group travel, family errands, and flexible daily rentals.',
    features: ['Fuel Efficient', 'Automatic', 'Cold AC'],
    requirements: ['Valid ID', 'Driver License', 'Security Deposit'],
    is_available: true,
  },
  {
    id: 'fallback-3',
    name: 'Sealion 6',
    slug: 'sealion-6',
    type: 'MPV',
    transmission: 'Automatic',
    fuel_type: 'Electric',
    seats: 5,
    doors: 4,
    price_per_day: 1800,
    image_url: sealion6Image,
    gallery: [sealion6Inside1, sealion6Inside2, sealion6Inside3],
    overview: 'Clean and efficient sedan for city drives, errands, meetings, and comfortable daily use.',
    features: ['Fuel Efficient', 'Automatic', 'Cold AC'],
    requirements: ['Valid ID', 'Driver License', 'Security Deposit'],
    is_available: true,
  },
]

export default carsData
