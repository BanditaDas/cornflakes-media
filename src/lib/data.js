// Placeholder content — swap with real copy and images when ready.
const img = (seed, w = 1200, h = 1500) => `https://picsum.photos/seed/${seed}/${w}/${h}`

// same order as the sections on the page
export const navLinks = [
  { label: 'Studio', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
]

export const heroImage = img('cf-hero-studio', 2000, 1100)

export const clients = [
  'Northwind', 'Aurora Labs', 'Halcyon', 'Mono Studio', 'Fieldnotes',
  'Kinfolk & Co', 'Parallel', 'Oakridge', 'Lumen', 'Basecamp Coffee',
]

export const workFilters = ['All', 'Branding', 'Digital', 'Campaign']

export const projects = [
  {
    title: 'Northwind Coffee',
    category: 'Branding',
    tags: ['Identity', 'Packaging'],
    year: '2026',
    desc: 'A warm, crafted identity for a specialty roaster going national.',
    img: img('cf-northwind', 900, 750),
  },
  {
    title: 'Aurora Labs',
    category: 'Digital',
    tags: ['Website', 'Product'],
    year: '2026',
    desc: 'Marketing site and product UI for a climate-tech platform.',
    img: img('cf-aurora', 900, 750),
  },
  {
    title: 'Halcyon Hotels',
    category: 'Campaign',
    tags: ['Campaign', 'Film'],
    year: '2025',
    desc: 'A slow-travel campaign shot across four coastal properties.',
    img: img('cf-halcyon', 900, 750),
  },
  {
    title: 'Mono Studio',
    category: 'Branding',
    tags: ['Identity', 'Motion'],
    year: '2025',
    desc: 'A reductive, motion-first brand for an architecture practice.',
    img: img('cf-mono', 900, 750),
  },
  {
    title: 'Fieldnotes',
    category: 'Digital',
    tags: ['App', 'UX'],
    year: '2025',
    desc: 'A journaling app that makes reflection feel effortless.',
    img: img('cf-fieldnotes', 900, 750),
  },
  {
    title: 'Lumen Skincare',
    category: 'Campaign',
    tags: ['Content', 'Social'],
    year: '2024',
    desc: 'Launch content and social system for a clean-beauty brand.',
    img: img('cf-lumen', 900, 750),
  },
]

export const services = [
  {
    title: 'Brand Strategy',
    text: 'Positioning, naming and messaging that gives your brand a clear point of view.',
    tags: ['Research', 'Positioning', 'Voice'],
    img: img('cf-svc-strategy', 800, 1000),
  },
  {
    title: 'Visual Identity',
    text: 'Logos, type, colour and systems built to flex across every touchpoint.',
    tags: ['Logo', 'Typography', 'Guidelines'],
    img: img('cf-svc-identity', 800, 1000),
  },
  {
    title: 'Digital Experiences',
    text: 'Websites and products that feel as considered as they look.',
    tags: ['Web Design', 'Development', 'UX'],
    img: img('cf-svc-digital', 800, 1000),
  },
  {
    title: 'Content & Film',
    text: 'Photography, film and motion that tell your story with craft.',
    tags: ['Production', 'Motion', 'Photo'],
    img: img('cf-svc-film', 800, 1000),
  },
  {
    title: 'Social & Growth',
    text: 'Always-on content and campaigns that turn attention into momentum.',
    tags: ['Social', 'Campaigns', 'Analytics'],
    img: img('cf-svc-social', 800, 1000),
  },
]

export const stats = [
  { value: 120, suffix: '+', label: 'Projects shipped' },
  { value: 48, suffix: '', label: 'Brands launched' },
  { value: 12, suffix: '', label: 'Industry awards' },
  { value: 98, suffix: '%', label: 'Client retention' },
]

export const process = [
  {
    no: '01',
    title: 'Discover',
    text: 'We dig into your business, audience and market to find the insight everything else is built on.',
    duration: 'Week 1–2',
    deliverables: ['Workshops', 'Audience research', 'Brand audit'],
    img: img('cf-proc-discover', 800, 900),
  },
  {
    no: '02',
    title: 'Define',
    text: 'Strategy becomes a sharp idea, a clear brief and a plan that everyone can rally behind.',
    duration: 'Week 2–3',
    deliverables: ['Positioning', 'Creative brief', 'Roadmap'],
    img: img('cf-proc-define', 800, 900),
  },
  {
    no: '03',
    title: 'Design',
    text: 'We explore boldly, refine relentlessly and craft every detail until it feels inevitable.',
    duration: 'Week 3–8',
    deliverables: ['Identity', 'Prototypes', 'Content'],
    img: img('cf-proc-design', 800, 900),
  },
  {
    no: '04',
    title: 'Deliver',
    text: 'Launch is only the beginning. We ship, measure and keep improving alongside your team.',
    duration: 'Week 8+',
    deliverables: ['Launch', 'Guidelines', 'Optimisation'],
    img: img('cf-proc-deliver', 800, 900),
  },
]

export const testimonials = [
  {
    quote: 'Cornflakes Media didn’t just redesign our brand — they gave us a language our whole team finally believes in.',
    name: 'Maya Okafor',
    role: 'CEO, Northwind Coffee',
  },
  {
    quote: 'A rare mix of strategic thinking and obsessive craft. The launch outperformed every number we set.',
    name: 'Daniel Reyes',
    role: 'Head of Marketing, Aurora Labs',
  },
  {
    quote: 'They move fast, ask the right questions and sweat the details nobody else notices. A true partner.',
    name: 'Sofia Lindqvist',
    role: 'Founder, Mono Studio',
  },
]

export const socials = ['Instagram', 'LinkedIn', 'Behance', 'Dribbble']
