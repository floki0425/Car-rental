# DESIGN.md

## Visual Reference

Reference image location:

`/references/car-rental-landing-reference.png`
Use this as inspiration for spacing, layout, card style, hero treatment, and premium feel.
`/references/explore-our-fleets.png`
Use this as inspiration for spacing, layout, card style, hero treatment, and premium feel.
`/references/book-inquiry.png`
Use this as inspiration for spacing, layout, card style, hero treatment, and premium feel.
`/references/car-details.png`
Use this as inspiration for spacing, layout, card style, hero treatment, and premium feel.
`/references/thank-you-page.png`
Use this as inspiration for spacing, layout, card style, hero treatment, and premium feel.



## Main Design Direction

Create a premium, modern, and professional car rental landing page inspired by the provided reference image.

The design should feel:

* Luxury
* Clean
* Trustworthy
* Modern
* Spacious
* Easy to navigate
* High-converting for bookings

Use the reference only as visual inspiration. Do not copy it exactly. Keep the branding, content, colors, and layout unique to this project.

---

## Overall Layout Style

The landing page should follow this structure:

1. Navbar
2. Hero Section
3. Feature Cards
4. Popular Categories
5. Popular Cars
6. Why Choose Us
7. Testimonials
8. Final CTA Section
9. Footer

The page should have a clean white and dark navy contrast, with blue accent colors for buttons and important actions.

Use strong spacing between sections. Avoid clutter. Each section should feel breathable and premium.

---

## Visual Style

Use a premium car rental aesthetic similar to luxury travel websites.

Design characteristics:

* Clean white backgrounds for most sections
* Dark navy sections for premium contrast
* Blue accent color for CTA buttons
* Rounded cards
* Soft shadows
* Modern typography
* Large hero image
* Clear section titles
* Small uppercase eyebrow labels
* Spacious padding
* Minimal but elegant icons
* Smooth responsive layout

Avoid:

* Too many colors
* Crowded sections
* Cheap-looking gradients
* Random decorations
* Overly playful design
* Inconsistent spacing

---

## Color Direction

Use this kind of palette:

* Primary Dark: deep navy / almost black
* Primary Accent: royal blue
* Background: off-white or very light gray
* Cards: white
* Text: dark charcoal
* Muted Text: gray
* Borders: soft light gray

The design should look clean and premium, not too colorful.

---

## Typography Direction

Use clean, modern typography.

Headings:

* Bold
* Clear
* Premium-looking
* Strong hierarchy

Body text:

* Small to medium size
* Muted gray
* Easy to read

Use small uppercase labels above section headings, similar to:

* ELEVATED TRAVEL EXPERIENCE
* CURATED COLLECTIONS
* READY FOR THE ROAD
* DRIVE WITH CONFIDENCE
* VOICES OF TRUST

---

## Navbar Design

The navbar should be clean, minimal, and professional.

Navbar layout:

* Logo on the left
* Navigation links centered or slightly right
* Sign In link
* Main CTA button on the right

Navbar style:

* White background
* Thin bottom border
* Small navigation text
* Active link should use blue
* CTA button should be blue with white text
* Rounded button corners

On mobile:

* Use a clean hamburger menu
* Keep the logo visible
* CTA should still be easy to access

---

## Hero Section Design

The hero section should be the strongest visual part of the page.

Hero style:

* Large full-width background car image
* Dark overlay on top of image for readability
* Text aligned left
* Big bold headline
* Short supporting paragraph
* Two CTA buttons

Hero content direction:

* Small uppercase label
* Large headline
* Short paragraph
* Primary button: Book a Car
* Secondary button: View Fleet

Hero should feel luxurious and cinematic.

The image should not overpower the text. Use a dark overlay to keep text readable.

---

## Feature Cards Section

Place 3 floating cards overlapping slightly below the hero section.

Card style:

* White cards
* Rounded corners
* Soft shadows
* Small icon box
* Short heading
* Short description

Example feature cards:

* Well-maintained cars
* Flexible rental options
* Fast booking support

The cards should feel clean and premium, not bulky.

---

## Popular Categories Section

Create a section for car categories.

Layout:

* Small uppercase label
* Section title
* Horizontal card grid

Category cards should use image backgrounds with dark overlay.

Each card should include:

* Category name
* Number of available models

Example categories:

* Sedan
* SUV
* Van
* Luxury

Card style:

* Rounded corners
* Image background
* Dark gradient overlay
* White text
* Premium spacing

---

## Popular Cars Section

Create a clean car listing section.

Layout:

* Small uppercase label
* Section title
* Browse all link on the right
* 3 car cards in a grid

Each car card should include:

* Car image
* Car name
* Seats
* Transmission type
* Price per day
* Small Book button

Card style:

* White background
* Rounded corners
* Soft shadow
* Clean image crop
* Clear price
* Blue booking button

The layout should feel like a professional rental marketplace.

---

## Why Choose Us Section

Create a dark premium section.

Style:

* Deep navy background
* White heading text
* Muted light text
* Left side content
* Right side large car/lifestyle image
* Small rating card overlay on image

Content layout:

* Small uppercase label
* Main heading
* Short paragraph
* Feature list with icons

Example features:

* Best Prices
* Well Maintained
* With Driver Option
* 24/7 Support

The section should feel high-end and trustworthy.

---

## Testimonials Section

Create a clean testimonial section on a light background.

Layout:

* Small uppercase label centered
* Section title centered
* 3 testimonial cards

Each testimonial card should include:

* Star rating
* Short quote
* Quote icon
* Client avatar initials
* Client name
* Client type

Card style:

* White background
* Rounded corners
* Soft shadow
* Clean spacing
* Minimal design

---

## Final CTA Section

Create a strong booking call-to-action section near the bottom.

Style:

* Blue gradient or solid royal blue background
* Large white heading
* Short supporting text
* Two centered buttons

CTA content:

* Heading: Ready to book your ride?
* Text: Encourage users to view available cars or contact support.
* Primary button: View Available Cars
* Secondary button: Contact Concierge

The CTA should feel bold, premium, and conversion-focused.

---

## Footer Design

Footer should be simple and dark.

Footer layout:

* Logo or brand name
* Copyright text
* Footer links

Footer style:

* Dark navy background
* Small muted text
* Clean spacing
* Minimal layout

---

## Component-Level Notes

### `Navbar.jsx`

Make the navbar minimal, clean, and sticky if appropriate. Keep it professional with clear navigation links and one strong CTA button.

### `Hero.jsx`

Use a large background image with a dark overlay. Keep the text left-aligned with a strong headline and two CTA buttons.

### `FeatureCards.jsx`

Create 3 clean white cards that slightly overlap the bottom of the hero section. Use icons, short headings, and short descriptions.

### `Categories.jsx`

Use image-based category cards with dark overlays. Keep the grid clean and responsive.

### `PopularCars.jsx`

Create professional car cards with image, name, details, price, and Book button.

### `WhyChooseUs.jsx`

Use a dark navy premium section with feature points and a large image on the side.

### `Testimonials.jsx`

Use 3 clean testimonial cards with stars, quote text, and client info.

### `CTA.jsx`

Create a bold blue booking section with clear buttons.

### `Footer.jsx`

Keep footer minimal and professional.

---

## Responsive Rules

Desktop:

* Use wide layouts
* Use 3-column card grids where appropriate
* Keep hero large and cinematic

Tablet:

* Reduce spacing slightly
* Use 2-column grids where needed

Mobile:

* Stack all sections vertically
* Make buttons full-width or easy to tap
* Keep text readable
* Avoid tiny text
* Keep spacing clean

---

## Important Instruction

Improve the UI to match the premium feel of the reference image, but do not copy the exact layout, images, text, or branding.

Keep the project structure simple, clean, and easy to maintain.
