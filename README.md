# Legacy Marketing & Consulting LLC

Marketing and booking site for **legacymarketingandconsultingllc.com** — beauty, image, and fine jewelry consultation for women, plus general business consulting.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Nodemailer over Gmail SMTP. Ready to deploy to Vercel as-is.

---

## Run it locally

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Production check:

```bash
npm run build && npm start
```

---

## Connect the booking emails (Gmail)

The booking form posts to `/api/booking`, which sends you the request and sends the client a confirmation.

1. Use a Google account with **2-Step Verification turned on**.
2. Go to **Google Account → Security → App passwords**, create one for "Mail".
3. Put the 16-character password in `.env.local`:

```
GMAIL_USER=youraddress@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
BOOKING_RECIPIENT=bookings@legacymarketingandconsultingllc.com
NEXT_PUBLIC_SITE_URL=https://legacymarketingandconsultingllc.com
```

`BOOKING_RECIPIENT` is where requests land. Leave it blank to use `GMAIL_USER`.

Your regular Gmail password will not work — Google requires an App Password for SMTP.

---

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New → Project → import the repo**. Framework detection is automatic; no build settings to change.
3. Add the four environment variables above under **Settings → Environment Variables** (Production + Preview).
4. Deploy.
5. **Settings → Domains → add `legacymarketingandconsultingllc.com`**, then point your registrar's DNS at Vercel:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
   (Vercel shows the exact records for your domain — use those if they differ.)

---

## Edit the content

Almost everything is data, not markup:

| What | File |
| --- | --- |
| Business name, email, phone, address, hours, socials | `lib/site.ts` |
| Services, durations, **pricing**, booking dropdown options, time slots | `lib/services.ts` |
| Every photo URL on the site | `lib/images.ts` |
| FAQ questions and answers (also feeds Google's FAQ rich results) | `lib/faqs.ts` |
| Brand colours, fonts, gradients, animations | `tailwind.config.ts` |
| Testimonials | `components/Testimonials.tsx` |

### Booking: one form, two places

`components/booking/BookingForm.tsx` holds the entire four-step flow. It is rendered twice:

- **In-page** — `BookingSection.tsx` at the bottom of the home page
- **Modal** — `BookingModal.tsx`, opened from any CTA on the site

Both post to the same `/api/booking` route, so there is only ever one form to maintain.

Any client component can open the modal:

```tsx
import { useBooking } from '@/components/booking/BookingProvider';

const { open } = useBooking();
<button onClick={() => open()}>Book</button>              // no service preselected
<button onClick={() => open('jewelry-consultation')}>…</button>  // step 1 pre-filled
```

Inside a server component, use `<BookNowLink service="discovery">Book Now</BookNowLink>` instead.

Service ids come from `lib/services.ts` (`discovery`, `signature-beauty`, `jewelry-consultation`, `image-style`, `jewelry-wardrobe`, `bridal-event`, `presence-coaching`, `general-consulting`).

### Theme: alternating light and dark bands

The page runs on a warm ivory base with navy type and gold accents. Five bands are dark navy for contrast: the navbar, **Services**, **Gallery**, the **CTA banner**, and the footer. Everything else is cream or sand.

To flip a section's tone, change two things in that component:

- the section background — `bg-navy-depth` (dark) ⇄ nothing / `bg-sand-depth` (light)
- the heading — `<SectionHeading tone="dark" …>` ⇄ drop the `tone` prop

Global type size lives in `app/globals.css` (`html { font-size: 17px }`, 18px on desktop). Raise or lower that one number to scale the whole site.

### Before you go live

- [ ] Replace the placeholder **email and phone** in `lib/site.ts`
- [ ] Set real **pricing** in `lib/services.ts` (currently marked "From $…")
- [ ] Swap the Unsplash placeholders in `lib/images.ts` for your own photography
- [ ] Update the **social links** in `lib/site.ts`
- [ ] Confirm the **400+ clients** and review claims are accurate, or edit them
- [ ] Send a test booking and check both emails arrive

Photos are served through `next/image`. If a remote photo ever fails to load, the site shows an on-brand gradient panel instead of a broken image — see `components/ui/BrandImage.tsx`.

---

## What's in the page

Hero → trust bar → about → six services → jewelry feature → four-step process → gallery → testimonials → general consulting → CTA banner → FAQ → four-step booking form → footer.

Plus `/privacy`, `/terms`, a 404 page, `sitemap.xml`, `robots.txt`, and JSON-LD structured data (LocalBusiness, Service catalog, FAQPage) for search and AI results.

---

## Structure

```
app/
  layout.tsx           metadata, fonts, OG tags
  page.tsx             the landing page
  api/booking/route.ts booking handler (validation, rate limit, Gmail SMTP)
  privacy/ terms/      legal pages
  sitemap.ts robots.ts SEO files
components/
  booking/             multi-step form + calendar
  motion/              scroll reveal primitives
  ui/                  buttons, headings, image with fallback
lib/                   site config, services, images, faqs, mail templates
```
