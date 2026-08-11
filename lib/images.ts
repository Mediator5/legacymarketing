/**
 * All imagery lives here so it can be swapped in one place.
 * These are Unsplash placeholders — replace the URLs with your own
 * client photography before launch (keep the same keys).
 */

const u = (id: string, w = 1400, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  heroPortrait: u('photo-1531746020798-e6953c6e8e04', 1200),
  heroDetail: u('photo-1515886657613-9f3515b0c78f', 900),

  aboutPrimary: u('photo-1573496359142-b8d87734a5a2', 1100),
  aboutSecondary: u('photo-1522335789203-aabd1fc54bc9', 800),

  serviceBeauty: u('photo-1596462502278-27bfdc403348', 900),
  serviceImage: u('photo-1487412720507-e7ab37603c6f', 900),
  serviceBridal: u('photo-1519741497674-611481863552', 900),
  serviceJewelry: u('photo-1515562141207-7a88fb7ce338', 900),
  serviceColor: u('photo-1512496015851-a90fb38ba796', 900),
  servicePresence: u('photo-1524504388940-b1c1722653e1', 900),

  jewelryHero: u('photo-1605100804763-247f67b3557e', 1200),
  jewelryDetail: u('photo-1611652022419-a9419f74343d', 900),
  jewelryRings: u('photo-1602173574767-37ac01994b2a', 800),

  gallery: [
    u('photo-1534528741775-53994a69daeb', 800),
    u('photo-1596944924616-7b38e7cfac36', 800),
    u('photo-1517841905240-472988babdf9', 800),
    u('photo-1599643478518-a784e5dc4c8f', 800),
    u('photo-1580489944761-15a19d654956', 800),
    u('photo-1573408301185-9146fe634ad0', 800),
  ],

  avatars: [
    u('photo-1494790108377-be9c29b29330', 200, 70),
    u('photo-1544005313-94ddf0286df2', 200, 70),
    u('photo-1438761681033-6461ffad8d80', 200, 70),
    u('photo-1535713875002-d1d0cf377fde', 200, 70),
  ],

  ctaBackdrop: u('photo-1522337360788-8b13dee7a37e', 1600),
} as const;
