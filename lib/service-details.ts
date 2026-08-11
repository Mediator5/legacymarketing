/**
 * Long-form detail for the /services page.
 * Keys match the `id` values in lib/services.ts.
 */
export type ServiceDetail = {
  forWho: string;
  whatHappens: string[];
  leaveWith: string[];
  goodToKnow: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'signature-beauty': {
    forWho:
      'The woman who has been buying the same three products for a decade and suspects none of them are right. Also the woman who owns forty and wears four.',
    whatHappens: [
      'We assess your skin in natural light — texture, tone, undertone, and what it is actually doing rather than what a label claims.',
      'We go through what you already own and sort it into keep, use differently, and let go. Most clients keep more than they expect.',
      'We build two looks on you: one you can do in nine minutes on a weekday, one for the evening you want to be photographed.',
      'We map the gaps and price them at three tiers, so you can start where your budget actually is.',
    ],
    leaveWith: [
      'A written routine, morning and evening, in order',
      'A product edit with a drugstore and a luxury option for each item',
      'Two looks you can repeat without us',
      'A shopping list ranked by what changes the most',
    ],
    goodToKnow:
      'Come with a bare face if you can, and bring your current makeup bag. We work with what is real, not what is aspirational.',
  },

  'jewelry-consultation': {
    forWho:
      'Anyone about to spend serious money on a piece — an engagement ring, an anniversary gift, a first investment purchase — and anyone who has inherited something and does not know what they are holding.',
    whatHappens: [
      'We cover the fundamentals in plain language: metals, stones, settings, certification, and where the price actually comes from.',
      'We look at your colouring, your hands, your neckline, and your daily life, because the most beautiful setting is the wrong one if it catches on everything you do.',
      'We go through the specific piece or purchase you are considering and pressure-test it — what to ask, what to walk away from, where the markup hides.',
      'If you have inherited pieces, we assess condition, likely value range, and whether restoration or reworking makes sense.',
    ],
    leaveWith: [
      'A buyer’s checklist you take into the store',
      'Your target specifications written down, with a realistic price band',
      'Vendor direction — who we would send our own family to',
      'Care, storage, and insurance guidance',
    ],
    goodToKnow:
      'We do not issue certified appraisals and we take no commission from any seller. For significant purchases, always obtain independent certification — we will tell you exactly how.',
  },

  'image-style': {
    forWho:
      'The woman standing in front of a full closet with nothing to wear, and the woman whose wardrobe suited the job she had four years ago.',
    whatHappens: [
      'Seasonal colour analysis with draping, so you see the difference rather than take our word for it.',
      'A full closet audit: keep, tailor, or release. We are honest about the pieces you are keeping out of guilt.',
      'Silhouette and proportion mapping for your actual frame, including the rules worth breaking on you.',
      'We build outfit formulas from what remains, so getting dressed becomes assembly rather than invention.',
    ],
    leaveWith: [
      'Your colour palette, written and swatched',
      'Outfit formulas you can repeat',
      'A tailoring list with what each alteration will cost',
      'A prioritised shopping list with links',
    ],
    goodToKnow:
      'This one works best in person. Allow two hours and clear your bedroom floor — we will be using it.',
  },

  'jewelry-wardrobe': {
    forWho:
      'The woman with a jewellery box full of pieces that do not speak to each other, who wants a collection with intent rather than an accumulation.',
    whatHappens: [
      'We inventory what you own and identify the genuine gaps — usually fewer than you think.',
      'We define your signature: the metal, the scale, and the two or three pieces that will become recognisably yours.',
      'We work out stacking and layering that suits your proportions, using pieces you already have.',
      'We phase acquisitions across twelve months so nothing has to happen at once.',
    ],
    leaveWith: [
      'A collection map: what you own, what is missing, what to retire',
      'A twelve-month acquisition plan with price bands',
      'Layering and stacking direction, photographed',
      'Storage, cleaning, and insurance guidance',
    ],
    goodToKnow:
      'Runs across three sessions so you can act between them. Most clients spend less in year one than they did the year before.',
  },

  'bridal-event': {
    forWho:
      'Brides, mothers of the bride, gala honourees, and anyone facing a day that will be photographed from every angle for the rest of their life.',
    whatHappens: [
      'We develop the look against your dress, your venue light, and the photographer’s style — three things that regularly contradict each other.',
      'We plan and attend trials, and we say the awkward thing if a trial is not working.',
      'We pair jewellery and accessories, including heirloom pieces you want to carry.',
      'We build the day-of timeline backwards from your first photograph and coordinate the vendor team against it.',
    ],
    leaveWith: [
      'A signed-off look with reference imagery',
      'A minute-by-minute day-of timeline',
      'Vendor contacts and confirmed call times',
      'A touch-up kit list and who is carrying it',
    ],
    goodToKnow:
      'Book as early as you can. Bridal work is quoted per event because no two are alike, and priority slots go quickly in spring.',
  },

  'presence-coaching': {
    forWho:
      'The woman who is about to be in rooms she has not been in before — a promotion, a pitch, a stage, a camera — and wants to occupy them properly.',
    whatHappens: [
      'We work on posture, stillness, and the physical habits that read as uncertainty on camera and in person.',
      'We define your positioning: the sentence people should repeat about you after you leave.',
      'We rehearse room entries, introductions, and the first ninety seconds, which is where most of the impression is made.',
      'We record and review, because what feels dramatic almost always reads as normal.',
    ],
    leaveWith: [
      'Your positioning line and short introduction, written',
      'Specific physical adjustments to practise',
      'Recorded before and after footage',
      'A pre-event readiness checklist',
    ],
    goodToKnow:
      'One hour, and it is more uncomfortable than the other services. That discomfort is where the change lives.',
  },
};
