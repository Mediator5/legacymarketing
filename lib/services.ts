import { images } from './images';

export type Service = {
  id: string;
  name: string;
  category: 'beauty' | 'jewelry' | 'consulting';
  duration: string;
  /** Edit pricing here before launch. Use '' to hide the price line. */
  investment: string;
  summary: string;
  bullets: string[];
  image: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: 'signature-beauty',
    name: 'Signature Beauty Consultation',
    category: 'beauty',
    duration: '90 minutes',
    investment: 'From $250',
    summary:
      'A full read of your skin, undertone, and features — then a routine and makeup direction built to work on your actual mornings, not a magazine spread.',
    bullets: [
      'Skin and undertone analysis',
      'Personalized product edit with dupes at every budget',
      'Two makeup looks: everyday and evening',
      'Written routine you keep',
    ],
    image: images.serviceBeauty,
    featured: true,
  },
  {
    id: 'jewelry-consultation',
    name: 'Fine Jewelry Consultation',
    category: 'jewelry',
    duration: '75 minutes',
    investment: 'From $195',
    summary:
      'Buying jewelry should not feel like a test. We walk through metals, stones, settings, and what actually holds value — so you buy once and love it for decades.',
    bullets: [
      'Metal and gemstone guidance for your skin tone',
      'What to ask before you buy — and what to walk away from',
      'Heirloom and estate piece assessment',
      'Sourcing direction and vetted vendor referrals',
    ],
    image: images.serviceJewelry,
    featured: true,
  },
  {
    id: 'image-style',
    name: 'Personal Image & Style Consulting',
    category: 'beauty',
    duration: '2 hours',
    investment: 'From $375',
    summary:
      'Your closet, your color story, your silhouette. We build a wardrobe language so getting dressed stops being a daily negotiation.',
    bullets: [
      'Seasonal color analysis',
      'Closet audit with keep / tailor / release',
      'Silhouette and proportion mapping',
      'Shopping list with links and priorities',
    ],
    image: images.serviceImage,
  },
  {
    id: 'jewelry-wardrobe',
    name: 'Jewelry Wardrobe Curation',
    category: 'jewelry',
    duration: '3 sessions',
    investment: 'From $650',
    summary:
      'A signature collection built on purpose — the everyday pieces, the statement pieces, and the one thing you pass down.',
    bullets: [
      'Collection gap analysis',
      'Stacking and layering direction',
      'Acquisition plan phased over 12 months',
      'Care, storage, and insurance guidance',
    ],
    image: images.jewelryDetail,
  },
  {
    id: 'bridal-event',
    name: 'Bridal & Event Glam Direction',
    category: 'beauty',
    duration: 'Custom',
    investment: 'Quoted per event',
    summary:
      'For the day the photos live forever. Look direction, trial coordination, timeline, and a vendor team that shows up on time.',
    bullets: [
      'Look development and trial planning',
      'Jewelry and accessory pairing',
      'Day-of timeline and vendor coordination',
      'Bridal party cohesion',
    ],
    image: images.serviceBridal,
  },
  {
    id: 'presence-coaching',
    name: 'Confidence & Presence Coaching',
    category: 'beauty',
    duration: '60 minutes',
    investment: 'From $175',
    summary:
      'Beauty gets you looked at. Presence gets you remembered. We work on how you carry, speak, and take up room.',
    bullets: [
      'Presence and posture work',
      'Personal brand positioning',
      'Room-entry and introduction practice',
      'On-camera and event readiness',
    ],
    image: images.servicePresence,
  },
];

export const generalServices = [
  {
    title: 'Business & Startup Consulting',
    description:
      'Structure, systems, and a realistic first-year plan for founders who are done winging it.',
  },
  {
    title: 'Brand Strategy & Positioning',
    description:
      'Naming, voice, visual direction, and the story that makes your brand the obvious choice.',
  },
  {
    title: 'Marketing & Social Media Strategy',
    description:
      'Content pillars, channel plan, and a calendar your team can actually execute.',
  },
  {
    title: 'Event Planning & Coordination',
    description:
      'Launches, showcases, and private events — from run-of-show to vendor management.',
  },
  {
    title: 'Career & Professional Development',
    description:
      'Resume, interview presence, and positioning for the room you are trying to get into.',
  },
  {
    title: 'Small Business Administrative Support',
    description:
      'Process documentation, workflow cleanup, and the back-office order that buys back your week.',
  },
];

/** Options shown in the booking flow. */
export const bookingServices = [
  { id: 'discovery', name: 'Complimentary Discovery Call', meta: '20 min · Free' },
  ...services.map((s) => ({
    id: s.id,
    name: s.name,
    meta: `${s.duration}${s.investment ? ` · ${s.investment}` : ''}`,
  })),
  { id: 'general-consulting', name: 'General Business Consulting', meta: '60 min · Quoted' },
];

export const consultTypes = [
  { id: 'virtual', label: 'Virtual', hint: 'Zoom or Google Meet' },
  { id: 'in-person', label: 'In Person', hint: 'Studio or your location' },
  { id: 'phone', label: 'Phone', hint: 'Simple and direct' },
];

export const timeSlots = [
  '9:00 AM',
  '10:30 AM',
  '12:00 PM',
  '1:30 PM',
  '3:00 PM',
  '4:30 PM',
  '6:00 PM',
];
